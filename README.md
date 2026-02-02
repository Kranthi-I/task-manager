⏰ Task Manager (Frontend Project)

A professional, colorful, and fully functional frontend task management website built using HTML, CSS, and JavaScript.
This project helps users manage tasks with start & end times, time-based alerts, beep notifications, and motivational feedback to improve discipline and productivity.

🌟 Key Features
🔐 Authentication

User Sign Up & Login

User data stored securely using LocalStorage

Each user has separate tasks

📝 Task Management

Add multiple tasks

Each task includes:

Task name

Start time

End time

Tasks are displayed as separate cards

Edit task timings

Mark task as completed using checkbox

⛔ Time Slot Blocking

Prevents adding tasks with overlapping time slots

Shows alert if a time slot is already blocked

⏱️ Smart Time Alerts (IST)

Uses Indian Standard Time (IST)

🔔 Beep + alert when:

Task starts

Task ends

💬 Motivation System

If task completed → appreciation message 🎉

If not completed → encouraging message 💙

Waits 1 minute after task end before showing motivation

Ensures motivation alert appears only once

🎨 UI & Design

Professional & colorful UI

Responsive task cards

Clean dashboard layout

Modern gradients and smooth UX

🛠️ Technologies Used

HTML5 – Structure

CSS3 – Styling & layout

JavaScript (Vanilla JS) – Logic & functionality

LocalStorage API – Data persistence

Web Audio API – Beep sound alerts

📁 Project Structure
smart-task-manager/
│
├── login.html        # Login page
├── signup.html       # Signup page
├── dashboard.html    # User dashboard
│
├── auth.js           # Authentication logic
├── dashboard.js      # Task & alert logic
│
├── style.css         # Styling
└── README.md         # Project documentation

⚙️ How the Project Works

User creates an account (Signup)

User logs in

Dashboard loads user-specific tasks

User adds a task with start & end time

App checks for:

Empty fields

Invalid time

Overlapping time slots

Task is stored in LocalStorage

System continuously monitors time (IST)

Alerts + beep trigger automatically

After task ends → wait 1 minute → motivation message

🚀 How to Run the Project

Clone or download the repository

Open signup.html in your browser

Create an account

Login and start adding tasks

No backend, no server, no installation required ✅

🎯 Future Enhancements (Optional)

Dark mode 🌙

Task statistics dashboard 📊

Daily streak tracking 🔥

Notification mute option 🔕

Mobile-first layout 📱
