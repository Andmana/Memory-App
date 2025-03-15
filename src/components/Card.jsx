import "../styles/card.scss";
// import pikachu from "/pikachu.png";
import pokeball from "/pokeball.svg";
import pokemon from "/pokemon-2.png";

const Card = ({ id, name, imageUrl, handlePickCard }) => {
    return (
        <div onClick={handlePickCard} className={`card `} data-id={id}>
            <div className="card-inner">
                <div className="card-front">
                    <div className="card-image">
                        <img src={imageUrl} alt="" />
                    </div>
                    <div className="card-text">
                        <span className="set-height">Set Height</span>
                        <div className="slide">
                            <span>{name} </span>
                        </div>
                        <div className="slide slide2">
                            <span>{name} </span>
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
