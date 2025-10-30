💬 HR Dashboard & Chat App

A real-time Admin–Employee Chat and Performance Dashboard built with React, Firebase Firestore, and Chart.js.
Admins can log in, view employee feedback and KPIs, and chat directly with team members — all in one place.

🚀 Features

✅ Role-based Access

Choose to log in as an Admin or Employee from the Home screen.

Admin can chat with any selected employee.

Employee chats only with Admin.

✅ Real-time Chat (Firebase)

Live messaging using Firestore.


Auto-scroll and time-stamped messages.

✅ Employee Feedback Dashboard

Displays performance data fetched from Firestore REST API.

Filter feedback by score and date range.

Interactive KPI charts using Chart.js.

Pagination for large datasets.

✅ Responsive UI

Fully responsive and mobile-friendly layout.

Sidebar navigation for quick access to Dashboard and Chat.

🧩 Tech Stack
Layer	Technologies Used
Frontend	React (Vite) + React Router
Database	Firebase Firestore
Charts	Chart.js (via react-chartjs-2)
Styling	Tailwind CSS
State & Hooks	React Hooks + Custom Hooks (useEmployees, useMessagesListener)
🗂️ Folder Structure
src/
 ├─ Components/
 │   ├─ EmployeesFeedback/
 │   ├─ PieChart/
 │   ├─ PaginationComponent/
 │   └─ Sidebar/
 ├─ Hooks/
 │   ├─ useEmployee.js
 │   └─ useMessagesListener.js
 ├─ Pages/
 │   ├─ Home/
 │   ├─ Admin/
 │   ├─ Chat/
 │   └─ Dashboard/
 ├─ Firebase/
 │   └─ Firebase.js
 ├─ Layout/
 │   └─ Layout.jsx
 ├─ App.jsx
 └─ main.jsx

⚙️ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/youssef-1999/hr-dashboard-chat.git
cd hr-dashboard-chat

2️⃣ Install Dependencies
npm install

3️⃣ Set up Firebase

Create a Firebase project.

Enable Firestore Database.


4️⃣ Run the App
npm run dev


Then visit http://localhost:5173
 in your browser.

🔑 Default Admin Credentials
Username: admin  
Password: 123456


Employees are fetched from your Firestore collection at:

https://firestore.googleapis.com/v1/projects/hr-dashboard-78815/databases/(default)/documents/getEmployees

📊 Dashboard Highlights

View employee names, scores, feedback notes, and submission dates.

Use filters (score / date range) to analyze data.

Real-time Pie and Bar charts of KPI scores.

Pagination for easier browsing.

💬 Chat System Overview

Admin selects an employee to start a chat.

Both sides exchange messages stored in Firestore under the messages collection.

Messages include:

{
  senderID: "admin123",
  receiverID: "employeeID",
  message: "Hello!",
  timestamp: serverTimestamp(),
  isRead: false
}


Real-time updates with automatic unread message tracking.

🧠 Hooks Explained
useEmployees()

Fetches employee data from Firestore REST API at a set interval.
Used by both Home and Dashboard pages.

useMessagesListener()

Listens for unread messages and updates message count + latest message in real time.



📜 License

This project is open-source under the MIT License.
