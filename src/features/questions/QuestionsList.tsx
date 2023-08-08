import { useEffect } from "react";
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


const QuestionsList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const questionsIds = useSelector(selectQuestionIds);
    const questionsStatus = useSelector(getQuestionsStatus);
    const error = useSelector(getQuestionsError);
    const currentQuestionIndex = useSelector(getQuestionIndex)

    useEffect(() => {
        if (questionsStatus === 'idle') {
            dispatch(fetchQuestions());
        }
    }, [questionsStatus, dispatch]);

    let content;

    if (questionsStatus === 'loading') {
        content = <p>Loading...</p>
    } else if (questionsStatus === 'succeeded') {
        // content = questionsIds.map(questionId => <QuestionItem key={questionId} questionId={questionId} />)
        content = <QuestionItem key={questionsIds[currentQuestionIndex]} questionId={questionsIds[currentQuestionIndex]} />
    }
    else if (questionsStatus === 'failed') {
        content = <p>{error!.toString()}</p>
    };

    return (
        <section>
            <div>{content}</div>
            <button onClick={() => dispatch(nextQuestionId(questionsIds.length))}>
                Next {currentQuestionIndex}
            </button>
        </section>
    );
};

export default QuestionsList;