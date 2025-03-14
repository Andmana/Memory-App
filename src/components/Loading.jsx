import "../styles/loading.scss";

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-detail">
                <p>Dificullty : Hard</p>
                <p>Total Cards : 10</p>
            </div>
            <div className="loading-image">
                <p>Loading</p>
                <div style={{ "--delay": "0s" }}>.</div>
                <div style={{ "--delay": "1s" }}>.</div>
                <div style={{ "--delay": "2s" }}>.</div>
            </div>
        </div>
    );
};

export default Loading;
