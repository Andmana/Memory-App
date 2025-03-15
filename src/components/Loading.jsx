import "../styles/loading.scss";

const Loading = ({ difficulty }) => {
    return (
        <div
            className={`loading-container bg-${difficulty.name.toLowerCase()}`}
        >
            <div className="loading-detail">
                <p>Dificullty : {difficulty.name}</p>
                <p>Total Cards : {difficulty.cards}</p>
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
