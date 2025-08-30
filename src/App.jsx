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
  const [isLoaded, setIsLoaded] = useState(false); // Track if data has been loaded

  // Load tasks from localStorage on component mount
  useEffect(() => {
    console.log('Loading from localStorage...');
    const savedTasks = localStorage.getItem('samaya-tasks');
    console.log('Saved tasks:', savedTasks);

    if (savedTasks && savedTasks !== 'undefined' && savedTasks !== 'null') {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        console.log('Parsed tasks:', parsedTasks);

        if (Array.isArray(parsedTasks)) {
          // Validate each task has required properties
          const validTasks = parsedTasks.filter(task =>
            task &&
            typeof task.id === 'number' &&
            typeof task.name === 'string' &&
            typeof task.elapsedTime === 'number' &&
            typeof task.isRunning === 'boolean'
          );
          console.log('Valid tasks:', validTasks);
          setTasks(validTasks);
        }
      } catch (error) {
        console.error('Error parsing saved tasks:', error);
        localStorage.removeItem('samaya-tasks'); // Clear corrupted data
      }
    }
    setIsLoaded(true); // Mark as loaded
  }, []);

  // Save tasks to localStorage whenever they change (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      console.log('Saving tasks to localStorage:', tasks);
      localStorage.setItem('samaya-tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

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
    console.log('Adding new task:', taskName);
    const newTask = {
      id: Date.now(),
      name: taskName,
      elapsedTime: 0,
      isRunning: false
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Immediately save to localStorage to ensure new task persists
    if (isLoaded) {
      localStorage.setItem('samaya-tasks', JSON.stringify(updatedTasks));
      console.log('Saved new task to localStorage');
    }
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
    console.log('Deleting task with ID:', taskId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    console.log('Updated tasks after deletion:', updatedTasks);

    // Update state
    setTasks(updatedTasks);

    // Immediately save to localStorage to ensure deletion persists
    if (isLoaded) {
      localStorage.setItem('samaya-tasks', JSON.stringify(updatedTasks));
      console.log('Saved updated tasks to localStorage after deletion');
    }
  };

  // Function to clear all data (for debugging or reset)
  const clearAllData = () => {
    console.log('Clearing all data');
    setTasks([]);
    localStorage.removeItem('samaya-tasks');
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
