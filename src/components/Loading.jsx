import "../styles/loading.scss";

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-detail">
                <h1>Dificullty : Hard</h1>
                <h2>Total Cards : 10</h2>
            </div>
            <div className="loading-images">
                <div>Loading</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
            </div>
        </div>
    );
};

export default Loading;
