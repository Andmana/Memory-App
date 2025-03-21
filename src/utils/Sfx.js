import buttonSFX from "../assets/sfx/button-sfx.mp3";
import { Howl } from "howler";

export const buttonSfx = new Howl({
    src: [buttonSFX],
    volume: 1,
    html5: true,
});
