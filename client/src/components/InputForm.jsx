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
