import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../app/store";
import {
    fetchQuestions,
    getQuestionIndex,
    getQuestionsError,
    getQuestionsStatus,
    selectQuestionIds,
    nextQuestionId
} from "./questionsSlice";
import QuestionItem from "./QuestionItem";
import { StatusCode } from "../../utils/statusCode";
import { DifficultiesCode } from "../../utils/difficultiesCode";


const QuestionsList = () => {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [currentDifficulty, setCurrectDifficulty] = useState('easy')
    const dispatch = useDispatch<AppDispatch>();

    const questionsIds = useSelector(selectQuestionIds);
    const questionsStatus = useSelector(getQuestionsStatus);
    const error = useSelector(getQuestionsError);
    const currentQuestionIndex = useSelector(getQuestionIndex);

    useEffect(() => {
        if (questionsStatus === StatusCode.IDLE) {
            dispatch(fetchQuestions(DifficultiesCode.EASY));
        }
    }, [questionsStatus, dispatch]);

    useEffect(() => {
        if (questionNumber > 10 && currentDifficulty === 'easy') {
            dispatch(fetchQuestions(DifficultiesCode.MEDIUM));
            setCurrectDifficulty('medium');
        } else if (questionNumber > 20 && currentDifficulty === 'medium') {
            dispatch(fetchQuestions(DifficultiesCode.HARD));
            setCurrectDifficulty('hard');
        } else if (questionNumber > 30 && currentDifficulty === 'hard') {
            dispatch(fetchQuestions(DifficultiesCode.EASY));
            setCurrectDifficulty('easy');
        };
    }, [questionNumber, dispatch]);

    let content;

    if (questionsStatus === StatusCode.LOADING) {
        content = <p>Loading...</p>
    } else if (questionsStatus === StatusCode.SUCCEEDED) {
        // content = questionsIds.map(questionId => <QuestionItem key={questionId} questionId={questionId} />)
        content = <QuestionItem key={questionsIds[currentQuestionIndex]} questionId={questionsIds[currentQuestionIndex]} />
    }
    else if (questionsStatus === StatusCode.FAILED) {
        content = <p>{error!.toString()}</p>
    };

    return (
        <section>
            <div>{content}</div>
            <button onClick={() => {
                dispatch(nextQuestionId(questionsIds.length));
                setQuestionNumber(state => state + 1);
                }}>
                Next {currentQuestionIndex}
            </button>
        </section>
    );
};

export default QuestionsList;