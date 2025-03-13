import { useEffect, useState, useRef } from "react";
import { Howl } from "howler";
import soundMain from "../assets/musics/Ending.mp3";
import "../styles/nav.scss";

const Nav = () => {
    const [isPlay, setPlayState] = useState(false);
    const soundRef = useRef(null); // Store the Howl instance

    useEffect(() => {
        if (soundRef.current === null) {
            soundRef.current = new Howl({
                src: [soundMain],
                html5: true,
                loop: true,
            });
        }

        if (isPlay) {
            soundRef.current.play();
        } else {
            soundRef.current.pause();
        }

        return () => {
            soundRef.current.pause();
        };
    }, [isPlay]);

    const toggleMusic = () => {
        setPlayState((prevState) => !prevState); // Toggle play/pause
    };

    return (
        <nav>
            <div className="nav">
                <button
                    className={`icon icon-music${isPlay ? "__on" : "__off"}`}
                    onClick={toggleMusic}
                ></button>
                <button className="icon icon-help"></button>
            </div>
        </nav>
    );
};

export default Nav;
