
import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks when the component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Unable to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate task statistics
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;

  // Create a new task
  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      await fetchTasks();
      setShowForm(false);
      return true;
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Unable to create task. Please try again.");
      return false;
    }
  };

  // Update existing task
  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      await fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Unable to update task. Please try again.");
    }
  };

  // delete task
  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Unable to delete task. Please try again.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>TaskFlow</h1>
        <p>Simple Task Manager</p>
      </header>

      <main className="container">
        {/* Dashboard section */}
        <section className="dashboard">
          <h2>My Tasks</h2>
          <p>Manage all your tasks in one place.</p>

          <div className="stats">
            <div className="stat-card">
              <p>Total Tasks - <strong>{totalTasks}</strong></p>
            </div>

            <div className="stat-card">
              <p>Pending - <strong>{pendingTasks}</strong></p>
              <p>In Progress - <strong>{inProgressTasks}</strong></p>
              <p>Completed - <strong>{completedTasks}</strong></p>
            </div>

          </div>
        </section>

        {/* Task List section */}
        <section className="tasks-section">
          <div className="section-header">


            <button
              className="add-button"
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
            >
              + Add New Task
            </button>
          </div>


          {(showForm || editingTask) && (
            <div className="modal-overlay">
              <div className="modal-content">
                <TaskForm
                  key={editingTask ? editingTask._id : "new-task"}
                  initialData={editingTask}
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingTask(null);
                  }}
                />
              </div>
            </div>
          )}

          {loading && (
            <p className="empty-message">Loading tasks...</p>
          )}

          {error && (
            <p className="error-message">{error}</p>
          )}

          {!loading && !error && tasks.length === 0 && (
            <p className="empty-message">
              No tasks available. Add your first task!
            </p>
          )}

          {!loading && !error && tasks.length > 0 && (
            <div className="task-list">
              {tasks.map((task) => (
                <div className="task-card" key={task._id}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>

                  <div className="task-details">
                    <span className={`status ${task.status}`}>
                      {task.status}
                    </span>

                    <span className={`priority ${task.priority}`}>
                      {task.priority} priority
                    </span>
                  </div>

                  {task.dueDate && (
                    <p className="due-date">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingTask(task);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
