                                                                                                   SmartDo
A smart, beautiful task management app built with React
Drag-and-drop tasks · Pomodoro timer · Daily habit tracking · Persistent storage


📌 Overview
SmartDo is a full-featured, production-ready productivity app that goes beyond a basic to-do list. It acts as your daily productivity assistant — helping you manage tasks, track habits, and stay focused with a built-in Pomodoro timer.
Everything is stored locally in your browser — no backend required to get started.

✨ Features
🗂 Task Management

Add, edit, and delete tasks in a clean modal interface
Mark tasks as complete / undo completion
Per-task notes for extra context
Tasks persist across page refreshes via localStorage

🏷 Categories
Color-coded categories to group your work:
CategoryColor📘 StudyBlue💼 WorkPurple🏋️ FitnessGreen🏠 PersonalCoral🛒 ShoppingAmber
🔺 Priority Levels
Flag every task with a priority to focus on what matters:

🔴 High — urgent, do it now
🟡 Medium — important, plan for it
🟢 Low — nice to have

📅 Due Dates & Times

Set a due date and time per task
Overdue tasks are automatically highlighted in red

🔍 Search & Filter

Real-time search across task titles and notes
Filter by priority (All / High / Medium / Low)
Sidebar views: All, Today, Upcoming, Completed
Filter by any category from the sidebar

📊 Progress Tracking

Live stats bar showing Total / Done / Pending counts
Animated progress bar showing today's completion percentage

🖱 Drag & Drop Reordering

Reorder tasks visually by dragging the grip handle
Powered by @dnd-kit/sortable — smooth, accessible, mobile-friendly

🍅 Pomodoro Timer

Three modes: Focus (25 min) · Short break (5 min) · Long break (15 min)
Animated SVG ring countdown
Session counter tracks how many focus sessions you complete today

🌿 Habit Tracker
Daily tracker for four core habits:
HabitGoal💧 Water8 glasses📚 Study4 hours🏋️ Gym1 session😴 Sleep8 hours
Each habit has a progress bar and +/− controls. Progress is saved per day automatically.

🚀 Getting Started
Prerequisites

Node.js v18 or higher
npm v9 or higher

Installation
bash# 1. Unzip the project
unzip smart-todo-app.zip
cd smart-todo

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
Open in your browser.
Build for Production
bashnpm run build      # Builds to /dist
npm run preview    # Preview the production build locally

🗂 Project Structure
smart-todo/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx            # Navigation + category list
│   │   ├── Sidebar.module.css
│   │   ├── TaskItem.jsx           # Draggable task row
│   │   ├── TaskItem.module.css
│   │   ├── TaskModal.jsx          # Add / edit modal
│   │   ├── TaskModal.module.css
│   │   ├── StatsBar.jsx           # Progress statistics
│   │   ├── StatsBar.module.css
│   │   ├── PomodoroTimer.jsx      # Focus timer widget
│   │   ├── PomodoroTimer.module.css
│   │   ├── HabitTracker.jsx       # Daily habit widget
│   │   └── HabitTracker.module.css
│   ├── hooks/
│   │   └── useLocalStorage.js     # Typed persistent state hook
│   ├── data.js                    # Constants, colors, sample data
│   ├── App.jsx                    # Root component + all state logic
│   ├── App.module.css
│   ├── index.css                  # Global styles + CSS variables
│   └── main.jsx                   # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md

🧰 Tech Stack
LayerTechnologyFrameworkReact 19Build toolVite 8Drag & drop@dnd-kit/core + @dnd-kit/sortableIconslucide-reactStylingCSS ModulesFontsDM Sans + DM Mono (Google Fonts)StorageBrowser localStorage

🗄 Data Design
Task object
js{
  id: "string",          // unique ID
  title: "string",       // task name
  notes: "string",       // optional detail notes
  cat: "Study",          // Study | Work | Fitness | Personal | Shopping
  prio: "High",          // High | Medium | Low
  date: "2026-05-14",    // ISO date string (optional)
  time: "23:00",         // HH:MM (optional)
  done: false            // completion status
}
Habit data (per-day key)
js// localStorage key: habits_2026-05-14
{
  water: 5,   // 0-8
  study: 2,   // 0-4
  gym: 1,     // 0-1
  sleep: 7    // 0-8
}

⌨️ Keyboard Shortcuts
ShortcutActionEnter (in modal)Save taskEscClose modalClick outside modalClose modal

🔮 Roadmap — Next Features
These features would take SmartDo from a portfolio project to a full product:

 User Authentication — Firebase / Supabase email + Google login
 Cloud Sync — Store tasks in Firestore or Supabase so they sync across devices
 AI Task Suggestions — Anthropic API suggests subtasks when you describe a goal
 Voice Input — Web Speech API → auto-create tasks by speaking
 Calendar View — Monthly/weekly grid layout for tasks
 Team Collaboration — Share task lists with other users via real-time DB
 Smart Notifications — Browser push notifications for due task reminders
 Gamification — Earn badges for completing 10 / 50 / 100 tasks
 Recurring Tasks — Daily / weekly / monthly repeating tasks
 Dark Mode — Toggle between light and dark themes


🤝 Contributing
bash# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a pull request
