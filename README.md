# 📚 StudyFlow

<div align="center">
  <p>An AI-Powered Study Assistant that instantly turns any topic or notes into interactive flashcards and quizzes using Google's Gemini AI.</p>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Gemini API](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
</div>

<br />

## ✨ Features

- **Instant Generation**: Paste your study notes or type a topic, and AI will generate study materials in seconds.
- **Interactive Flashcards**: Test your memory with flip-able flashcards.
- **Multiple-Choice Quizzes**: Test your knowledge and get immediate feedback on your answers.
- **Retry Logic**: Track incorrect answers and retry specifically what you got wrong.
- **Robust Error Handling**: Handles API failures gracefully and prevents older requests from overwriting newer ones.
- **Responsive Design**: Beautiful, modern UI that works perfectly on mobile and desktop.

## 🚀 How It Works

1. **Input**: You enter a topic or paste study notes.
2. **Backend**: A Node.js/Express server forwards a structured prompt to the Gemini API.
3. **AI Generation**: Gemini is instructed to return a strictly typed JSON structure containing `flashcards` and `quiz` objects.
4. **Validation**: The backend validates the structured AI response and sends it to the React frontend.
5. **Interactive UI**: The React client parses the JSON and renders it into a dynamic, interactive study session.

---

## 🛠️ Tech Stack

### Frontend
- **React** (via Vite)
- **Vanilla CSS** with modern variables and micro-animations

### Backend
- **Node.js** & **Express**
- **@google/genai** SDK for communicating with the Gemini 2.5 Flash model
- **dotenv** & **cors**

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 1. Clone the repository
```bash
git clone https://github.com/anurrraggg/StudyFlow.git
cd StudyFlow
```

### 2. Setup the Backend
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

Start the backend server:
```bash
npm start
```

### 3. Setup the Frontend
Open a **new** terminal window and navigate to the `client` directory:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

Open the local URL provided by Vite (usually `http://localhost:5173`) in your browser.

---

## 🏗️ Project Structure

```text
StudyFlow/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (InputForm, Flashcards, Quiz)
│   │   ├── App.jsx         # Main application container
│   │   ├── App.css         # Global styles
│   │   └── main.jsx        # React entry point
│   └── package.json
│
├── server/                 # Node.js/Express Backend
│   ├── server.js           # Express app & Gemini API integration
│   ├── .env                # Environment variables (API Key)
│   └── package.json
│
└── README.md
```

---

## 🔮 Future Improvements

While this version satisfies the core requirements, future iterations could include:
* **Session Persistence:** Save generated sessions in a database or `localStorage` to resume later.
* **Keyboard Navigation:** Allow flipping flashcards with the Spacebar or Arrow keys.
* **Dark Mode Toggle:** User-selectable light and dark themes.
* **AI Refinement:** Allow users to tell the AI to "make the flashcards harder" or "explain this answer better".

---

## 👨‍💻 Author

**Anurag Pandey**
