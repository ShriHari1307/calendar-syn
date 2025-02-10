# Calendar Application

This is a **React Calendar Application** built with **Vite**, **Tailwind CSS**, and React hooks (`useState`, `useEffect`). The app allows users to create, view, edit, and delete events in a calendar interface.

## Features
- 📅 **Interactive Calendar** – Click on a date to add events.
- 📝 **Add & Edit Events** – Manage event details with a modal.
- 🔍 **View Event Details** – Open and see event information.
- ❌ **Delete Events** – Remove events with ease.
- ⚡ **Fast & Optimized** – Uses Vite for quick development and Tailwind CSS for styling.
- 🔄 **State Management** – Uses `useState` and `useEffect` for handling UI updates.

## Tech Stack
- **React** – Frontend library
- **Vite** – Fast build tool for React
- **Tailwind CSS** – Utility-first styling
- **React Hooks** (`useState`, `useEffect`) – State and side-effect management

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
https://github.com/ShriHari1307/calendar-syn.git
cd calendar-app
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm run dev
```
The application will be available at `http://localhost:5173/`.

## Folder Structure
```
📂 calendar-app
 ┣ 📂 src
 ┃ ┣ 📂 components   # Reusable UI components
 ┃ ┃ ┣ 📜 Body.jsx          # Main body component
 ┃ ┃ ┣ 📜 Calendar.jsx      # Calendar component
 ┃ ┃ ┣ 📜 Day.jsx           # Individual day component
 ┃ ┃ ┣ 📜 Event.jsx         # Event component
 ┃ ┃ ┣ 📜 EventDetailsModal.jsx # Event details view
 ┃ ┃ ┣ 📜 EventsListModal.jsx  # Modal to list events
 ┃ ┃ ┣ 📜 Header.jsx        # Header component
 ┃ ┃ ┣ 📜 Modal.jsx         # Add/Edit event modal
 ┃ ┣ 📂 data   # Data storage
 ┃ ┃ ┣ 📜 events.json       # Predefined events data
 ┃ ┣ 📜 App.jsx         # Main app entry
 ┃ ┣ 📜 index.jsx       # React entry point
 ┣ 📜 package.json      # Dependencies and scripts
 ┣ 📜 vite.config.js    # Vite configuration
```

## Usage
- Click on a date to open the **Add Event Modal**.
- Enter event details (title, time, description) and save.
- Click on an existing event to **view/edit/delete** it.
- Time conflicts will be detected automatically.

## Future Enhancements 🚀
- 📌 Drag-and-drop event repositioning
- 📅 Weekly & Monthly view options
- 🌙 Dark mode toggle

