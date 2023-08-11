import { useSelector } from "react-redux";

import { singleQuestionState } from "../interfaces/singleQuestionState";
import { answerShuffler } from "../utils/answerShuffler";

export const useQuestionFormat = (question: singleQuestionState) => {
    const questionsDifficulty = useSelector((state: any) => state.questions.questionsDifficulty);

    const allIncorrectAnswers = answerShuffler(question.incorrectAnswers);
    const correctAnswer = question.correctAnswer;

    let usableIncorrectAnswers = [];

    // Giving different number of answer options depending on the difficulty of the question
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

    // Shuffling(randomizing) the order of the answer options 
    const shuffledAnswers = answerShuffler([...usableIncorrectAnswers, correctAnswer]);

    return {
        shuffledAnswers,
    };
};