import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { selectQuestionById } from "./questionsSlice";
import { answerShuffler } from '../../utils/answerShuffler';

const QuestionItem = ({
    questionId
}: {
    questionId: string
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const question = useSelector(state => selectQuestionById(state, questionId));

    useEffect(() => {
        setSelectedAnswer('');
    }, []);

    useEffect(() => {
        if (selectedAnswer !== '') {

        }
    }, [selectedAnswer]);

    // Shuffling(randomizing) the order of the answers 
    const shuffledAnswers = answerShuffler([...question.incorrectAnswers, question.correctAnswer]);

    const selectAnswer = (e: any) => {
        if (e.target.name !== question.correctAnswer) {
            // In case of wrong answer coloring it red and the correct blue
            const correctAnswer = document.getElementById('crrct');
            correctAnswer!.classList.add("bg-blue-700");
            e.target.classList.add('bg-red-700');
        } else {
            // In case of correct answer coloring it green
            e.target.classList.add('bg-green-700');
        };

        // Making the answers unclickable afet the first select
        const answersDiv = document.getElementById('answers');
        answersDiv!.style.pointerEvents = "none";
    };

    return (
        <article className="mb-8">
            <p>Category: {question.category}</p>
            <p>Difficulty: {question.difficulty}</p>
            <p>{question.question.text}</p>
            <div id="answers">
                {/* Markign the correct answer with extra className */}
                {shuffledAnswers.map((a) => {
                    if (a === question.correctAnswer) {
                        return <button onClick={(e) => selectAnswer(e)} key={a} name={a} id="crrct" className="mr-4 ml-4 crrc">{a}</button>
                    } else {
                        return <button onClick={(e) => selectAnswer(e)} key={a} name={a} className="mr-4 ml-4">{a}</button>
                    }
                })}
            </div>
        </article>
    );
};

export default QuestionItem;