# PP5 Task Manager - Frontend

## Overview

This is the **frontend** of the PP5 Task Manager, a full-stack productivity web app developed for the Code Institute Portfolio Project 5. The frontend is built using **React** and connects to a **Django REST Framework** backend. Users can log in, create, update, delete, and complete tasks. Tasks can be sorted by various attributes and displayed in a responsive tile layout.

## Live Demo

[Vercel Frontend Deployment](https://your-frontend.vercel.app)

## Features

- User authentication (login/logout)
- Add, edit, and delete tasks
- Mark tasks as complete
- Sort tasks by due date, title, priority, and status
- Collapse/expand task form
- Color-coded priority levels (low, medium, high)
- Responsive layout (mobile and desktop)

## Technologies Used

- React
- JavaScript (ES6+)
- HTML5/CSS3
- JSX
- Vercel for deployment

## Setup Instructions

1. Clone the frontend repo:
   ```bash
   git clone https://github.com/yourusername/pp5-frontend.git
   cd pp5-frontend
   ```

2. Create a `.env` file:
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

- As a user, I want to log in securely so that I can manage my tasks.
- As a user, I want to view my tasks in an organized way.
- As a user, I want to add a new task using a simple form.
- As a user, I want to edit or delete tasks that I’ve created.
- As a user, I want to mark tasks as complete.
- As a user, I want to sort tasks by different attributes.

## Agile / GitHub Project

- All development followed Agile methodology with issues and tasks tracked using GitHub Projects and Issues.
- Commits are frequent, descriptive, and tied to specific changes or features.

## Testing

- Manual testing performed across Chrome, Firefox, and Edge.
- Responsive behavior tested on mobile and desktop.
- Authentication, CRUD operations, and sorting all manually tested.
- Documented test cases available upon request.

## Deployment

- Deployed using Vercel.
- Auto-deploys enabled from main branch.
- Environment variables set securely in Vercel dashboard.

## Author

Anders Langhoff