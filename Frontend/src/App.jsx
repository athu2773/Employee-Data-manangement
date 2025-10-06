import { useState, useEffect } from 'react';
import { Plus, Users, Loader2 } from 'lucide-react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Toast from './components/Toast';
import { employeeService } from './services/employeeService';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [toast, setToast] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      showToast('Failed to load employees. Please check your connection.', 'error');
      console.error('Error loading employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      loadEmployees();
      return;
    }

    try {
      const data = await employeeService.searchEmployees(term);
      setEmployees(data);
    } catch (err) {
      showToast('Search failed. Please try again.', 'error');
      console.error('Error searching employees:', err);
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      return;
    }

    setActionLoading(true);
    try {
  await employeeService.deleteEmployee(id);
  setEmployees(employees.filter(emp => (emp._id || emp.id) !== id));
      showToast('Employee deleted successfully', 'success');
    } catch (err) {
      showToast('Failed to delete employee. Please try again.', 'error');
      console.error('Error deleting employee:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    setActionLoading(true);
    try {
      if (editingEmployee) {
  const updated = await employeeService.updateEmployee(editingEmployee._id || editingEmployee.id, formData);
  setEmployees(employees.map(emp => (emp._id || emp.id) === (updated._id || updated.id) ? updated : emp));
        showToast('Employee updated successfully', 'success');
      } else {
  const created = await employeeService.createEmployee(formData);
  setEmployees([created, ...employees]);
        showToast('Employee added successfully', 'success');
      }
      setShowForm(false);
      setEditingEmployee(null);
    } catch (err) {
      if (err.message.includes('duplicate') || err.message.includes('email')) {
        showToast('An employee with this email already exists.', 'error');
      } else {
        showToast(`Failed to ${editingEmployee ? 'update' : 'add'} employee. Please try again.`, 'error');
      }
      console.error('Error saving employee:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/30">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Employee Management</h1>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Loading...' : `${employees.length} ${employees.length === 1 ? 'employee' : 'employees'}`}
                </p>
              </div>
            </div>
            <button
              onClick={handleAddEmployee}
              disabled={actionLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Add Employee
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading employees...</p>
          </div>
        ) : (
          <EmployeeList
            employees={employees}
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        )}
      </div>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {actionLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-gray-700 font-medium">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
