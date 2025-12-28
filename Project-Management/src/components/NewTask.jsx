import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleTaskChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleDateChange(event) {
    setDueDate(event.target.value);
  }

  function handlePriorityChange(event) {
    setPriority(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      return;
    }
    onAdd({
      text: enteredTask,
      dueDate: dueDate || null,
      priority: priority,
      status: "todo",
    });
    setEnteredTask("");
    setDueDate("");
    setPriority("Medium");
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleTaskChange}
          value={enteredTask}
          placeholder="Task description"
        />
        <input
          type="date"
          className="px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleDateChange}
          value={dueDate}
        />
        <select
          className="px-2 py-1 rounded-sm bg-stone-200"
          onChange={handlePriorityChange}
          value={priority}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          className="px-4 py-1 rounded-sm bg-stone-800 text-stone-50 hover:bg-stone-950"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
