import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import { store } from '../app/store';

import { AddScore } from '../features/score/AddScore';

describe('Testing the AddScore Component', () => {
    const stopGame = vi.fn();
    const setStartGame = true;

    test('show Add Score screen', () => {
        render(
            <Provider store={store}>
                <AddScore {... {stopGame, setStartGame}}/>
            </Provider>
        );

        expect(screen.getByText(/Your score is/i)).toBeInTheDocument();
        expect(screen.getByText(/0/i)).toBeInTheDocument();
        expect(screen.getByText(/done/i)).toBeInTheDocument();
    });

    test('component has input field', () => {
        render(
            <Provider store={store}>
                <AddScore {... {stopGame, setStartGame}}/>
            </Provider>
        );

        const nameInput = screen.getByRole("textbox");

        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveAttribute("name", "enterName");
    });

    test('input fields accept data', async () => {
        const user = userEvent.setup();
        
        render(
            <Provider store={store}>
                <AddScore {... {stopGame, setStartGame}}/>
            </Provider>
        );

        const nameInput = screen.getByRole("textbox");

        await user.type(nameInput, "Some Name");
        expect(nameInput).toHaveValue("Some Name");
    });
});