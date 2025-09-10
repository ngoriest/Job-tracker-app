# Job Tracker App

VIDEO PRESENTATION
https://www.loom.com/share/b8947c5061774f42b43fdc68fd3d882b?sid=007f3438-6d5f-4700-b404-28307c963b2c

This is a job application tracking system built with a Flask backend and a React frontend. It allows users to register, log in, and manage job applications and related tasks.

Date: 29/06/2025  
Author: Manase

## Description

The application includes:

- A user authentication system (register and login)
- A dashboard for viewing and managing job applications
- A task manager for tracking application-related actions
- A clean, responsive user interface

## Features / User Stories

### User Features

- Register with email and password
- Log in securely using a token-based system
- Create, view, update, and delete job applications
- Create tasks related to specific applications
- Mark tasks as completed or pending


## Setup and Installation

### Backend Setup (Flask)

1. Clone or download the project.
2. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   pipenv install
   pipenv shell
   flask db upgrade
   flask run --debug
````

Your Flask backend will run at:
`http://localhost:5000`

### Frontend Setup (React)

1. Open another terminal and navigate to the frontend folder:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The React app will start at:
`http://localhost:5173`

## Deployment

You can deploy the frontend and backend using services like Render, Netlify, or Vercel.

* Frontend Live URL: 
* Backend Live URL: 

## Known Issues

Currently, there are no known bugs. The application is working as expected.

## Technologies Used

* Flask
* Flask-JWT-Extended
* Flask-Migrate
* SQLAlchemy
* React
* Tailwind CSS
* Toastify
* JavaScript (ES6+)
* Python

## Contact Information

Email: [thee.manase@gmail.com](mailto:thee.manase@gmail.com)

## License

This project is licensed under the MIT License.


