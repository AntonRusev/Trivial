export const answerShuffler = (answers: any) => {
    const shuffledAnswers = [...answers];

    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledAnswers[i];
        shuffledAnswers[i] = shuffledAnswers[j];
        shuffledAnswers[j] = temp;
    };

    return shuffledAnswers;
};