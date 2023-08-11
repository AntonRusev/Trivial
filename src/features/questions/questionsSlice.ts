import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

import { QuestionsState } from "../../interfaces/QuestionsState";
import { StatusCode } from "../../utils/statusCode";

const QUESTIONS_URL = 'https://the-trivia-api.com/v2/questions';

const questionsAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => b.difficulty.localeCompare(a.difficulty)
});

const initialState: QuestionsState = questionsAdapter.getInitialState({
    status: StatusCode.IDLE, // all variants -> idle, loading, succeeded, failed
    error: null,
    questionIndex: 0,
    currentQuestion: 1,
    questionsDifficulty: "easy",
});

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async (DIFFICULTY: any) => {
    const response = await axios.get(QUESTIONS_URL + DIFFICULTY);
    return [...response.data];
});

// QUESTIONS SLICE
const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        nextQuestionId(state, action) {
            if (Number(state.questionIndex) >= Number(action.payload - 1)) {
                // rewinding to the first Id
                state.questionIndex = 0;
            } else {
                state.questionIndex = Number(state.questionIndex) + 1;
            };
        },
        changeCurrentQuestion(state) {
            state.currentQuestion =  Number(state.currentQuestion) + 1;
        },
        changeDifficulty(state, action) {
            state.questionsDifficulty = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = StatusCode.LOADING;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = StatusCode.SUCCEEDED;

                questionsAdapter.setAll(state as any, action.payload);
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = StatusCode.FAILED;
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
export const getQuestionIndex = (state: any) => state.questions.questionIndex;

export const { nextQuestionId, changeCurrentQuestion, changeDifficulty} = questionsSlice.actions;

export default questionsSlice.reducer;