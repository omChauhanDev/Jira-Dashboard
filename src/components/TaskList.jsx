import { useState } from "react"
import { useDrop } from "react-dnd"
import Task from "./Task"
import TaskForm from "./TaskForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function TaskList({ tasks, addTask, deleteTask, assignTask, employees }) {
  const [, drop] = useDrop(() => ({ accept: "TASK" }))

  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const handleAssign = (taskId) => {
    if (selectedEmployee) {
      assignTask(taskId, selectedEmployee)
      setSelectedEmployee(null)
    }
  }

  return (
    <div ref={drop} className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Unassigned Tasks</h2>
      <TaskForm addTask={addTask} />
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="grid grid-cols-3 items-center justify-center gap-4">
            <div className="w-full">
              <Task task={task} deleteTask={deleteTask} />
            </div>
            <div className="flex justify-center items-center w-full">
              <Select onValueChange={(value) => setSelectedEmployee(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Assign to..." />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center items-center w-xl">
              <button
                  onClick={() => handleAssign(task.id)}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Assign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

