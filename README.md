# StudyFlow

StudyFlow is a simple AI-powered study assistant built using React and Node.js.

The application allows users to enter their study notes or a topic. The input is sent to an AI model, which generates structured flashcards and quiz questions. The application then displays the generated content as interactive study tools.

The goal of this project is to demonstrate how AI-generated structured data can be converted into a reliable and interactive frontend experience.

## Features

* Enter a topic or paste study notes
* Generate flashcards using AI
* Flip flashcards to view answers
* Generate multiple-choice quiz questions
* Answer quiz questions
* View quiz results
* Track incorrect answers
* Retry incorrectly answered questions
* Loading state while content is being generated
* Error handling for failed AI requests
* Handles invalid or unexpected AI responses
* Prevents older requests from replacing newer responses
* Responsive design for mobile devices

## How It Works

The user enters a topic or study notes into the input field.

The React frontend sends the input to the backend server.

The backend sends a prompt to the AI model and asks it to return structured JSON containing flashcards and quiz questions.

The application validates the returned data before displaying it.

The flashcards and quiz questions are then rendered as interactive React components.

The basic flow is:

```text
User Input
    ↓
React Frontend
    ↓
Node.js / Express Backend
    ↓
AI API
    ↓
Structured JSON Response
    ↓
Data Validation
    ↓
Flashcards and Quiz
```

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js

### AI

* Gemini API

## Project Structure

```text
StudyFlow/
│
├── client/
│   └── src/
│       ├── components/
│       │   ├── InputForm.jsx
│       │   ├── Flashcards.jsx
│       │   └── Quiz.jsx
│       │
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── server/
│   └── server.js
│
└── README.md
```

## Main Components

### InputForm

The `InputForm` component contains the text area where the user enters notes or a topic.

When the user clicks the Generate button, the input is sent to the backend.

### Flashcards

The `Flashcards` component displays the flashcards returned by the AI.

The user can click a flashcard to switch between the question and answer.

### Quiz

The `Quiz` component displays multiple-choice questions.

The component keeps track of the user's selected answers and identifies incorrectly answered questions.

After completing the quiz, the user can retry the questions they answered incorrectly.

## Expected AI Response

The AI is instructed to return structured JSON.

Example:

```json
{
  "title": "Binary Trees",
  "flashcards": [
    {
      "question": "What is a binary tree?",
      "answer": "A tree where each node can have at most two children."
    }
  ],
  "quiz": [
    {
      "question": "What is the maximum number of children a node can have in a binary tree?",
      "options": [
        "1",
        "2",
        "3",
        "Unlimited"
      ],
      "correctAnswer": 1
    }
  ]
}
```

The application checks that the response contains valid `flashcards` and `quiz` arrays before displaying the content.

## Error Handling

AI models do not always return perfect responses, so the application handles different failure cases.

### Invalid AI Response

If the AI returns malformed JSON or an unexpected response structure, the application does not crash.

Instead, it displays an error message and allows the user to try again.

### Empty Response

If no useful data is returned, the application displays an error message.

### API Failure

If the AI API request fails, the application catches the error and displays a retry option.

### Loading State

While the AI is generating the study material, the application displays a loading state and disables unnecessary repeated actions.

### Stale Requests

If the user starts another request before the previous request finishes, the previous request is cancelled using `AbortController`.

This prevents an older response from replacing a newer response.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd StudyFlow
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Add Environment Variables

Create a `.env` file inside the server folder.

```env
GEMINI_API_KEY=your_api_key_here
```

The API key is stored on the backend and is not exposed in the React frontend.

### 5. Start the Backend

```bash
cd server
npm start
```

### 6. Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Open the local URL shown by Vite in your browser.

## Usage

1. **Open the Application**: Navigate to the local URL (e.g., `http://localhost:5173`) in your browser.
2. **Enter Content**: Paste your study notes or type a topic (e.g., "React Hooks", "World War II") into the text area.
3. **Generate**: Click the "Generate" button. A loading state will indicate that the AI is processing your request.
4. **Flashcards**: Once loaded, use the interactive flashcards to study. Click a card to flip it and reveal the answer.
5. **Quiz**: Test your knowledge with the multiple-choice quiz. Submit your answers to see your score.
6. **Retry**: If you get any questions wrong, you'll have the option to re-test those specific questions.

## AI Usage Note

I used AI tools to help understand the assignment requirements, plan the project structure, brainstorm the UI, and assist with debugging during development.

I reviewed the generated suggestions and code and made sure I understood the implementation and the decisions used in the project.

## Known Limitations

* AI-generated content may occasionally contain incorrect information.
* The AI may sometimes return an invalid response that requires the user to retry.
* Generated study sessions are not saved after the page is refreshed.
* The application does not include user authentication.
* The application currently supports only flashcards and multiple-choice quizzes.

## Time Spent

Approximately 8 hours.

## Future Improvements

If I had more time, I would consider adding:

* Save and reload study sessions
* Keyboard navigation for flashcards
* Dark mode
* AI-based refinement of generated study material

These features were not included in the current version to keep the application focused on the core assignment requirements.

## Author

Anurag Pandey
