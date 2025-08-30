import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Stats from './components/Stats'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import ConfirmationModal from './components/ConfirmationModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingTaskSwitch, setPendingTaskSwitch] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    console.log('Loading from localStorage:', savedTasks);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        console.log('Parsed tasks:', parsedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing saved tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      console.log('Saving tasks to localStorage:', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
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
    // Check if any other task is currently running
    const runningTask = tasks.find(task => task.isRunning && task.id !== taskId);

    if (runningTask) {
      // Show custom modal if another task is running
      const newTask = tasks.find(t => t.id === taskId);
      setPendingTaskSwitch({
        currentTask: runningTask.name,
        newTask: newTask.name,
        taskId: taskId
      });
      setShowModal(true);
      return;
    }

    // If no other task is running, start immediately
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, isRunning: true }
        : { ...task, isRunning: false }
    ));
  };

  const handleConfirmSwitch = () => {
    if (pendingTaskSwitch) {
      setTasks(tasks.map(task =>
        task.id === pendingTaskSwitch.taskId
          ? { ...task, isRunning: true }
          : { ...task, isRunning: false }
      ));
    }
    setShowModal(false);
    setPendingTaskSwitch(null);
  };

  const handleCancelSwitch = () => {
    setShowModal(false);
    setPendingTaskSwitch(null);
  }; const pauseTask = (taskId) => {
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
      <Header onHome={() => { }} />
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

      {/* Custom Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onConfirm={handleConfirmSwitch}
        onCancel={handleCancelSwitch}
        currentTask={pendingTaskSwitch?.currentTask}
        newTask={pendingTaskSwitch?.newTask}
      />
    </div>
  )
}

export default App
