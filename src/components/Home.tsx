import { useState } from "react";

import QuestionsList from "../features/questions/QuestionsList";
import { ScoreBoard } from "../features/score/ScoreBoard";

export const Home = () => {
    const [startGame, setStartGame] = useState(false);

    return (
        <main>
            {startGame
                ?
                <div>
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