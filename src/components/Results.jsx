export default function Results({ results, questionsLength,handleRestart }) {
    return (
        <div className="result">
            <h3>Result</h3>
            <p className="result-questions">
                Total Question: <span>{questionsLength}</span>
            </p>
            <p className="result-score">
                Total Score:<span> {results.score}</span>
            </p>
            <p className="result-correctAnswer">
                Correct Answers:<span> {results.correctAnswers}</span>
            </p>
            <p className="result-wrongAnswer">
                Wrong Answers:<span> {results.wrongAnswers}</span>
            </p>
            <button onClick={handleRestart}>Restart</button>
        </div>
    )
}