import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { scoreIncrease, streakBonus, streakEnd } from '../features/score/scoreSlice';

import { ScoreBoard } from '../features/score/ScoreBoard';

describe('Testing the Header Component', () => {
    test('render Score Board', async () => {
        render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );

        expect(screen.getByText(/Score/i)).toBeInTheDocument();
        expect(screen.getByText(/Streak/i)).toBeInTheDocument();
    });

    test('renders proper score and streak on hard difficulty', async () => {
        render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );

        act(() => {
            store.dispatch(streakBonus());
            store.dispatch(scoreIncrease('hard'));
        });

        // Answering Hard question awards 500 points * Strek bonus(2) = 1000;
        expect(screen.getByText(/Score:/i)).toBeInTheDocument();
        expect(screen.getByText(/1000/i)).toBeInTheDocument();
        expect(screen.getByText(/Streak x/i)).toBeInTheDocument();
        expect(screen.getByText(/2/i)).toBeInTheDocument();
    });

    test('renders proper score and streak on easy medium', async () => {
        render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );

        act(() => {
            store.dispatch(streakBonus());
            store.dispatch(scoreIncrease('medium'));
        });

        // Answering Medium question awards 300 points * Strek bonus(3) = 900 (+1000 from previous = 1900);
        expect(screen.getByText(/Score:/i)).toBeInTheDocument();
        expect(screen.getByText(/1900/i)).toBeInTheDocument();
        expect(screen.getByText(/Streak x/i)).toBeInTheDocument();
        expect(screen.getByText(/3/i)).toBeInTheDocument();
    });

    test('renders proper score and streak on easy easy', async () => {
        render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );

        act(() => {
            store.dispatch(streakBonus());
            store.dispatch(scoreIncrease('easy'));
        });

        // Answering Easy question awards 100 points * Strek bonus(4) = 400 (+1900 from previous = 2300);
        expect(screen.getByText(/Score:/i)).toBeInTheDocument();
        expect(screen.getByText(/2300/i)).toBeInTheDocument();
        expect(screen.getByText(/Streak x/i)).toBeInTheDocument();
        expect(screen.getByText(/4/i)).toBeInTheDocument();
    });

    test('streak resets properly', async () => {
        render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );

        act(() => {
            store.dispatch(streakEnd());
            store.dispatch(scoreIncrease('easy'));
        });

        // Answering Easy question awards 100 points * Strek bonus(1) = 100 (+2300 from previous = 2400);
        expect(screen.getByText(/Score:/i)).toBeInTheDocument();
        expect(screen.getByText(/2400/i)).toBeInTheDocument();
        expect(screen.getByText(/Streak x/i)).toBeInTheDocument();
        expect(screen.getByText(/1/i)).toBeInTheDocument();
    });
});