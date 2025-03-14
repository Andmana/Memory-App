import "../styles/nav.scss";

const Nav = ({ setIsGuideOpen, setIsMusicPlaying, isMusicPlaying }) => {
    return (
        <div className="nav-container">
            <button
                className={`
                    btn icon icon-music${isMusicPlaying ? "__on" : "__off"}
                `}
                onClick={() => setIsMusicPlaying((prevState) => !prevState)}
            ></button>
            <button
                className="btn icon icon-help"
                onClick={() => setIsGuideOpen((prevState) => !prevState)}
            ></button>
        </div>
    );
};

export default Nav;
