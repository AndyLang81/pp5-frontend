# PP5 Task Manager - Frontend

## Overview

This is the **frontend** of the PP5 Task Manager, a full-stack productivity web app developed for the Code Institute Portfolio Project 5. The frontend is built using **React** and connects to a **Django REST Framework** backend. Users can log in, create, update, delete, and complete tasks. Tasks can be sorted by various attributes and displayed in a responsive tile layout.

## Live Demo

[Vercel Frontend Deployment](https://your-frontend.vercel.app)

Note: The backend must be live for the frontend to function.

## Features

- User authentication (login/logout)
- Create, edit, delete tasks
- Mark tasks as complete
- Sort tasks by due date, title, priority, and state
- Toggle task form (collapse/expand)
- Color-coded priority indicators
- Floating confirmation/error messages
- Fully responsive layout (mobile and desktop)

## Technologies Used

- React (JSX)
- JavaScript (ES6+)
- HTML5 & CSS3
- Vercel for deployment

## Setup Instructions

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/yourusername/pp5-frontend.git
   cd pp5-frontend
   ```

2. Create a `.env` file in the root:
   ```
   REACT_APP_API_URL=https://pp5-backend.onrender.com
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the app locally:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## User Stories

- As a user, I want to log in securely.
- As a user, I want to view my tasks in a clear and organized format.
- As a user, I want to add, edit, delete, and complete tasks.
- As a user, I want to sort tasks by date, title, priority, or state.
- As a user, I want visual feedback when I interact with the app.
- As a user, I want the app to work well on both desktop and mobile.

## Agile / GitHub Project

- All development followed Agile methodology.
- GitHub Projects and Issues were used to manage tasks and sprints.
- Each major feature had its own issue, branch, and commits.
- Frequent and descriptive commits were made throughout development.

## Assessment Coverage

| Requirement                          | Status     |
|--------------------------------------|------------|
| 4.1 CRUD operations                  | Complete   |
| 4.2 Data change notifications        | Implemented via floating messages |
| 4.3 User-friendly data presentation  | Tasks are sorted, styled, and responsive |
| 4.4 Exception handling and feedback  | Fully handled for all actions |
| 4.5 JSX code formatting              | Linted and manually cleaned |
| 4.6 Two validated forms              | Add Task and Edit Task |
| 4.7 Login state indication           | UI gated behind login; logout visible |
| 4.8 Clean final deployment           | No debug flags, no broken API links |

## Testing

- Manual testing across Chrome, Firefox, and Edge.
- Mobile responsiveness tested using Chrome DevTools and Android device.
- Tested CRUD flows: create, update, delete, mark as done.
- Form validation tested for required fields.
- Error handling tested with invalid inputs and API outages.

## Deployment

- Deployed to Vercel from the `main` branch.
- Auto-deploy enabled for continuous delivery.
- `.env` variables set securely in the Vercel dashboard.
- Final build matches local development version.

## Author

Anders Langhoff
