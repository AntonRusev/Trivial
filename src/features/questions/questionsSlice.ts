import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    PayloadAction
} from "@reduxjs/toolkit";
import axios from "axios";

import { QuestionsState } from "../../interfaces/QuestionsState";

const QUESTIONS_URL = 'https://opentdb.com/api.php?amount=10';

const questionsAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => b.date.localeCompare(a.date)
});

const initialState: QuestionsState = questionsAdapter.getInitialState({
    status: 'idle', // all variants -> idle, loading, succeeded, failed
    error: null,
    questions: [],
});

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
    const response = await axios.get(QUESTIONS_URL);
    return [...response.data];
});

// QUESTIONS SLICE

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: (state, action: PayloadAction<string>) => {
            state.questions.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchQuestions.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchQuestions.fulfilled, (state, action) => {
            state.status = 'succeeded';
            questionsAdapter.upsertMany(state as any, action.payload)
        })
        .addCase(fetchQuestions.rejected, (state, action) => {
            state.status = 'failed';
            if (state.error) {
                state.error = action.error.message as any;
            }
        })
    },
});

export const {
    selectAll: selectAllQuestions,
    selectById: selectQuestionById,
    selectIds: selectQuestionIds
} = questionsAdapter.getSelectors((state: any) => {
    return state.questions
});

export default questionsSlice.reducer;