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
    questionIsActive: false,
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
            if (state.questionIndex >= action.payload - 1) {
                // rewinding to the first Id
                state.questionIndex = 0;
            } else {
                state.questionIndex = state.questionIndex + 1;
            };
        },
        changeCurrentQuestion(state) {
            state.currentQuestion = state.currentQuestion + 1;
        },
        changeDifficulty(state, action) {
            state.questionsDifficulty = action.payload;
        },
        activateQuestion(state) {
            // Making the current question answerable
            state.questionIsActive = true;
        },
        deactivateQuestion(state) {
            // Making the current question non-answerable(unclickable)
            state.questionIsActive = false;
        },
        resetQuestionState(state) {
            state.status = StatusCode.IDLE;
            state.questionIndex = 0;
            state.currentQuestion = 1;
            state.questionsDifficulty = 'easy';
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
                };
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

export const { resetQuestionState, nextQuestionId, deactivateQuestion, changeCurrentQuestion, changeDifficulty, activateQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;