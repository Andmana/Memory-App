import pokemonImg from "/pokemon.png";
import memoryImg from "/memory-card.png";
import "../styles/intro.scss";
const Intro = () => {
    return (
        <main>
            <header>
                <img src={pokemonImg} alt="" />
            </header>
            <section>
                <img src={memoryImg} alt="" />
                <h1>START</h1>
            </section>
        </main>
    );
};

export default Intro;
