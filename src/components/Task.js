import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../redux/taskSlice";

function Task({ task, onEdit }) {
  const dispatch = useDispatch();

  return (
    <article className={`task-item ${task.isDone ? "completed" : ""}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.isDone}
        onChange={() => dispatch(toggleTask(task.id))}
        aria-label={`Mark ${task.name} as ${
          task.isDone ? "not completed" : "completed"
        }`}
      />

      <div className="task-content">
        <button
          type="button"
          className="task-name-button"
          onClick={() => onEdit(task)}
          title="Click to edit this task"
        >
          {task.name}
        </button>

        <p className="task-description">{task.description}</p>

        <span
          className={`task-status ${
            task.isDone ? "status-done" : "status-pending"
          }`}
        >
          {task.isDone ? "Completed" : "In progress"}
        </span>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="edit-button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.name}`}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => dispatch(deleteTask(task.id))}
          aria-label={`Delete ${task.name}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default Task;
