import { Trash2 } from 'lucide-react'

export default function EmployeeList({ employees, deleteEmployee, setSelectedEmployee }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Employees</h2>
      <ul className="space-y-2">
        {employees.map(employee => (
          <li key={employee.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <button
              onClick={() => setSelectedEmployee(employee.id)}
              className="text-lg hover:text-blue-600 transition-colors"
            >
              {employee.name}
            </button>
            <button
              onClick={() => deleteEmployee(employee.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
