import { useState } from "react"

export default function TaskForm({ addTask, assignee }) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      addTask({ title: title.trim(), assignee })
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Add Task</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}

