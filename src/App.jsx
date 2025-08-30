import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Stats from './components/Stats'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Update running tasks timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.isRunning 
            ? { ...task, elapsedTime: task.elapsedTime + 1 }
            : task
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTask = (taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      elapsedTime: 0,
      isRunning: false
    };
    setTasks([...tasks, newTask]);
  };

  const startTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, isRunning: true }
        : task
    ));
  };

  const pauseTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, isRunning: false }
        : task
    ));
  };

  const resetTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, elapsedTime: 0, isRunning: false }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const activeTasks = tasks.filter(task => task.isRunning).length;

  return (
    <div className="container">
      <Header onHome={() => {}} />
      <Stats totalTasks={tasks.length} activeTasks={activeTasks} />
      <TaskForm onAddTask={addTask} />
      {tasks.length > 0 ? (
        <TaskList
          tasks={tasks}
          onStart={startTask}
          onPause={pauseTask}
          onReset={resetTask}
          onDelete={deleteTask}
        />
      ) : (
        <div className="empty-state" id="emptyState">
          <FontAwesomeIcon icon={faBrain} />
          <h3>Start Your Learning Journey</h3>
          <p>Add your first task to begin tracking your progress</p>
        </div>
      )}
    </div>
  )
}

export default App
