import { useSelector } from "react-redux";

export const ScoreBoard = () => {

    const currentScore = useSelector((state: any) => state.score.score);
    return (
        <article>
            Score: {currentScore}
        </article>
    );
};