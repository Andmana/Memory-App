import "../styles/guidance.scss";

const Guidance = ({ isOpen, setIsGuideOpen }) => {
    return (
        <dialog className={isOpen ? "show" : ""}>
            <div className="guidance-container">
                <div>
                    <div>How to play?</div>
                    <div>Dont pick the same card twice</div>
                </div>
                <div className="dialog-close">
                    <button
                        className="icon icon-close"
                        onClick={() => setIsGuideOpen(!isOpen)}
                    ></button>
                </div>
            </div>
        </dialog>
    );
};

export default Guidance;
