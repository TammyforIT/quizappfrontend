What My App Is
This is a small MERN app I built for my project. It has basic login and registration, a simple dashboard, and a quiz page. The whole point was to keep it minimal and just show the core idea working.

What My App Does
Users can make an account and log in. Their info gets saved in MongoDB. Once they’re logged in, they get taken to a dashboard that shows their username, email, and bio. You can’t open the dashboard unless you’re logged in.

I also added a short quiz called “How Do You Know She Loves You?”. The questions and answers are all on the frontend. It tracks your choices, gives you a result, and has a button to go back to the dashboard. The quiz doesn’t use the backend at all.

The app uses React Router DOM to switch between pages.
Routes are:

/auth for login/register

/dashboard for the dashboard

/quiz for the quiz

The UI is simple: glass panels, gradients, and basic CSS. Nothing fancy.

Why This Is an MVP
It has the essentials: login, protected routes, a dashboard, a working quiz, and navigation. No extra features or complicated backend logic. Just enough to show the idea clearly.
https://github.com/TammyforIT/quizappbackend
Naming conventions are super important