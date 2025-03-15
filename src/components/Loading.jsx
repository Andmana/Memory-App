import "../styles/loading.scss";

const Loading = ({ difficulty }) => {
    return (
        <div
            className={`loading-container bg-${difficulty.pokemon.toLowerCase()}`}
        >
            <div className="loading-detail">
                <p>DIFFICULTY : {difficulty.name}</p>
                <p>TOTAL CARDS : {difficulty.cards}</p>
                <p>{difficulty.pokemon}</p>
            </div>
            <div className={`loading-image `}>
                <p>Loading</p>
                <div style={{ "--delay": "0s" }}>.</div>
                <div style={{ "--delay": "1s" }}>.</div>
                <div style={{ "--delay": "2s" }}>.</div>
            </div>
        </div>
    );
};

export default Loading;
