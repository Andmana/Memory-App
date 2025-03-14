import "../styles/guidance.scss";

const Guidance = ({ setIsGuideOpen }) => {
    return (
        <div className="guidance-container">
            <div>
                <div>How to play?</div>
                <div>Dont pick the same card twice</div>
            </div>
            <div className="dialog-close">
                <button
                    className="icon icon-close"
                    onClick={() => setIsGuideOpen((prevState) => !prevState)}
                ></button>
            </div>
        </div>
    );
};

export default Guidance;
