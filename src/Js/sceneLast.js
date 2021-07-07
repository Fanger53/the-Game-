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
    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#670D52',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

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
      this.scene.start("SceneMain");
    }, this);

    this.subtitle = this.add.text(this.game.config.width * 0.29, 320, "Score Board", {
      fontFamily: 'monospace',
      fontSize: 35,
      fontStyle: 'bold',
      color: '#670D52',
      align: 'center'
    }).setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.scene.start('SceneScore');
    });

    
  }
}