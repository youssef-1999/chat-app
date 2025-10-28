import React from 'react'

function Employees({employee}) {
  return (
      <tr key={employee.id} className="hover:bg-gray-50 border-b">
        <td className="px-6 py-3 whitespace-nowrap">{employee.date}</td>
        <td className="px-6 py-3 font-medium whitespace-nowrap">
          {employee.employeeName}
        </td>
        <td className="px-6 py-3">
          <p className="px-5 py-3 font-bold bg-gray-200 rounded-md text-center whitespace-nowrap">
            {employee.score} stars
          </p>
        </td>
        <td className="px-6 py-3 text-gray-600  overflow-hidden text-ellipsis max-w-xs">
          {employee.notes}
        </td>
      </tr>
  )
}

export default Employees