# StudyFlow

<div align="center">
  <p>An AI-powered study assistant that converts topics or notes into interactive flashcards and quizzes using Google's Gemini AI.</p>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Gemini API](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
</div>

<br />

## Project Overview

StudyFlow is a web application designed to help users study more effectively. By entering a topic or pasting study notes, the application interfaces with the Gemini AI to automatically generate structured study materials. The goal of this project is to demonstrate how AI-generated structured data can be reliably integrated into a frontend user experience.

## Features

- **Automated Generation**: Create study materials from notes or a topic description in seconds.
- **Interactive Flashcards**: Review concepts using a standard flashcard interface.
- **Multiple-Choice Quizzes**: Test your knowledge and receive immediate scoring.
- **Targeted Review**: Track incorrect answers and retry specifically the questions you missed.
- **Resilient Architecture**: Built-in error handling for API failures and prevention of older requests overriding newer ones.

## How It Works

1. **Input**: The user enters a topic or pastes notes into the frontend.
2. **Backend Processing**: A Node.js and Express server forwards a structured prompt to the Gemini API.
3. **AI Generation**: The Gemini model returns a strictly typed JSON structure containing `flashcards` and `quiz` objects.
4. **Validation**: The backend validates the structured AI response before sending it to the React frontend.
5. **Interactive UI**: The React client parses the JSON and renders the dynamic study session.

---

## Technical Stack

### Frontend
- React (bootstrapped with Vite)
- Vanilla CSS 

### Backend
- Node.js and Express
- @google/genai SDK for the Gemini 2.5 Flash model
- dotenv and cors

---

## Setup Instructions

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed and obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 1. Clone the repository
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

Create a `.env` file in the `server` directory and add your API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

Start the backend server:
```bash
npm start
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

Open the local URL provided by Vite (usually `http://localhost:5173`) in your browser to view the application.

---

## Project Structure

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

## Future Improvements

While this version satisfies the core requirements, future iterations could include:
* **Session Persistence:** Save generated sessions in a database or `localStorage` to resume later.
* **Accessibility:** Add keyboard navigation for flipping flashcards.
* **Theme Support:** Implement user-selectable light and dark themes.
* **AI Refinement:** Allow users to submit follow-up prompts to refine generated flashcards or quiz questions.

---

## Author

Anurag Pandey
