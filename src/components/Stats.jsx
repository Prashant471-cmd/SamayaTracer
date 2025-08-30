const Stats = ({ totalTasks, activeTasks }) => {
  return (
    <div className="stats" id="stats">
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value" id="totalTasks">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" id="activeTasks">{activeTasks}</div>
          <div className="stat-label">Active Tasks</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
