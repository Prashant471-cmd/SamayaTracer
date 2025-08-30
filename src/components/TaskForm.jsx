import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName.trim());
      setTaskName('');
    }
  };

  return (
    <div className="add-task-section">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="task-input"
            placeholder="Enter task name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button type="submit" className="add-btn">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
