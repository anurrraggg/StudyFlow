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
                <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
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
