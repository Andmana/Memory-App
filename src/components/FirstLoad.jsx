import load from "/loading.gif";
import "../styles/first-load.scss";
const FirstLoad = () => {
    return (
        <div className="first-load">
            <img className="loading-gif" src={load} alt="" />
            <h1 className="loading">LOADING</h1>
        </div>
    );
};

export default FirstLoad;
