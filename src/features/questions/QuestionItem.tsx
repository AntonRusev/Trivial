import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useQuestionFormater } from "../../hooks/useQuestionFormater";

import {
    activateQuestion,
    selectQuestionById
} from "./questionsSlice";
import {
    scoreIncrease,
    streakBonus,
    streakEnd
} from "../score/scoreSlice";
import { activateTimer, resetTimer, stopTimer } from '../timer/timerSlice';

const QuestionItem = ({
    questionId
}: {
    questionId: any
}) => {
    const dispatch = useDispatch();
    const question = useSelector(state => selectQuestionById(state, questionId));
    const questionsDifficulty = useSelector((state: any) => state.questions.questionsDifficulty);
    const timerSeconds = useSelector((state: any) => state.timer.seconds);
    const timerIsActive = useSelector((state: any) => state.timer.isActive);

    const { shuffledAnswers } = useQuestionFormater(question);

    // Resetting the timer on each question
    useEffect(() => {
        dispatch(resetTimer());
        dispatch(activateTimer());
    }, []);

    // If time runs out
    useEffect(() => {
        if (timerIsActive && timerSeconds === 0) {
            lockAnswers();
            answerFail();
            dispatch(stopTimer());
        }
    }, [timerSeconds, timerIsActive]);

    const answerFail = () => {
        // In case of wrong answer coloring the correct blue
        const correctAnswer = document.getElementById('crrct');
        correctAnswer!.classList.add("bg-blue-700");

        // Ending the streak of correct answers
        dispatch(streakEnd());
    };

    const answerSuccess = () => {
        // Adding points to the score and increasing the streak of correct answers
        dispatch(scoreIncrease(questionsDifficulty));
        dispatch(streakBonus());
    };

    const lockAnswers = () => {
        // Making the answers unclickable after answer is selected or time is up
        const answersDiv = document.getElementById('answers');
        answersDiv!.style.pointerEvents = "none";
        dispatch(stopTimer());
        dispatch(activateQuestion());
    };

    const selectAnswer = (e: any) => {
        if (e.target.name !== question.correctAnswer) {
            // In case of wrong answer coloring it red
            e.target.classList.add('bg-red-700');
            answerFail();
        } else {
            // In case of correct answer coloring it green
            e.target.classList.add('bg-green-700');
            answerSuccess();
        };
        lockAnswers();
    };

    return (
        <article className="mb-8">
            <p>Category: {question.category}</p>
            <p>Difficulty: {question.difficulty}</p>
            <p>{question.question.text}</p>
            <div id="answers">
                {/* Marking the correct answer with extra className */}
                {shuffledAnswers.map((a: string) => {
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