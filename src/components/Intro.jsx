import pokemonImg from "/pokemon.png";
import memoryImg from "/memory-card.png";
import "../styles/intro.scss";

const Intro = ({ handleSetState }) => {
    return (
        <div className="intro-container">
            <div className="intro-header">
                <img src={pokemonImg} alt="" />
            </div>
            <div className="intro-section">
                <img src={memoryImg} alt="" />
                <button className="gelatine" onClick={() => handleSetState(1)}>
                    START
                </button>
            </div>
        </div>
    );
};

export default Intro;
