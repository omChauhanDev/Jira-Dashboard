import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'
import TaskBoard from './components/TaskBoard'
import TaskList from './components/TaskList'

function App() {
  const [employees, setEmployees] = useState([])
  const [tasks, setTasks] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const addEmployee = (name) => {
    setEmployees([...employees, { id: Date.now().toString(), name }])
  }

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id))
    setTasks(tasks.map(task => task.assignee === id ? { ...task, assignee: null } : task))
  }

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString(), status: 'To Do', assignee: null }])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTaskStatus = (taskId, status) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status } : task))
  }

  const assignTask = (taskId, employeeId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, assignee: employeeId } : task))
  }

  const unassignTask = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, assignee: null } : task))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Jira Board</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <EmployeeForm addEmployee={addEmployee} />
            <EmployeeList 
              employees={employees} 
              deleteEmployee={deleteEmployee}
              setSelectedEmployee={setSelectedEmployee}
            />
          </div>
          <div className="w-full lg:w-3/4">
            <TaskList 
              tasks={tasks.filter(task => task.assignee === null)}
              addTask={addTask}
              deleteTask={deleteTask}
              assignTask={assignTask}
              employees={employees}
            />
            {selectedEmployee && (
              <TaskBoard 
                tasks={tasks.filter(task => task.assignee === selectedEmployee)}
                updateTaskStatus={updateTaskStatus}
                unassignTask={unassignTask}
              />
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default App
