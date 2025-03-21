import "../styles/guidance.scss";
import { buttonSfx } from "../utils/Sfx";

const Guidance = ({ setIsGuideOpen, isMusicPlaying }) => {
    return (
        <div className="guidance-container">
            <div>
                <div>How to play?</div>
                <div>Dont pick the same card twice</div>
            </div>
            <div className="dialog-close">
                <button
                    aria-label="Close guide"
                    className="icon icon-close"
                    onClick={() => {
                        if (isMusicPlaying) buttonSfx.play();
                        setIsGuideOpen((prevState) => !prevState);
                    }}
                ></button>
            </div>
        </div>
    );
};

export default Guidance;
