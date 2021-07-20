import {score} from './sceneMain';
import {name} from './sceneStart';
import {SubmitScore} from './post';
import sndBtnOver from '../assets/sounds/sndBtnOver.wav';
import sndBtnDown from '../assets/sounds/sndBtnDown.wav';
import sprBtnRestart from '../assets/img/sprBtnRestart.png';
import sprBtnRestartHover from '../assets/img/sprBtnRestartHover.png';

export default class SceneLast extends Phaser.Scene {
  constructor() {
    super({ key: "SceneLast" });
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

    this.title = this.add.text(this.game.config.width * 0.5, 90, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#670D52',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    // name input
    const playerName = document.getElementById('playerName');
    playerName.classList.remove('hide');
    const btn = document.getElementById('btn');
    btn.classList.remove('hide');
    
    // const name = () =>{
    //   const nameValue = playerName.value;
    //   return nameValue;
    // }
    // btn.onclick = () => (name, score);

    btn.onclick = () =>  SubmitScore.send('leo', 700).then(this.scene.start('SceneScore'));

    console.log(SubmitScore.send(name, score));

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
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.subtitle = this.add.text(this.game.config.width * 0.29, 410, "Score Board", {
      fontFamily: 'monospace',
      fontSize: 35,
      fontStyle: 'bold',
      color: '#670D52',
      align: 'center'
    }).setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.scene.start('SceneScore');
    });

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on("pointerover", function() {
      this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnRestart.on("pointerout", function() {
      this.setTexture("sprBtnRestart");
    });

    this.btnRestart.on("pointerdown", function() {
      this.btnRestart.setTexture("sprBtnRestartDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnRestart.on("pointerup", function() {
      this.btnRestart.setTexture("sprBtnRestart");
      this.scene.start(window.location.reload());
    }, this);

    this.btnRestart.setOrigin(0.5, -1);
    
  }
}