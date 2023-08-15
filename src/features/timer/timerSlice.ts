import { createSlice } from "@reduxjs/toolkit";

import { TimerState } from "../../interfaces/TimerState";

const initialState: TimerState = {
    seconds: 20,
    isActive: false,
};

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setSeconds: (state, action) => {
            // Setting the current seconds on the timer
            state.seconds = action.payload;
        },
        activateTimer: (state) => {
            // Activating the countdown
            state.isActive = true;
        },
        resetTimer: (state) => {
            // Reseting the countdown
            state.seconds = 20;
        },
        stopTimer: (state) => {
            // Stopping the countdown
            state.isActive = false;
        },
    },
});

export const { activateTimer, resetTimer, setSeconds, stopTimer } = timerSlice.actions;

export default timerSlice.reducer;