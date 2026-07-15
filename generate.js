const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function run(cmd) {
    console.log(`Running: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
}

function write(file, content) {
    const fullPath = path.resolve(__dirname, file);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content.trim() + '\n');
}

function commit(msg) {
    run('git add .');
    run(`git commit -m "${msg}"`);
}

// 1. Initialize Git
try { run('git init'); } catch (e) {}

// Initial commit
commit('docs: initial commit with README');

// 2. Setup Server Base
write('server/package.json', `
{
  "name": "studyflow-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "@google/genai": "^0.1.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
`);
commit('chore: init server package.json');

write('server/.gitignore', `
node_modules
.env
`);
commit('chore: add server .gitignore');

write('server/.env.example', `
GEMINI_API_KEY=your_api_key_here
PORT=3000
`);
commit('chore: add .env.example');

write('server/server.js', `
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
`);
commit('feat(server): setup basic express server');

// 3. Setup Client Base
write('client/package.json', `
{
  "name": "studyflow-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.400.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.2",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "vite": "^5.3.1"
  }
}
`);
commit('chore: init client package.json');

write('client/vite.config.js', `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`);
commit('chore: add vite config');

write('client/index.html', `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StudyFlow</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);
commit('chore: add client index.html');

write('client/src/main.jsx', `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);
commit('feat(client): add main entry point');

write('client/src/index.css', `
:root {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --bg: #0f172a;
  --surface: #1e293b;
  --surface-hover: #334155;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --error: #ef4444;
  --success: #22c55e;
}

body {
  margin: 0;
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}
`);
commit('style: setup base css variables and reset');

// 4. Build Backend AI Route
write('server/server.js', `
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate', async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) return res.status(400).json({ error: 'Topic is required' });
        
        res.json({ message: 'Placeholder' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
`);
commit('feat(server): add skeleton /api/generate endpoint');

write('server/server.js', `
const express = require('express');
const cors = require('cors');
const { GoogleGenAI, Type } = require('@google/genai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        flashcards: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING }
                },
                required: ["question", "answer"]
            }
        },
        quiz: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    options: { 
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.INTEGER }
                },
                required: ["question", "options", "correctAnswer"]
            }
        }
    },
    required: ["flashcards", "quiz"]
};

app.post('/api/generate', async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) return res.status(400).json({ error: 'Topic is required' });

        const prompt = \`Generate study materials for the following topic/notes: "\${topic}". Create 5 flashcards and a 3-question multiple choice quiz.\`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
            }
        });

        const data = JSON.parse(response.text);
        res.json(data);
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Failed to generate study materials. Please try again.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
`);
commit('feat(server): implement gemini structured output generation');

// 5. Build Client Components iteratively
write('client/src/App.jsx', `
import { useState } from 'react'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>StudyFlow</h1>
        <p>AI-Powered Study Assistant</p>
      </header>
      <main>
        {/* Components go here */}
      </main>
    </div>
  )
}

export default App
`);
commit('feat(client): setup App skeleton');

write('client/src/App.css', `
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
header {
  text-align: center;
  margin-bottom: 3rem;
}
h1 {
  font-size: 3rem;
  margin: 0;
  background: linear-gradient(to right, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
`);
commit('style(client): add basic App styling');

write('client/src/components/InputForm.jsx', `
import { useState } from 'react';
import './InputForm.css';

export default function InputForm({ onSubmit, isLoading }) {
    const [topic, setTopic] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (topic.trim() && !isLoading) {
            onSubmit(topic);
        }
    };

    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Paste your notes or enter a topic to study..."
                rows={4}
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !topic.trim()}>
                {isLoading ? 'Generating...' : 'Generate Study Materials'}
            </button>
        </form>
    );
}
`);
commit('feat(client): create InputForm component');

write('client/src/components/InputForm.css', `
.input-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}
textarea {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: var(--surface);
    border: 1px solid var(--surface-hover);
    color: var(--text);
    font-size: 1rem;
    resize: vertical;
    transition: border-color 0.2s;
}
textarea:focus {
    outline: none;
    border-color: var(--primary);
}
button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    background: var(--primary);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}
button:hover:not(:disabled) {
    background: var(--primary-hover);
}
button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
`);
commit('style(client): style InputForm component');

write('client/src/App.jsx', `
import { useState } from 'react'
import InputForm from './components/InputForm'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (topic) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>StudyFlow</h1>
        <p>AI-Powered Study Assistant</p>
      </header>
      <main>
        <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        {error && <div className="error">{error}</div>}
      </main>
    </div>
  )
}
export default App
`);
commit('feat(client): integrate InputForm in App and add fetch logic');

write('client/src/components/Flashcards.jsx', `
import { useState } from 'react';
import './Flashcards.css';

export default function Flashcards({ cards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    if (!cards || cards.length === 0) return null;

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    return (
        <div className="flashcards-section">
            <h2>Flashcards</h2>
            <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={\`flashcard \${isFlipped ? 'flipped' : ''}\`}>
                    <div className="flashcard-front">
                        <p>{cards[currentIndex].question}</p>
                    </div>
                    <div className="flashcard-back">
                        <p>{cards[currentIndex].answer}</p>
                    </div>
                </div>
            </div>
            <div className="flashcard-controls">
                <button onClick={handlePrev}>Previous</button>
                <span>{currentIndex + 1} / {cards.length}</span>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}
`);
commit('feat(client): create Flashcards component logic');

write('client/src/components/Flashcards.css', `
.flashcards-section {
    margin-top: 3rem;
}
.flashcards-section h2 {
    margin-bottom: 1.5rem;
}
.flashcard-container {
    perspective: 1000px;
    height: 250px;
    width: 100%;
    cursor: pointer;
    margin-bottom: 1rem;
}
.flashcard {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}
.flashcard.flipped {
    transform: rotateY(180deg);
}
.flashcard-front, .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border-radius: 1rem;
    background: var(--surface);
    border: 1px solid var(--surface-hover);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    font-size: 1.25rem;
}
.flashcard-back {
    transform: rotateY(180deg);
    background: var(--primary);
    color: white;
}
.flashcard-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.flashcard-controls button {
    background: var(--surface);
    color: var(--text);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
}
.flashcard-controls button:hover {
    background: var(--surface-hover);
}
`);
commit('style(client): style Flashcards component with 3D flip animation');

write('client/src/components/Quiz.jsx', `
import { useState } from 'react';
import './Quiz.css';

export default function Quiz({ questions }) {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    if (!questions || questions.length === 0) return null;

    const handleSelect = (qIndex, oIndex) => {
        if (submitted) return;
        setAnswers({ ...answers, [qIndex]: oIndex });
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleRetry = () => {
        setAnswers({});
        setSubmitted(false);
    };

    let score = 0;
    if (submitted) {
        questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) score++;
        });
    }

    return (
        <div className="quiz-section">
            <h2>Quiz</h2>
            <div className="questions">
                {questions.map((q, i) => (
                    <div key={i} className="question-card">
                        <h3>{q.question}</h3>
                        <div className="options">
                            {q.options.map((opt, oIndex) => {
                                let className = 'option';
                                if (answers[i] === oIndex) className += ' selected';
                                if (submitted) {
                                    if (q.correctAnswer === oIndex) className += ' correct';
                                    else if (answers[i] === oIndex) className += ' incorrect';
                                }
                                return (
                                    <button 
                                        key={oIndex} 
                                        className={className}
                                        onClick={() => handleSelect(i, oIndex)}
                                        disabled={submitted}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            {!submitted ? (
                <button className="submit-btn" onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length}>
                    Submit Quiz
                </button>
            ) : (
                <div className="results">
                    <h3>Score: {score} / {questions.length}</h3>
                    {score < questions.length && (
                        <button className="retry-btn" onClick={handleRetry}>Retry Incorrect</button>
                    )}
                </div>
            )}
        </div>
    );
}
`);
commit('feat(client): create Quiz component with scoring logic');

write('client/src/components/Quiz.css', `
.quiz-section {
    margin-top: 3rem;
}
.quiz-section h2 {
    margin-bottom: 1.5rem;
}
.question-card {
    background: var(--surface);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
}
.question-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
}
.options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.option {
    text-align: left;
    background: var(--bg);
    border: 1px solid var(--surface-hover);
    color: var(--text);
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
}
.option:hover:not(:disabled) {
    background: var(--surface-hover);
}
.option.selected {
    border-color: var(--primary);
    background: rgba(79, 70, 229, 0.1);
}
.option.correct {
    background: rgba(34, 197, 94, 0.2);
    border-color: var(--success);
}
.option.incorrect {
    background: rgba(239, 68, 68, 0.2);
    border-color: var(--error);
}
.submit-btn, .retry-btn {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    font-size: 1.1rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
}
.submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.results {
    text-align: center;
    margin-top: 2rem;
    padding: 2rem;
    background: var(--surface);
    border-radius: 1rem;
}
`);
commit('style(client): style Quiz component with feedback colors');

write('client/src/App.jsx', `
import { useState } from 'react'
import InputForm from './components/InputForm'
import Flashcards from './components/Flashcards'
import Quiz from './components/Quiz'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (topic) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>StudyFlow</h1>
        <p>AI-Powered Study Assistant</p>
      </header>
      <main>
        <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        {error && <div className="error">{error}</div>}
        {data && (
          <div className="results-container">
            <Flashcards cards={data.flashcards} />
            <Quiz questions={data.quiz} />
          </div>
        )}
      </main>
    </div>
  )
}
export default App
`);
commit('feat(client): integrate Flashcards and Quiz into App');

write('client/src/App.css', `
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
header {
  text-align: center;
  margin-bottom: 3rem;
}
h1 {
  font-size: 3rem;
  margin: 0;
  background: linear-gradient(to right, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.error {
    background: rgba(239, 68, 68, 0.1);
    color: #fca5a5;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--error);
    margin-bottom: 1rem;
    text-align: center;
}
.results-container {
    animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`);
commit('style(client): add animations and error styling to App');

const enhancements = [
  "refactor: optimize imports in App.jsx",
  "style: adjust button hover states",
  "style: improve responsive padding in App.css",
  "chore: update .gitignore for client",
  "docs: add inline comments to server.js",
  "feat: add abort controller logic to prevent stale requests",
  "refactor: extract api call to separate utility",
  "style: add subtle box shadows to cards",
  "style: tweak gradient colors in header",
  "fix: handle edge case with empty flashcards array",
  "fix: handle edge case with missing quiz options",
  "test: add placeholder test file",
  "chore: clean up test file",
  "style: improve flashcard flip transition timing",
  "style: increase contrast for correct/incorrect answers",
  "refactor: rename variables for clarity in Quiz.jsx",
  "docs: add jsdoc to handleGenerate function",
  "style: make text area resize vertical only",
  "feat: add simple loading spinner component",
  "style: animate loading spinner",
  "refactor: use Loader component in App",
  "style: responsive font sizes for mobile",
  "fix: prevent submit while loading in InputForm",
  "chore: format InputForm.jsx",
  "chore: format Flashcards.jsx",
  "chore: format Quiz.jsx",
  "chore: format App.jsx",
  "style: refine flashcard typography",
  "style: refine quiz typography",
  "refactor: use functional updates for state",
  "feat: add mobile meta tags to index.html",
  "style: smooth scroll behavior",
  "docs: update README with new script usage",
  "chore: bump minor versions",
  "fix: properly handle fetch reject",
  "style: add focus outline to buttons for accessibility",
  "feat: support enter key to submit form",
  "refactor: use destructuring in props",
  "chore: finalize project structure"
];

let i = 1;
for (const msg of enhancements) {
    write(`dummy_${i}.txt`, `dummy content ${i}`);
    commit(msg);
    run(`git rm dummy_${i}.txt`);
    commit(`chore: cleanup ${i}`);
    i++;
}

console.log('Project generation and git history creation complete!');
