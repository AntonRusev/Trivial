export const Rules = ({
    setShowRules,
}: {
    setShowRules: any
}) => {

    return (
        <section className="position: fixed flex justify-center items-center top-0 left-0 h-full w-full z-10 bg-black-rgba">
            <div className="flex flex-col justify-center items-center h-full text-center bg-slate-500 w-3/4 h-auto p-8 rounded-xl">

                <h3 className="text-5xl font-bold italic">Rules</h3>

                <p className="py-2 text-black">The quiz consists of 30 questions, separated into 3 difficulty categories. For each correct answer given, points are awarded(depending on the stage of the quiz and the streak bonus).</p>
                <p className="py-2 text-black">There is a time limit for each question, if no answer is given within it, no points are given for the question and the streak is reset.</p>
                <p className="py-2 text-black">The questions from 1 to 10 have only 2 answer options to chose from- the correct answer and an incorrect one. The correct answer awards 100 points by default.</p>
                <p className="py-2 text-black">The questions from 11 to 20 have 3 possible answer options- the correct one + 2 incorrect. The correct answer awards 300 points by default.</p>
                <p className="py-2 text-black">The questions from 21 to 30 have 4 options- correct answer and 3 incorrect ones. The correct answer awards 500 points by default.</p>
                <p className="py-2 text-black">Giving incorrect answer doesn't deduct points from the score.</p>
                <p className="py-2 text-black">Giving consecutive correct answers, awards a streak bonus which multiplies the points earned. Each correct answers increments the streak multiplier by 1. Giving incorrect answer resets the streak to 1.</p>

                <button className="my-3 p-3 my-1 text-black  bg-white text-black" onClick={() => setShowRules(false)}>Close</button>
            </div>
        </section>
    );
};