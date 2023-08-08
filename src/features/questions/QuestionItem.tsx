import { useSelector } from "react-redux";

import { selectQuestionById } from "./questionsSlice";
import { answerShuffler } from '../../utils/answerShuffler';

const QuestionItem = ({
    questionId
}: {
    questionId: string
}) => {
    const question = useSelector(state => selectQuestionById(state, questionId));

    // Shuffling(randomizing) the order of the answers 
    const shuffledAnswers = answerShuffler([...question.incorrectAnswers, question.correctAnswer]);

    return (
        <article className="mb-8">
            <p>Category: {question.category}</p>
            <p>Difficulty: {question.difficulty}</p>
            <p>{question.question.text}</p>
            <div>
                {shuffledAnswers.map(a => <span key={a} className="mr-4 ml-4">{a}</span>)}
            </div>
        </article>
    );
};

export default QuestionItem;