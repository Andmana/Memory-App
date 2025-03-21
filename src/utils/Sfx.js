import buttonSFX from "../assets/sfxs/button-sfx.mp3";
import flipSFX from "../assets/sfxs/flip-sfx.mp3";
import pickSFX from "../assets/sfxs/pick-sfx.mp3";
import { Howl } from "howler";

export const buttonSfx = new Howl({
    src: [buttonSFX],
    volume: 1,
    html5: true,
});

export const flipSfx = new Howl({
    src: [flipSFX],
    volume: 1,
    html5: true,
});

export const pickSfx = new Howl({
    src: [pickSFX],
    volume: 1,
    html5: true,
});
