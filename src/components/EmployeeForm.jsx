import { useState } from "react"

export default function EmployeeForm({ addEmployee }) {
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      addEmployee(name.trim())
      setName("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter employee name"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  )
}

