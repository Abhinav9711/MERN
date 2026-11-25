# TaskFlow – MERN Stack Task Management Application

TaskFlow is a full-stack task management application built using the MERN stack. It allows users to create, view, update, and delete tasks through a simple and user-friendly interface.

## Features


- Create new tasks.
- View all available tasks.
- Update existing tasks.
- Delete tasks.
- Set task status:
  - Pending
  - In Progress
  - Completed
- Set task priority:
  - Low
  - Medium
  - High
- Assign due dates to tasks.
- Dashboard displaying total, pending, in-progress, and completed task counts.

## Tech Stack

**Frontend**
- React.js
- Vite
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
MERN/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account or a local MongoDB instance
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Abhinav9711/MERN.git
cd MERN
```

### 2. Setup the Backend

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the server directory using `.env.example` as a reference.

Configure your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

The backend server will run at:

http://localhost:5000

### 3. Setup the Frontend

Open another terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

http://localhost:5173

## API Endpoints

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description |
|---|---|---|
| POST | / | Create a new task |
| GET | / | Get all tasks |
| GET | /:id | Get a task by ID |
| PUT | /:id | Update a task |
| DELETE | /:id | Delete a task |

## Environment Variables

The backend requires the following environment variables:

| Variable | Description |
|---|---|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |

**Note:** Never commit your `.env` file or expose database credentials in the repository.

## Future Improvements

- User authentication and authorization.
- Task search and filtering.
- Pagination for large task lists.
- Task reminders and notifications.

## Author

Abhinav Gupta

GitHub: https://github.com/Abhinav9711