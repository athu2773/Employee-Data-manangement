const API_BASE_URL = "https://employee-data-manangement.onrender.com/employees";

async function handleJSONResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    let err;
    try {
      err = JSON.parse(text);
    } catch (e) {
      err = { message: text };
    }
    const error = new Error(err.message || 'Request failed');
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export const employeeService = {
  async getAllEmployees() {
    const res = await fetch(API_BASE_URL);
    return handleJSONResponse(res);
  },

  async searchEmployees(term) {
    const url = `${API_BASE_URL}/search?term=${encodeURIComponent(term)}`;
    const res = await fetch(url);
    return handleJSONResponse(res);
  },

  async getEmployee(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    return handleJSONResponse(res);
  },

  async createEmployee(data) {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleJSONResponse(res);
  },

  async updateEmployee(id, data) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleJSONResponse(res);
  },

  async deleteEmployee(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Delete failed');
    }
    return true;
  },
};
