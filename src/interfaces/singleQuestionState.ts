export interface singleQuestionState {
    category: string;
    correctAnswer: string;
    difficulty: string;
    id: string;
    incorrectAnswers: [string];
    isNiche: boolean;
    question: Object;
    regions: [string];
    tags: [string];
    type: string;
};