import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

import { QuestionsState } from "../../interfaces/QuestionsState";

const QUESTIONS_URL = 'https://the-trivia-api.com/v2/questions';

const questionsAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => b.id.localeCompare(a.id)
});

const initialState: QuestionsState = questionsAdapter.getInitialState({
    status: 'idle', // all variants -> idle, loading, succeeded, failed
    error: null,
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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchQuestions.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = 'succeeded';

                questionsAdapter.setAll(state as any, action.payload);
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

export const getQuestionsStatus = (state: any) => state.questions.status;
export const getQuestionsError = (state: any) => state.questions.error;
// export const getQuestions = (state: any) => state.questions.entities;

export default questionsSlice.reducer;