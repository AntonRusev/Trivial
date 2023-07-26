export interface QuestionsState {
    questions: string[];
    status: string; 
    error: Error | null;
}