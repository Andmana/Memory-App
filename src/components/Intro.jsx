import pokemonImg from "/pokemon.png";
import memoryImg from "/memory-card.png";
import "../styles/intro.scss";
const Intro = ({ handleSetState }) => {
    return (
        <>
            <header className="intro-header">
                <img src={pokemonImg} alt="" />
            </header>
            <section className="intro-section">
                <img src={memoryImg} alt="" />
                <button className="gelatine" onClick={() => handleSetState(1)}>
                    START
                </button>
            </section>
        </>
    );
};

export default Intro;
