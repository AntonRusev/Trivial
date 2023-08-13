export interface QuestionsState {
    status: string;
    error: Error | null;
    questionIndex: number;
    currentQuestion: number;
    questionIsActive: boolean;
    questionsDifficulty: string;
};