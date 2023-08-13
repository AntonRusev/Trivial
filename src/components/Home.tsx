import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import QuestionsList from "../features/questions/QuestionsList";
import { ScoreBoard } from "../features/score/ScoreBoard";
import { Timer } from "../features/timer/Timer";
import { AddScore } from "../features/score/AddScore";
import { resetQuestionState, activateQuestion, deactivateQuestion, } from "../features/questions/questionsSlice";
import { resetScoreState } from "../features/score/scoreSlice";

export const Home = () => {
    const [startGame, setStartGame] = useState(false);

    const dispatch = useDispatch();

    const currentQuestion = useSelector((state: any) => state.questions.currentQuestion);
    const highScores = useSelector((state: any) => state.score.highScores);

    const stopGame = () => {
        dispatch(resetQuestionState());
        dispatch(resetScoreState());
        dispatch(deactivateQuestion());
    };

    return (
        <main>
            {startGame
                ?
                currentQuestion > 30
                    ? <AddScore stopGame={stopGame} setStartGame={setStartGame} />
                    : <div>
                        <Timer />
                        <ScoreBoard />
                        <QuestionsList />
                        <button onClick={() => {
                            setStartGame(false);
                            stopGame();
                        }}>
                            Stop Game
                        </button>
                    </div>

                :
                <div>
                    <button onClick={() => {
                        setStartGame(true);
                        dispatch(activateQuestion());
                    }}>
                        Start Game
                    </button>
                    <div>
                        <h3>Your top 3 High-Scores this session:</h3>
                        {
                            highScores.length > 0
                                ? highScores.map((h: [string, number], index: number) => <p key={index + 1}>{h[0]} : {h[1]}</p>)
                                : <p>No highscores yet.</p>
                        }
                    </div>
                </div>
            }
        </main>
    );
};