import { useDrag } from "react-dnd"
import { Trash2 } from "lucide-react"

export default function Task({ task, deleteTask, unassignTask }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} className={`bg-white p-4 rounded-lg shadow ${isDragging ? "opacity-50" : ""}`}>
      <div className="flex justify-between items-center">
        <span>{task.title}</span>
        <div>
          {unassignTask && (
            <button
              onClick={() => unassignTask(task.id)}
              className="text-blue-500 hover:text-blue-700 transition-colors mr-2"
            >
              Unassign
            </button>
          )}
          {deleteTask && (
            <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 transition-colors">
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

