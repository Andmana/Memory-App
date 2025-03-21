import "../styles/nav.scss";
import { buttonSfx } from "../utils/Sfx";

const Nav = ({ setIsGuideOpen, setIsMusicPlaying, isMusicPlaying }) => {
    return (
        <div className="nav-container">
            <button
                aria-label={isMusicPlaying ? "Mute sound" : "Unmute sound"}
                className={`
                    btn icon icon-music${isMusicPlaying ? "__on" : "__off"}
                `}
                onClick={() => {
                    setIsMusicPlaying((prevState) => !prevState);
                    if (!isMusicPlaying) buttonSfx.play();
                }}
            ></button>
            <button
                aria-label="Show Guide"
                className="btn icon icon-help"
                onClick={() => {
                    setIsGuideOpen((prevState) => !prevState);
                    if (isMusicPlaying) buttonSfx.play();
                }}
            ></button>
        </div>
    );
};

export default Nav;
