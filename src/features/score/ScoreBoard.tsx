import { useSelector } from "react-redux";

export const ScoreBoard = () => {
    const currentScore = useSelector((state: any) => state.score.score);
    const currentStreak = useSelector((state: any) => state.score.streak);

    return (
        <article>
            <p>Score: {currentScore}</p>
            <p>Streak x{currentStreak}!</p>
        </article>
    );
};