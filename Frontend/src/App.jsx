import { useEffect, useState } from "react";
import { API } from "./api";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchEmployees = async () => {
    const { data } = await API.get("/");
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = async (employee) => {
    if (editing) {
      await API.put(`/${editing._id}`, employee);
      setEditing(null);
    } else {
      await API.post("/", employee);
    }
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await API.delete(`/${id}`);
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setEditing(emp);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Employee Management</h1>
      <EmployeeForm onSave={handleSave} employee={editing} />
      <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
