import { useSelector } from "react-redux";

import { singleQuestionState } from "../interfaces/singleQuestionState";
import { answerShuffler } from "../utils/answerShuffler";
import { useEffect, useState } from "react";

export const useQuestionFormater = (question: singleQuestionState) => {
    const [shuffledAnswers, setShuffledAnswers] = useState([] as any);

    const questionsDifficulty = useSelector((state: any) => state.questions.questionsDifficulty);

    useEffect(() => {
        const allIncorrectAnswers = answerShuffler(question.incorrectAnswers);

        let usableIncorrectAnswers = [];

        switch (questionsDifficulty) {
            case 'easy':
                // Easy has 2 options, 1 correct + 1 incorrect
                usableIncorrectAnswers = allIncorrectAnswers.slice(0, 1);
                break;
            case 'medium':
                // Medium has 3 options, 1 correct + 2 incorrect
                usableIncorrectAnswers = allIncorrectAnswers.slice(0, 2);
                break;
            default:
                // Hard has 4 options, 1 correct + 3 incorrect
                usableIncorrectAnswers = allIncorrectAnswers.slice();
                break;
        };

        setShuffledAnswers(answerShuffler([...usableIncorrectAnswers, question.correctAnswer]));
    }, [question]);

    return {
        shuffledAnswers,
    };
};