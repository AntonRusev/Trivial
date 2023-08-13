import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch } from "../../app/store";
import {
    fetchQuestions,
    getQuestionIndex,
    getQuestionsError,
    getQuestionsStatus,
    selectQuestionIds,
    nextQuestionId,
    resetQuestionState,
    changeCurrentQuestion,
    changeDifficulty,
} from "./questionsSlice";
import QuestionItem from "./QuestionItem";
import { StatusCode } from "../../utils/statusCode";
import { DifficultiesCode } from "../../utils/difficultiesCode";


const QuestionsList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const questionsIds = useSelector(selectQuestionIds);
    const questionsStatus = useSelector(getQuestionsStatus);
    const error = useSelector(getQuestionsError);
    const questionIndex = useSelector(getQuestionIndex);
    const currentQuestion = useSelector((state: any) => state.questions.currentQuestion);
    const questionsDifficulty = useSelector((state: any) => state.questions.questionsDifficulty);

    // Fetch initial data upon start (first 10 questions are difficulty: east)
    useEffect(() => {
        if (questionsStatus === StatusCode.IDLE) {
            dispatch(fetchQuestions(DifficultiesCode.EASY));
        }
    }, [questionsStatus, dispatch]);

    // Fetch questions' difficulty depending on progression
    useEffect(() => {
        if (currentQuestion > 10 && questionsDifficulty === 'easy') {
            // After the first 10 questions set difficulty to medium 
            dispatch(fetchQuestions(DifficultiesCode.MEDIUM));
            dispatch(changeDifficulty('medium'));
        } else if (currentQuestion > 20 && questionsDifficulty === 'medium') {
            // After the first 20 questions set difficulty to hard 
            dispatch(fetchQuestions(DifficultiesCode.HARD));
            dispatch(changeDifficulty('hard'));
        } else if (currentQuestion > 30) {
            dispatch(resetQuestionState());
        };
    }, [currentQuestion, questionsDifficulty, dispatch]);

    let content;

    if (questionsStatus === StatusCode.LOADING) {
        content = <p>Loading...</p>
    } else if (questionsStatus === StatusCode.SUCCEEDED) {
        content = <QuestionItem key={questionsIds[questionIndex]} questionId={questionsIds[questionIndex]} />
    }
    else if (questionsStatus === StatusCode.FAILED) {
        content = <p>{error!.toString()}</p>
    };

    return (
        <section>
            <div>{content}</div>
            <button onClick={() => {
                dispatch(nextQuestionId(questionsIds.length));
                dispatch(changeCurrentQuestion());
            }}>
                Next {questionIndex}
            </button>
        </section>
    );
};

export default QuestionsList;