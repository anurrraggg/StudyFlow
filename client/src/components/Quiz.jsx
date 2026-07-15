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
