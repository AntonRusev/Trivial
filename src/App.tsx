import './App.css';
import QuestionsList from './features/questions/QuestionsList';
import { ScoreBoard } from './features/score/ScoreBoard';

function App() {
    return (
        <>
            <h1 className="text-3xl font-bold text-red-500 underline text-center">Hello world!</h1>
            <ScoreBoard />
            <QuestionsList />
        </>
    );
};

export default App;