import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSeconds } from './timerSlice';

export const Timer = () => {
    const dispatch = useDispatch();

    const timerSeconds = useSelector((state: any) => state.timer.seconds);
    const timerIsActive = useSelector((state: any) => state.timer.isActive);
    const currentQuestion = useSelector((state: any) => state.questions.currentQuestion);

    useEffect(() => {
        let interval: any;

        // Countdown timer
        if (timerIsActive && timerSeconds >= 1) {
            interval = setInterval(() => {
                dispatch(setSeconds(timerSeconds - 1));
            }, 1000);
        } else {
            clearInterval(interval);
        };

        return () => clearInterval(interval);
    }, [timerSeconds, timerIsActive]);

    return (
        <div className="flex flex-col items-start">
            <p className="p-1">Question #: {currentQuestion}</p>
            <p className="p-1">Timer: <span id="pulse">{timerSeconds}</span></p>
        </div>
    );
};