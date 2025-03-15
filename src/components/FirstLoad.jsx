import load from "/loading.gif";
import "../styles/first-load.scss";
const FirstLoad = () => {
    return (
        <div className="first-load">
            <img className="loading-gif" src={load} alt="" />
            <h1 className="loading">LOADING</h1>
            <div className="disclaimer-message">
                <p>
                    This game is not associated with, endorsed by, or in any way
                    affiliated with the Pokémon Company or its affiliates. It is
                    a program created solely for learning purposes. I do not
                    claim ownership of, nor take credit for any images or sounds
                    used in this project. All materials used are for learning
                    and exploration only.
                </p>
            </div>
        </div>
    );
};

export default FirstLoad;
