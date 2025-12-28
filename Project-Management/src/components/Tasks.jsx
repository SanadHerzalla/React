import { useState } from "react";
import NewTask from "./NewTask";

export default function Tasks({ tasks, onAdd, onDelete, onUpdateStatus }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter tasks based on search and status
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
    total: tasks.length,
  };

  // Check if task is overdue
  function isOverdue(dueDate) {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }

  // Get priority color
  function getPriorityColor(priority) {
    switch (priority) {
      case "High":
        return "text-red-600 font-semibold";
      case "Medium":
        return "text-yellow-600 font-semibold";
      case "Low":
        return "text-green-600 font-semibold";
      default:
        return "text-stone-600";
    }
  }

  // Format date
  function formatDate(dateString) {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      
      {/* Task Statistics */}
      <div className="mb-4 p-4 bg-stone-200 rounded-md">
        <h3 className="text-lg font-semibold text-stone-700 mb-2">Task Statistics</h3>
        <div className="flex gap-4 text-sm">
          <span className="text-stone-600">
            <strong>Total:</strong> {stats.total}
          </span>
          <span className="text-blue-600">
            <strong>Todo:</strong> {stats.todo}
          </span>
          <span className="text-yellow-600">
            <strong>In Progress:</strong> {stats["in-progress"]}
          </span>
          <span className="text-green-600">
            <strong>Done:</strong> {stats.done}
          </span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          className="w-full px-3 py-2 rounded-sm bg-stone-200 border border-stone-300 focus:outline-none focus:border-stone-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-sm text-sm ${
              statusFilter === "all"
                ? "bg-stone-800 text-stone-50"
                : "bg-stone-300 text-stone-700 hover:bg-stone-400"
            }`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded-sm text-sm ${
              statusFilter === "todo"
                ? "bg-blue-600 text-white"
                : "bg-stone-300 text-stone-700 hover:bg-stone-400"
            }`}
            onClick={() => setStatusFilter("todo")}
          >
            Todo ({stats.todo})
          </button>
          <button
            className={`px-3 py-1 rounded-sm text-sm ${
              statusFilter === "in-progress"
                ? "bg-yellow-600 text-white"
                : "bg-stone-300 text-stone-700 hover:bg-stone-400"
            }`}
            onClick={() => setStatusFilter("in-progress")}
          >
            In Progress ({stats["in-progress"]})
          </button>
          <button
            className={`px-3 py-1 rounded-sm text-sm ${
              statusFilter === "done"
                ? "bg-green-600 text-white"
                : "bg-stone-300 text-stone-700 hover:bg-stone-400"
            }`}
            onClick={() => setStatusFilter("done")}
          >
            Done ({stats.done})
          </button>
        </div>
      </div>

      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This Project doesn't have any tasks yet
        </p>
      )}
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <p className="text-stone-800 my-4">
          No tasks match your search criteria
        </p>
      )}
      {filteredTasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100 space-y-3">
          {filteredTasks.map((task) => {
            const overdue = isOverdue(task.dueDate);
            return (
              <li
                key={task.id}
                className="flex flex-col gap-2 p-3 bg-white rounded-md border border-stone-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-stone-800">
                        {task.text}
                      </span>
                      <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                        ⭐ {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-stone-600">
                      <span className={overdue ? "text-red-600 font-semibold" : ""}>
                        ⏱ {formatDate(task.dueDate)}
                        {overdue && " (Overdue)"}
                      </span>
                      <select
                        className="px-2 py-1 rounded-sm bg-stone-200 text-xs"
                        value={task.status}
                        onChange={(e) => onUpdateStatus(task.id, e.target.value)}
                      >
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  </div>
                  <button
                    className="text-stone-700 hover:text-red-500 px-2"
                    onClick={() => onDelete(task.id)}
                  >
                    Clear
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
