import { useState } from "react";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";

function App() {
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEdit = (task) => {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1>My Todo List</h1>
        <p>Organize your tasks, one step at a time.</p>
      </header>

      <AddTask taskToEdit={taskToEdit} onCancelEdit={cancelEdit} />

      <ListTask onEdit={handleEdit} />
    </main>
  );
}

export default App;
