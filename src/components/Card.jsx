import "../styles/card.scss";
import pikachu from "/pikachu.png";
import pokeball from "/pokeball.svg";
import pokemon from "/pokemon-2.png";

const Card = () => {
    return (
        <div className="card">
            <div className="card-inner">
                <div className="card-front">
                    <div className="card-image">
                        <img src={pikachu} alt="" />
                    </div>
                    <div class="card-text">
                        <span className="set-height">Set Height</span>
                        <div class="slide">
                            <span>PIKACHU </span>
                        </div>
                        <div class="slide slide2">
                            <span>PIKACHU </span>
                        </div>
                    </div>
                </div>
                <div className="card-back">
                    <img src={pokemon} alt="" />
                    <div className="card-image">
                        <img src={pokeball} alt="" />
                    </div>
                    <img className="rotate" src={pokemon} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Card;
