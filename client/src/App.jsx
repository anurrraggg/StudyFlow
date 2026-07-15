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
      const res = await fetch('https://studyflow-2666.onrender.com/api/generate', {
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
        <h1>Study<span>Flow</span></h1>
        <p>AI-Powered Study Materials Generator</p>
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
