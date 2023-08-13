import { useSelector } from "react-redux";

export const ScoreBoard = () => {

    const currentScore = useSelector((state: any) => state.score.score);
    const currentStreak = useSelector((state: any) => state.score.streak);

    return (
        <div className="flex flex-col items-end">
            <p className="p-1">Score: {currentScore}</p>
            <p className="p-1">Streak x{currentStreak}!</p>
        </div>
    );
};