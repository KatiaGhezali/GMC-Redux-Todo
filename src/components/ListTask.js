import { useState } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";

function ListTask({ onEdit }) {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filter, setFilter] = useState("all");

  const activeCount = tasks.filter((task) => !task.isDone).length;

  const completedCount = tasks.filter((task) => task.isDone).length;

  const filters = [
    {
      value: "all",
      label: "All tasks",
      count: tasks.length,
    },
    {
      value: "active",
      label: "Active",
      count: activeCount,
    },
    {
      value: "completed",
      label: "Completed",
      count: completedCount,
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.isDone;
    }

    if (filter === "completed") {
      return task.isDone;
    }

    return true;
  });

  return (
    <section className="task-section">
      <div className="list-header">
        <div>
          <h2>Your tasks</h2>
          <p className="list-subtitle">Keep track of what needs to get done.</p>
        </div>

        <span className="total-count">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      <div className="filter-controls" role="group" aria-label="Filter tasks">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`filter-button ${
              filter === item.value ? "active-filter" : ""
            }`}
            onClick={() => setFilter(item.value)}
            aria-pressed={filter === item.value}
          >
            <span>{item.label}</span>
            <span className="filter-count">{item.count}</span>
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{tasks.length === 0 ? "✓" : "○"}</div>

          <h3>
            {tasks.length === 0
              ? "Your list is clear"
              : filter === "active"
                ? "No active tasks"
                : filter === "completed"
                  ? "No completed tasks yet"
                  : "No matching tasks"}
          </h3>

          <p>
            {tasks.length === 0
              ? "Add a task above to get started."
              : filter === "active"
                ? "You've completed all your tasks. Nice work!"
                : "Your tasks will appear here when they match this filter."}
          </p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} onEdit={onEdit} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ListTask;
