import { useState, useEffect } from 'react'
import TaskItem from './components/TaskItem'
import './index.css' // Global styles with animations

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputValue.trim() })
      });
      const newTask = await res.json();
      // Add to state immediately for snappy UI (Slide up animation plays)
      setTasks(prev => [newTask, ...prev]);
      setInputValue('');
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      // Optimistic update
      setTasks(prev => prev.map(t => t._id === id ? { ...t, completed } : t));
      
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      });
    } catch (error) {
      console.error("Failed to update task", error);
      // Revert on fail
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    try {
      // The TaskItem component waits 400ms for animation before calling this
      setTasks(prev => prev.filter(t => t._id !== id));
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Failed to delete task", error);
      fetchTasks(); // Revert on fail
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Tasks</h1>
        <p className="subtitle">Organize your workflow creatively</p>
      </header>

      <div className="glass-card">
        <form className="task-form" onSubmit={addTask}>
          <input 
            type="text" 
            className="task-input"
            placeholder="What needs to be done?" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            maxLength={100}
          />
          <button type="submit" className="btn-add">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add
          </button>
        </form>
      </div>

      <div className="task-list">
        {isLoading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">No tasks pending. You're all caught up! ✨</div>
        ) : (
          tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App
