import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Wait for the fade out animation to complete before removing from DOM/DB
    setTimeout(() => {
      onDelete(task._id);
    }, 400);
  };

  const handleToggle = () => {
    onToggle(task._id, !task.completed);
  };

  // Format date
  const dateStr = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <div className="task-left">
        <div 
          className={`check-container ${task.completed ? 'checked' : ''}`}
          onClick={handleToggle}
        >
          <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="task-info">
          <span className="task-title">{task.title}</span>
          <span className="task-date">{dateStr}</span>
        </div>
      </div>
      <button className="btn-delete" onClick={handleDelete} title="Delete Task">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;
