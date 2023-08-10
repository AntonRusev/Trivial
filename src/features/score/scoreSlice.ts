import { createSlice } from "@reduxjs/toolkit";
import { ScoreState } from "../../interfaces/ScoreState";

const initialState: ScoreState = {
    score: 0,
    streak: 1,
};

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        scoreIncrease: (state) => {
            // Increasing score points on correct answer
            state.score += (100 * state.streak);
        },
        streakBonus: (state) => {
            // On two or more consecutive correct answers
            state.streak += 1;
        },
        streakEnd: (state) => {
            // Ending streak on wrong answer
            state.streak = 1;
        },
    }
});

export const { scoreIncrease, streakBonus, streakEnd } = scoreSlice.actions;

export default scoreSlice.reducer;