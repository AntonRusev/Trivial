import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToHighScores } from "./scoreSlice";

export const AddScore = () => {
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
        };
    };

    return (
        <article>
            <p>Your score is: {currentScore}</p>
            <form>
                <label htmlFor="enterName">Enter name:</label>
                <input
                    id="enterName"
                    name="enterName"
                    type="text"
                    maxLength={10}
                    value={formValue}
                    onChange={changeHandler}
                />
            </form>
            <button onClick={() => addHighScore()}>Done</button>
        </article>
    );
};