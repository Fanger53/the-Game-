import sprBg0 from '../assets/img/sprBg0.png';
import sprBg1 from '../assets/img/sprBg1.png';
import sprBtnPlay from '../assets/img/sprBtnPlay.png';
import sprBtnPlayHover from '../assets/img/sprBtnPlayHover.png';
import sprBtnPlayDown from '../assets/img/sprBtnPlayDown.png';
import sprBtnRestart from '../assets/img/sprBtnRestart.png';
import sprBtnRestartHover from '../assets/img/sprBtnRestartHover.png';
import sprBtnRestartDown from '../assets/img/sprBtnRestartDown.png';
import sndBtnOver from '../assets/sounds/sndBtnOver.wav';
import sndBtnDown from '../assets/sounds/sndBtnDown.wav';

export default class SceneStart extends Phaser.Scene {
  constructor() {
    super({ key: "SceneStart" });
  }

  preload() {
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
    this.load.image('sprBtnPlay', sprBtnPlay);
    this.load.image('sprBtnPlayHover', sprBtnPlayHover);
    this.load.image('sprBtnPlayDown', sprBtnPlayDown);
    this.load.image('sprBtnRestart', sprBtnRestart);
    this.load.image('sprBtnRestartHover', sprBtnRestartHover);
    this.load.image('sprBtnRestartDown', sprBtnRestartDown);

    this.load.audio('sndBtnOver', sndBtnOver);
    this.load.audio('sndBtnDown', sndBtnDown);
  }

  create() {
    this.scene.start("SceneMain");
  }
}