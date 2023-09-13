import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { addToHighScores } from '../features/score/scoreSlice';

import { Home } from '../components/Home';

describe('Testing the Home Component', () => {
    test('render Start and Rules buttons + No highscores message', () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(screen.getByText(/start/i)).toBeInTheDocument();
        expect(screen.getByText(/rules/i)).toBeInTheDocument();
        expect(screen.getByText(/no highscores yet/i)).toBeInTheDocument();
    });

    test('Start button works', async () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const startBtn = await screen.findByText(/start/i);
        fireEvent.click(startBtn);

        expect(screen.getByText(/next question/i)).toBeInTheDocument();
        expect(screen.getByText(/stop game/i)).toBeInTheDocument();
        expect(screen.getByText(/score/i)).toBeInTheDocument();
        expect(screen.getByText(/streak/i)).toBeInTheDocument();
    });

    test('Rules button works', async () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const rulesBtn = await screen.findByText(/rules/i);
        fireEvent.click(rulesBtn);

        expect(screen.getByText(/The quiz consists of 30 questions/i)).toBeInTheDocument();
    });

    test('shows proper highscores', () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        act(() => {
            store.dispatch(addToHighScores('b3st'));
        });

        expect(screen.getByText(/b3st/i)).toBeInTheDocument();
    });

    test('render a question when Start button is clicked', async () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const startBtn = await screen.findByText(/start/i);
        fireEvent.click(startBtn);

        // finding the question by data-testid in the Question Item component
        expect(await screen.findByTestId(/quiz-question-p/i)).toBeInTheDocument();
    });
});