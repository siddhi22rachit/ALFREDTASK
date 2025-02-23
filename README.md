# Flashcard Learning App (Leitner System) - ALFREDTASK

## 🚀 Introduction
This is a **Flashcard Learning App** built using the **MERN stack** that follows the **Leitner System** for spaced repetition learning. Users can create, review, and progress through flashcards while improving retention using this method.

## 📌 Features & Requirements
### ✅ Backend (Node.js, Express, MongoDB, Mongoose)
- **REST API Endpoints:**
  - `POST /flashcards` → Add a new flashcard
  - `GET /flashcards` → Get all flashcards
  - `PUT /flashcards/:id` → Update flashcard (move to next level if correct)
  - `DELETE /flashcards/:id` → Delete a flashcard
- **Leitner System Logic:**
  - Flashcards start in **Box 1**.
  - **Correct answers** move them to the next box.
  - **Incorrect answers** return them to Box 1.
  - Higher boxes have **longer review intervals** (spaced repetition).
- **MongoDB Schema:** Stores flashcard **level (box number), question, answer, and next review date**.

### ✅ Frontend (React, React Hooks, Axios, TailwindCSS)
- Display flashcards with:
  - "Show Answer" button
  - "Got it Right" and "Got it Wrong" buttons
- Update flashcard level based on user response.
- Fetch flashcards based on their **next review date** (spaced repetition logic).
- Show progress: **"You have X flashcards due today"**.
- Simple & clean UI with minimal distractions.

## 🎯 Bonus Features (Optional)
- 🔑 **JWT Authentication** → Allow users to save progress
- 🎭 **Animations with Framer Motion** → Smooth transitions when answering flashcards

## 🛠️ Tech Stack
- **Frontend:** React, React Hooks, Axios, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (Bonus feature)
- **Animations:** Framer Motion (Bonus feature)

## 🔧 Installation & Setup
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/ALFREDTASK.git
   cd ALFREDTASK
   ```

2. **Backend Setup:**
   ```sh
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup:**
   ```sh
   cd frontend
   npm install
   npm start
   ```

4. **Environment Variables:**
   Create a `.env` file in the `backend` directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Run the Application:**
   - Backend: `npm start` inside the `backend` folder.
   - Frontend: `npm start` inside the `frontend` folder.

## 📂 Folder Structure
```
ALFREDTASK/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── server.js
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│
│── README.md
```


