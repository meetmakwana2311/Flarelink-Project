import React from 'react';

const TaskItem = ({ task, deleteTask, toggleCompletion }) => {
  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      <span>
        {task.title} - {task.priority}
      </span>
      <button onClick={() => toggleCompletion(task.id)}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
