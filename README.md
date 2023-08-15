## What is Trivia-l?

- Trivia-l is a quiz game, in which you can test your general knowledge in various categories. 

- The quiz consists of 30 questions, separated into 3 difficulty categories. For each correct answer given, points are awarded(depending on the stage of the quiz and the streak bonus).

- There is a time limit for each question, if no answer is given within it, no points are given for the question and the streak is reset.
+ The questions from 1 to 10 have only 2 answer options to chose from- the correct answer and an incorrect one. The correct answer awards 100 points by default.
+ The questions from 11 to 20 have 3 possible answer options- the correct one + 2 incorrect. The correct answer awards 300 points by default.
+ The questions from 21 to 30 have 4 options- correct answer and 3 incorrect ones. The correct answer awards 500 points by default.

- Giving incorrect answer doesn't deduct points from the score.

- Giving consecutive correct answers, awards a streak bonus which multiplies the points earned. Each correct answers increments the streak multiplier by 1. Giving incorrect answer resets the streak to 1.


## Under the hood

- Trivia-l is a SPA(single page application), developed with the help of tools and technologies, such as ReactJS, Redux Toolkit, Typescript and Tailwind CSS, among others. 

- The questions data for the quiz is fetched from Trivia REST API, which can be found at https://the-trivia-api.com/

- The app has responsive design, with starting point from 360px(mobile screen).

## Accessing the App

- The app can be accessed at https://trivia-l.web.app/

