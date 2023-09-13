import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Header } from '../components/Header';

describe('Testing the Header Component', () => {
    test('show title', async () => {
        render(<Header />);

        expect(screen.getByText(/trivia-l/i)).toBeInTheDocument();
    });
});