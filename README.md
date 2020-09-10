# Interview Scheduler

React based project to create meetings for students to connect with mentors in real-time.

Tech Stack: React, Classnames, Storybook,
Babel, WebSockets, Axios, Webpack Dev Server, Jest, Testing Library, Cypress, prop-types

## Final Product

Check it out [here](https://quizzical-heyrovsky-2b1ec0.netlify.app/)

If the appointments are not showing, please click [here] first (https://scheduler-lhl-2020.herokuapp.com/api/days)

!["screenshot of scheduler home page"](https://github.com/Marwa7246/scheduler/blob/master/docs/scheuler_home.png?raw=true)
!["screenshot of editing/creating appointment"](https://github.com/Marwa7246/scheduler/blob/master/docs/editing-appointment.png?raw=true)
!["screenshot of deleting appointment"](https://github.com/Marwa7246/scheduler/blob/master/docs/deleting-appointment.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running cypress Test Framework

```sh
from the scheduler api directory: npm run test:server
```

from scheduler root directory: npm run cypress

## Dependencies

- react
- react-dom
- classnames
- normalize.css
- @babel/core
- @testing-library/jest-dom
- @storybook/react
- node-sass
- axios
- @testing-library/react-hooks
- react-test-renderer
- prop-types

## Deploy

- Deploy the server to Heroku
- Implement Continuous Pipeline by connecting CircleCI to GitHub
- Deploy the client to Netlify
