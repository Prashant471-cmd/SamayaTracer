import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRotateLeft, faTrash, faBolt } from '@fortawesome/free-solid-svg-icons';

const TaskItem = ({ task, onStart, onPause, onReset, onDelete }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`task-item ${task.isRunning ? 'running' : ''}`}>
      <div className="task-name">
        {task.isRunning && (
          <FontAwesomeIcon icon={faBolt} className="lightning-icon" />
        )}
        {task.name}
      </div>
      <div className="task-time">{formatTime(task.elapsedTime)}</div>
      <div className="task-controls">
        {!task.isRunning ? (
          <button onClick={() => onStart(task.id)} className="control-btn start">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        ) : (
          <button onClick={() => onPause(task.id)} className="control-btn pause">
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}
        <button onClick={() => onReset(task.id)} className="control-btn reset">
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
        <button onClick={() => onDelete(task.id)} className="control-btn delete">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
