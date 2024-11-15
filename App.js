import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import SearchBar from './SearchBar';
import './style.css'; 

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); 
  const [sortBy, setSortBy] = useState('title'); 

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        filter === 'all' ||
        (filter === 'completed' && task.completed) ||
        (filter === 'incomplete' && !task.completed)
    )
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'priority') {
        return a.priority > b.priority ? 1 : -1;
      }
      return a.title > b.title ? 1 : -1;
    });

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <TaskInput addTask={addTask} />

      <div>
        <label>
          Filter:
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>

        <label>
          Sort by:
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
};

export default App;
