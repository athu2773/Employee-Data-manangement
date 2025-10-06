import { useEffect, useState } from "react";

export default function EmployeeForm({ onSave, employee }) {
  const [form, setForm] = useState({ name: "", email: "", position: "" });

  useEffect(() => {
    if (employee) setForm(employee);
  }, [employee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.position) return alert("All fields are required!");
    onSave(form);
    setForm({ name: "", email: "", position: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded w-full"
        required
      />
      <input
        name="position"
        value={form.position}
        onChange={handleChange}
        placeholder="Position"
        className="border p-2 rounded w-full"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {employee ? "Update" : "Add"}
      </button>
    </form>
  );
}
