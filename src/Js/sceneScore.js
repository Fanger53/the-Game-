

export default class SceneScore extends Phaser.Scene {
  constructor() {
    super({ key: "SceneScore" });
  }

  create() {

    this.scoreTitle = this.add.text(this.game.config.width * 0.5, 300, "SPACE WARS", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    
    this.scoreTitle.setOrigin(0.5);

    this.subtitle = this.add.text(this.game.config.width * 0.29, 320, "Restart", {
      fontFamily: 'monospace',
      fontSize: 35,
      fontStyle: 'bold',
      color: '#670D52',
      align: 'center'
    }).setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.scene.start('SceneMain');
    });
  }
}