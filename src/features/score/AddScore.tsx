import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToHighScores } from "./scoreSlice";

export const AddScore = ({
    stopGame,
    setStartGame,
}: {
    stopGame: Function,
    setStartGame: any
}) => {
    const [formValue, setFormValue] = useState('');

    const dispatch = useDispatch();
    const currentScore = useSelector((state: any) => state.score.score);

    // Input Form change handler
    const changeHandler = (e: any) => {
        setFormValue(e.target.value);
    };

    // Adding the current score to the high-scores
    const addHighScore = () => {
        if (formValue.length > 0) {
            dispatch(addToHighScores(formValue));
            stopGame();
            setStartGame(false);
        };
    };

    return (
        <article className="flex flex-col justify-center items-center">
            <p>Your score is: {currentScore}</p>
            <form className="flex flex-col justify-center items-center p-2">
                <input
                    id="enterName"
                    className="text-white text-center bg-transparent border-color-white border-solid border-2 focus:bg-white focus:text-black focus:outline-none min-h-20 w-3/4"
                    name="enterName"
                    type="text"
                    placeholder="Enter name here"
                    maxLength={10}
                    value={formValue}
                    onChange={changeHandler}
                />
            </form>
            <button className="p-2" onClick={() => addHighScore()}>Done</button>
        </article>
    );
};