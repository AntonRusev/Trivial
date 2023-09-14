import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';

import QuestionList from '../features/questions/QuestionsList';

describe('Testing the QuestionList Component', () => {
    test('render Next Question button and Loading... message', () => {
        render(
            <Provider store={store}>
                <QuestionList />
            </Provider>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        expect(screen.getByText(/next question/i)).toBeInTheDocument();
    });

    test('properly renders a question after fetching data from API', async () => {
        render(
            <Provider store={store}>
                <QuestionList />
            </Provider>
        );

        // finding the question by data-testid in the Question Item component
        expect(await screen.findByTestId(/quiz-question-p/i)).toBeInTheDocument();
    });
});