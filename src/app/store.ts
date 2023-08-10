import { configureStore } from "@reduxjs/toolkit";

import questionsReducer from "../features/questions/questionsSlice";
import scoreReducer from "../features/score/scoreSlice";

export const store = configureStore({
    reducer: {
        questions: questionsReducer,
        score: scoreReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;