import { useAppSelector } from "../../utils/redux-hooks";

export const ScoreBoard = () => {

    const currentScore = useAppSelector((state: any) => state.score.score);
    const currentStreak = useAppSelector((state: any) => state.score.streak);

    return (
        <div className="flex flex-col items-end">
            <p className="p-1">Score: {currentScore}</p>
            <p className="p-1">Streak x{currentStreak}!</p>
        </div>
    );
};