import { useSelector } from "react-redux";

import { selectQuestionById } from "./questionsSlice";

const QuestionItem = ({ questionId }) => {
    const question = useSelector(state => selectQuestionById(state, questionId));

    return (
        <article>
            <p>Category: {question.category}</p>
            <p>Difficulty: {question.difficulty}</p>
            <p>{question.question.text}</p>
        </article>
    );
};

export default QuestionItem;