import { useEffect, useState, useRef } from "react";
import { Howl } from "howler";
import "../styles/nav.scss";
import mainMusic from "../assets/musics/Ending.mp3";

const Nav = ({ setIsGuideOpen, setIsMusicPlaying, isMusicPlaying }) => {
    return (
        <nav>
            <div className="nav">
                <button
                    className={`icon icon-music${
                        isMusicPlaying ? "__on" : "__off"
                    }`}
                    onClick={() => setIsMusicPlaying((prevState) => !prevState)}
                ></button>
                <button
                    className="icon icon-help"
                    onClick={() => setIsGuideOpen((prevState) => !prevState)}
                ></button>
            </div>
        </nav>
    );
};

export default Nav;
