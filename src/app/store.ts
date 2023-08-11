import { configureStore } from "@reduxjs/toolkit";

import scoreReducer from "../features/score/scoreSlice";
import timerReducer from "../features/timer/timerSlice"
import questionsReducer from "../features/questions/questionsSlice";

export const store = configureStore({
    reducer: {
        score: scoreReducer,
        timer: timerReducer,
        questions: questionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;