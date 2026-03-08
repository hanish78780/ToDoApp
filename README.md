# Full-Stack MERN ToDo Application

A modern, responsive, and fully-featured To-Do List web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). 

## Features
- **Modern UI**: Designed with glassmorphism, responsive layouts, and a sleek dark mode aesthetic.
- **CSS Animations**: Interactive state transitions (fade-in, slide-up, checked pop-in, delete fade-out) for a premium feel.
- **RESTful API**: A robust Node/Express backend that handles all CRUD operations.
- **State Management**: Real-time React hook synchronization with API fetch integration.
- **Persistent Data**: All tasks and completion statuses are securely stored in MongoDB.

## Tech Stack
- **Frontend**: React.js (Vite), native CSS3 Animations.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ORM).

## Project Structure
```text
ToDoApp/
├── client/          # React.js Frontend Application
│   ├── src/
│   │   ├── components/  # Reusable UI components (TaskItem.jsx)
│   │   ├── App.jsx      # Main application state and API views
│   │   └── index.css    # Global stylesheet and animation keyframes
│   └── package.json
└── server/          # Node.js Express Backend API
    ├── config/      # Database connection configuration
    ├── controllers/ # API logic (taskController.js)
    ├── models/      # Mongoose Schemas (Task.js)
    ├── routes/      # Express routing (tasks.js)
    ├── index.js     # Express server entry point
    └── package.json
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd ToDoApp
   ```

2. **Backend Setup**
   Ensure you have a MongoDB instance running. Configure your `.env` file in the `/server` directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   ```
   Install dependencies and start the backend:
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   Open a new terminal and navigate to the client folder.
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the App**
   Open your browser and navigate to `http://localhost:5173`.

## API Endpoints (`/tasks`)
- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task (expects `{ title: String }`)
- `PUT /tasks/:id` - Update task completion status (expects `{ completed: Boolean }`)
- `DELETE /tasks/:id` - Delete a task by ID
