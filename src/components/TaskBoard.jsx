import { useDrop } from "react-dnd"
import Task from "./Task"

const columns = ["To Do", "In Progress", "Completed"]

export default function TaskBoard({ tasks, updateTaskStatus, unassignTask }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Task Board</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <Column
            key={column}
            status={column}
            tasks={tasks.filter((task) => task.status === column)}
            updateTaskStatus={updateTaskStatus}
            unassignTask={unassignTask}
          />
        ))}
      </div>
    </div>
  )
}

function Column({ status, tasks, updateTaskStatus, unassignTask }) {
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => updateTaskStatus(item.id, status),
  }))

  return (
    <div ref={drop} className="bg-gray-200 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{status}</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <Task key={task.id} task={task} unassignTask={unassignTask} />
        ))}
      </div>
    </div>
  )
}

