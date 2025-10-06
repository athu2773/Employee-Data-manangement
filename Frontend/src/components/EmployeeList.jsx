export default function EmployeeList({ employees, onEdit, onDelete }) {
  if (!employees.length) {
    return <p className="text-center text-gray-500">No employees found.</p>;
  }

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Position</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id} className="border text-center">
            <td className="p-2 border">{emp.name}</td>
            <td className="p-2 border">{emp.email}</td>
            <td className="p-2 border">{emp.position}</td>
            <td className="p-2 border">
              <button onClick={() => onEdit(emp)} className="text-blue-600 mr-2">
                Edit
              </button>
              <button
                onClick={() => onDelete(emp._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
