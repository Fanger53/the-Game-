/* eslint import/no-unresolved: 2 */
import Phaser from 'phaser';
import { score } from './sceneMain';
import { SubmitScore } from './post';
import sndBtnOver from '../assets/sounds/sndBtnOver.wav';
import sndBtnDown from '../assets/sounds/sndBtnDown.wav';
import sprBtnRestart from '../assets/img/sprBtnRestart.png';
import sprBtnRestartHover from '../assets/img/sprBtnRestartHover.png';

export default class SceneLast extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneLast' });
  }

  preload() {
    this.load.image('sprBtnRestart', sprBtnRestart);
    this.load.image('sprBtnRestartHover', sprBtnRestartHover);

    this.load.audio('sndBtnOver', sndBtnOver);
    this.load.audio('sndBtnDown', sndBtnDown);
  }

  create() {
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.W);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.S);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.A);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.D);
    this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.title = this.add.text(this.game.config.width * 0.5, 90, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#670D52',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    // name input
    const playerName = document.getElementById('playerName');
    playerName.classList.remove('hide');
    const btn = document.getElementById('btn');
    btn.classList.remove('hide');
    const name = document.querySelector('[data-name]');
    btn.onclick = () => SubmitScore.send(name.value, score).then(this.scene.start('SceneScore'));

    this.score = this.add.text(this.game.config.width * 0.5, 105, ' ', {
      fontFamily: 'monospace',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.score.setOrigin(0.5, -1);
    this.score.setText(`SCORE: ${score}`);

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.subtitle = this.add.text(this.game.config.width * 0.29, 410, 'Score Board', {
      fontFamily: 'monospace',
      fontSize: 35,
      fontStyle: 'bold',
      color: '#670D52',
      align: 'center',
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start('SceneScore');
      });

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnRestart',
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on('pointerover', () => {
      this.btnRestart.setTexture('sprBtnRestartHover'); // set the button texture to sprBtnPlayHover
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnRestart.on('pointerout', () => {
      this.setTexture('sprBtnRestart');
    });

    this.btnRestart.on('pointerdown', () => {
      this.btnRestart.setTexture('sprBtnRestartDown');
      this.sfx.btnDown.play();
    }, this);

    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('sprBtnRestart');
      this.scene.start(window.location.reload());
    }, this);

    this.btnRestart.setOrigin(0.5, -1);
  }
}
