import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { FaPlus, FaTrash, FaCheck, FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now().toString(), title: task, completed: false }]);
      setTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <h1>Abhay's Personal Task Manager</h1>

      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}><FaPlus /> Add Task</button>
        <button className="clear-button" onClick={handleClearAll}><FaTrash /> Clear All</button>
      </div>

      <ul className="task-list">
        <AnimatePresence>
          {tasks.map((t) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, scale: t.completed ? 0.9 : 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className={`task ${t.completed ? 'completed' : ''}`}
            >
              <span className="task-title">{t.title}</span>
              <button className="tick-button" onClick={() => handleCompleteTask(t.id)}>
                {t.completed ? <FaCheck /> : '○'}
              </button>
              <button className="delete-button" onClick={() => handleDeleteTask(t.id)}>🗑</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
