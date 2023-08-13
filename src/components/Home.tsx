import { useState } from "react";
import { useSelector } from "react-redux";

import QuestionsList from "../features/questions/QuestionsList";
import { ScoreBoard } from "../features/score/ScoreBoard";
import { Timer } from "../features/timer/Timer";
import { AddScore } from "../features/score/AddScore";

export const Home = () => {
    const [startGame, setStartGame] = useState(false);

    const highScores = useSelector((state: any) => state.score.highScores);

    return (
        <main>
            {startGame
                ?
                <div>
                    <Timer />
                    <ScoreBoard />
                    <QuestionsList />
                    <button onClick={() => setStartGame(false)}>
                        Stop Game
                    </button>
                </div>
                :
                <div>
                    <button onClick={() => setStartGame(true)}>
                        Start
                    </button>
                    <div>
                        <AddScore />
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