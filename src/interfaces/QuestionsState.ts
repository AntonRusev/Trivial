export interface QuestionsState {
    status: String;
    error: Error | null;
    questionIndex: Number;
    currentQuestion: Number;
    questionsDifficulty: String;
};