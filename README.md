# 🚀 Employee Data Management | ASE Challenge Submission 💪🔥✨

This project is submitted as part of the **Associate Software Engineer (ASE) Challenge** by **Verto**.  
It demonstrates a complete **Full-Stack CRUD (Create, Read, Update, Delete)** application for managing employees.

---

## 🧠 Project Overview

**Employee Data Management** is a simple CRUD application where users can:
- Add, view, edit, and delete employees.
- Each employee has a **name**, **email**, and **position**.
- Bonus: Includes **search/filter functionality** and **form validation** on the frontend.

---

## 🏗️ Tech Stack

### 🖥️ Frontend
- **React.js (Vite)**
- **Axios** for API calls
- **Tailwind CSS** for styling (optional)
- **React Hooks** for state management

### ⚙️ Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **dotenv** for environment variables
- **CORS** and **body-parser** middleware

---

## 📁 Project Structure

```

employee-management/
│
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── Employee.js
│   ├── routes/
│   │   └── employeeRoutes.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── components/
│   │       ├── EmployeeForm.jsx
│   │       └── EmployeeList.jsx
│   └── package.json
│
└── README.md

````

---

## ⚡ Features

✅ **Create:** Add new employees via form  
✅ **Read:** View all employees in a responsive table  
✅ **Update:** Edit existing employee details via modal or form  
✅ **Delete:** Remove employees from the list  
✨ **Bonus:**
- Search/filter employees by name  
- Frontend form validation  
- Clean, modular RESTful API  

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/employees` | Fetch all employees |
| GET | `/api/employees/:id` | Fetch employee by ID |
| POST | `/api/employees` | Add a new employee |
| PUT | `/api/employees/:id` | Update an existing employee |
| DELETE | `/api/employees/:id` | Delete an employee |

---

## ⚙️ Backend Setup

### 1️⃣ Navigate to backend folder
```bash
cd backend
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Run the server

```bash
npm start
```

The backend will start at:
👉 `https://employee-data-manangement.onrender.com`

---

## 💻 Frontend Setup

### 1️⃣ Navigate to frontend folder

```bash
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Update API base URL (if needed)

In `src/api.js`:

```js
export const API_BASE_URL = "https://employee-data-manangement.onrender.com/employees";
```

### 4️⃣ Run the frontend

```bash
npm run dev
```

Frontend will start at:
👉 `https://employee-data-manangement-1.onrender.com`

---

## 🧪 Running Tests (Optional Bonus)

You can add backend test cases using **Jest + Supertest**:

```bash
npm install --save-dev jest supertest
npm test
```

Tests can include:

* Create employee
* Get all employees
* Update employee
* Delete employee

---

## 🔍 Example Employee Schema

```js
{
  name: "Atharva Sawant",
  email: "AtharvaSawant@example.com",
  position: "Software Engineer"
}
```

---

## 🎯 Evaluation Criteria

| Area                             | Description                                  |
| -------------------------------- | -------------------------------------------- |
| 💡 **Dev Skills & Code Quality** | Proper CRUD flow, clean RESTful API          |
| ⚙️ **Completion**                | All CRUD operations functional from frontend |
| 🧭 **Bonus Features**            | Search, validation, test cases               |

---

## 🧑‍💻 Author

**👋 Atharva Savant**

* 💼 Full Stack Developer
* 🌐 [GitHub](https://github.com/athu2773)
* 💬 [LinkedIn](https://www.linkedin.com/in/atharva-saawant)

---

### ⭐ Final Note

> This project reflects a clean, simple, and production-ready CRUD flow built using **MERN Stack** principles — demonstrating full ownership of backend + frontend integration.

---

🧩 **"Code. Build. Learn. Repeat."**

Would you like me to add a **screenshots/demo section** (with markdown placeholders) at the end of the README too? It’s a nice touch if you plan to upload images or a Loom demo link.


```