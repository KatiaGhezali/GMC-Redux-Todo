import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/taskSlice";

function AddTask({ taskToEdit, onCancelEdit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
    } else {
      setName("");
      setDescription("");
    }

    setError("");
  }, [taskToEdit]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !description.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    if (taskToEdit) {
      dispatch(
        editTask({
          id: taskToEdit.id,
          name: name.trim(),
          description: description.trim(),
        }),
      );

      onCancelEdit();
    } else {
      dispatch(addTask(name.trim(), description.trim()));
    }

    setName("");
    setDescription("");
    setError("");
  }

  function handleCancel() {
    setName("");
    setDescription("");
    setError("");
    onCancelEdit();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{taskToEdit ? "Edit task" : "Add a new task"}</h3>

      <div className="form-group">
        <label htmlFor="task-name">Task name</label>

        <input
          id="task-name"
          type="text"
          placeholder="e.g. Finish my assignment"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description</label>

        <textarea
          id="task-description"
          placeholder="Add some details about your task..."
          rows="3"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setError("");
          }}
        />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {taskToEdit ? "Save changes" : "Add task"}
        </button>

        {taskToEdit && (
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddTask;
