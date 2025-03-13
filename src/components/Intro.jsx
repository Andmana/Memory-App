import pokemonImg from "/pokemon.png";
import memoryImg from "/memory-card.png";
import "../styles/intro.scss";
const Intro = ({ handleSetState }) => {
    return (
        <>
            <header>
                <img src={pokemonImg} alt="" />
            </header>
            <section>
                <img src={memoryImg} alt="" />
                <button className="btn" onClick={() => handleSetState(1)}>
                    <h1>START</h1>
                </button>
            </section>
        </>
    );
};

export default Intro;
