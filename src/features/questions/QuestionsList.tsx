import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/redux-hooks";
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
    activateQuestion
} from "./questionsSlice";
import QuestionItem from "./QuestionItem";
import { StatusCode } from "../../utils/statusCode";
import { DifficultiesCode } from "../../utils/difficultiesCode";
import { getContentElement } from "../../utils/getContent";


const QuestionsList = () => {
    const dispatch = useAppDispatch();

    const questionsIds = useAppSelector(selectQuestionIds);
    const questionsStatus = useAppSelector(getQuestionsStatus);
    const error = useAppSelector(getQuestionsError);
    const questionIndex = useAppSelector(getQuestionIndex);
    const currentQuestion = useAppSelector((state: any) => state.questions.currentQuestion);
    const questionsDifficulty = useAppSelector((state: any) => state.questions.questionsDifficulty);
    const questionIsActive = useAppSelector((state: any) => state.questions.questionIsActive);

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
        getContentElement(currentQuestion);
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
            <div id="content" className="min-h-[15rem]">{content}</div>
            {!questionIsActive
                ? <button className="p-3 my-1 text-black  bg-white" onClick={() => {
                    dispatch(nextQuestionId(questionsIds.length));
                    dispatch(changeCurrentQuestion());
                    dispatch(activateQuestion());
                }}>
                    Next Question
                </button>
                : <p className="p-3 my-1 text-slate-400 bg-white inline-block">Next Question</p>
            }
        </section>
    );
};

export default QuestionsList;