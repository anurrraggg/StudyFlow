# 🚀 StudyFlow

<div align="center">
  <p><strong>An ultra-fast, AI-powered study assistant that converts topics or notes into interactive flashcards and quizzes using Groq's lightning-fast inference.</strong></p>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Groq API](https://img.shields.io/badge/Groq_API-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://console.groq.com/)
</div>

<br />

## 📖 Project Overview

StudyFlow is a modern web application designed to supercharge your study sessions. By entering a topic or pasting study notes, the application interfaces with the blazing-fast **Groq API** (running LLaMA 3.1) to automatically generate structured study materials almost instantly. 

The goal of this project is to provide a seamless, highly responsive educational tool while demonstrating how LLMs can reliably return strictly structured JSON data for frontend integration.

---

## ✨ Key Features

- ⚡ **Lightning-Fast Generation**: Powered by Groq's LPUs, study materials are generated from notes or topic descriptions in milliseconds.
- 🗂️ **Interactive Flashcards**: Review concepts using a beautiful, interactive flashcard interface with flip animations.
- 📝 **Dynamic Multiple-Choice Quizzes**: Test your knowledge immediately and receive instant scoring and feedback.
- 🎯 **Targeted Review**: Track incorrect answers and retry specifically the questions you missed.
- 🛡️ **Resilient Architecture**: Built-in error handling for API failures and race-condition prevention.

---

## ⚙️ How It Works

1. **Input**: The user enters a topic or pastes notes into the React frontend.
2. **Backend Processing**: A Node.js/Express server constructs a precise prompt and forwards it to the Groq API.
3. **AI Generation**: The `llama-3.1-8b-instant` model processes the request using JSON mode, returning a strictly typed JSON structure containing `flashcards` and `quiz` objects.
4. **Validation**: The backend parses and validates the structured AI response before sending it to the client.
5. **Interactive UI**: The React client renders the dynamic study session seamlessly.

---

## 🛠️ Technical Stack

### Frontend
- **Framework**: React 18 (bootstrapped with Vite for instant server start and HMR)
- **Styling**: Vanilla CSS with modern flexbox/grid layouts and CSS animations
- **State Management**: React Hooks (`useState`, `useEffect`)

### Backend
- **Server**: Node.js and Express
- **AI Integration**: `groq-sdk` leveraging the `llama-3.1-8b-instant` model
- **Utilities**: `dotenv` for environment management, `cors` for cross-origin requests

---

## 🚀 Setup Instructions

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed and obtain a free API key from the [GroqCloud Console](https://console.groq.com/).

### 1. Clone the Repository
```bash
git clone https://github.com/anurrraggg/StudyFlow.git
cd StudyFlow
```

### 2. Configure the Backend
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your Groq API key:
```env
GROQ_API_KEY=your_actual_groq_api_key_here
PORT=3000
```

Start the backend server:
```bash
npm start
# The server will run on http://localhost:3000
```

### 3. Configure the Frontend
Open a new terminal window and navigate to the `client` directory:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

Open the local URL provided by Vite (usually `http://localhost:5173`) in your browser to view the application! Note: Ensure the frontend API endpoint (`App.jsx`) points to your local server during development.

---

## 📁 Project Structure

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
│   ├── server.js           # Express API & Groq AI integration
│   ├── .env                # Environment variables (API Key)
│   └── package.json
│
└── README.md
```

---

## 🔮 Future Improvements

While this version provides a robust core experience, planned future iterations include:
- **Session Persistence:** Save generated sessions in a database (like MongoDB or Supabase) or `localStorage` to resume studying later.
- **Enhanced Accessibility:** Full keyboard navigation and screen reader support for all interactive elements.
- **Theme Support:** Implement user-selectable light, dark, and system-default themes.
- **AI Refinement:** Allow users to submit follow-up prompts to tweak or expand upon generated study materials.

---

## 👨‍💻 Author

**Anurag Pandey**
- [LinkedIn](https://www.linkedin.com/in/anurrraggg/)
- [GitHub](https://github.com/anurrraggg)
- [Email](mailto:anuragpandey945028@gmail.com)
