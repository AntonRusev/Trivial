export interface QuestionsState {
    status: string;
    error: Error | null;
    questionIndex: number;
    currentQuestion: number;
    questionsDifficulty: string;
}