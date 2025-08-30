import TaskItem from './TaskItem';

const TaskList = ({ tasks, onStart, onPause, onReset, onDelete }) => {
  return (
    <div className="tasks-grid" id="taskList">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onStart={onStart}
          onPause={onPause}
          onReset={onReset}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
