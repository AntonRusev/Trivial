import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { activateTimer, setSeconds } from './timerSlice';

export const Timer = () => {
    const dispatch = useDispatch();

    const timerSeconds = useSelector((state: any) => state.timer.seconds);
    const timerIsActive = useSelector((state: any) => state.timer.isActive);

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
        <div>
            <p>{timerSeconds}</p>
            <button onClick={() => dispatch(activateTimer())}>Start</button>
        </div>
    );
};