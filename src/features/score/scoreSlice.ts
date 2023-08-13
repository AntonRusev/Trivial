import { createSlice } from "@reduxjs/toolkit";
import { ScoreState } from "../../interfaces/ScoreState";

const initialState: ScoreState = {
    score: 0,
    streak: 1,
    highScores: [],
};

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        scoreIncrease: (state, action) => {
            // Increasing score points on correct answer
            if (action.payload === 'medium') {
                state.score += (300 * state.streak);
            } else if (action.payload === 'hard') {
                state.score += (500 * state.streak);
            } else {
                state.score += (100 * state.streak);
            };
        },
        streakBonus: (state) => {
            // On two or more consecutive correct answers
            state.streak += 1;
        },
        streakEnd: (state) => {
            // Ending streak on wrong answer
            state.streak = 1;
        },
        addToHighScores: (state, action) => {
            // Adding current score to high-score list
            const entry = [action.payload, state.score];
            state.highScores.push(entry);

            // Sorting the high-score list by score in descending order
            state.highScores.sort((a, b) => b[1] - a[1]);
        },
        resetScoreState: (state) => {
            state.score = 0;
            state.streak = 1;
        },
    }
});

export const { addToHighScores, resetScoreState, scoreIncrease, streakBonus, streakEnd } = scoreSlice.actions;

export default scoreSlice.reducer;