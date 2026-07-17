# StudyFlow

A fast, minimalist AI study assistant that converts topics or notes into interactive flashcards and multiple-choice quizzes using the Groq API (LLaMA 3.1).

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (Dark Mode)
- **Backend**: Node.js, Express
- **AI Integration**: Groq API (`llama-3.1-8b-instant`)

## Features
- **Instant Generation**: Utilizes Groq's LPUs for near-instant study material generation.
- **Interactive Flashcards**: Clean, distraction-free flashcard UI for concept review.
- **Dynamic Quizzes**: Multiple-choice testing with immediate scoring and feedback.
- **Error Handling**: Built-in resilience against API rate limits and failures.

## Setup Instructions

### Prerequisites
- Node.js installed
- A free Groq API key from [GroqCloud](https://console.groq.com/)

### 1. Backend Setup
```bash
git clone https://github.com/anurrraggg/StudyFlow.git
cd StudyFlow/server
npm install
```

Create a `.env` file in the `server` directory:
```env
GROQ_API_KEY=your_api_key_here
PORT=3000
```

Start the backend:
```bash
npm start
```

### 2. Frontend Setup
In a new terminal window:
```bash
cd StudyFlow/client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## Project Structure
```text
StudyFlow/
├── client/                 # React frontend
│   ├── src/components/     # UI components
│   └── App.jsx             # Main application
└── server/                 # Node.js backend
    └── server.js           # Express API and Groq logic
```
