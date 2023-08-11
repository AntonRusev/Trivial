import { useState } from "react";

import QuestionsList from "../features/questions/QuestionsList";
import { ScoreBoard } from "../features/score/ScoreBoard";
import { Timer } from "../features/timer/Timer";

export const Home = () => {
    const [startGame, setStartGame] = useState(false);

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
                <button onClick={() => setStartGame(true)}>
                    Start
                </button>
            }
        </main>
    );
};