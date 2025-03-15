import "../styles/results.scss";

const Results = ({ isWin, handleSetState }) => {
    return (
        <div className="results-container">
            <div
                className={`results-content ${
                    isWin ? "results__win" : "results__lose"
                }`}
            >
                <div className="results-header">
                    {isWin ? "YOU WIN" : "YOU LOST"}
                </div>
                <div className="results-actions">
                    <button className="btn" onClick={() => handleSetState(2)}>
                        RETRY
                    </button>
                    <button className="btn" onClick={() => handleSetState(1)}>
                        CHANGE <br></br> DIFFICULTY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
