import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../app/store";
import { fetchQuestions, getQuestionsError, getQuestionsStatus, selectQuestionIds } from "./questionsSlice";

import QuestionItem from "./QuestionItem";

const QuestionsList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const questionsIds = useSelector(selectQuestionIds);
    const questionsStatus = useSelector(getQuestionsStatus);
    const error = useSelector(getQuestionsError);

    useEffect(() => {
        if (questionsStatus === 'idle') {
            dispatch(fetchQuestions());
        }
    }, [questionsStatus, dispatch]);

    let content;

    if (questionsStatus === 'loading') {
        content = <p>Loading...</p>
    } else if (questionsStatus === 'succeeded') {
        content = questionsIds.map(questionId => <QuestionItem key={questionId} questionId={questionId} />)
    }
    else if (questionsStatus === 'failed') {
        content = <p>{error!.toString()}</p>
    };

    return (
        <section>
            {content}
        </section>
    );
};

export default QuestionsList;