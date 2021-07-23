import Phaser from 'phaser';
import { GetScore } from './get';

let allScores;

export default class SceneScore extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneScore' });
  }

  async create() {
    const playerName = document.getElementById('playerName');
    playerName.classList.add('hide');

    const btn = document.getElementById('btn');
    btn.classList.add('hide');

    this.loading = this.add.text(500, 290, '', {
      fontFamily: '"Train One"', fontSize: 30, color: '#a99561', fontStyle: 'bolder',
    });
    this.loading.setText('Loading top scores ...');

    allScores = GetScore.all();

    const div = document.createElement('div');
    div.innerHTML = `<button type='submit' id='backtomenu'
    style='background-color: transparent;
    border: 2px solid white;
    border-radius: 5px;
    color: white;
    padding: 0.5rem;
    margin-left: 3.5rem;
    text-transform: uppercase;
    font-weight: bold;'>
    Back To Menu</button>`;
    this.add.dom(this.game.config.width * 0.45, this.game.config.height * 0.8, div, 'background-color: transparent; width: 220px; height: 0; font: 48px Arial');

    this.scoreTitle = this.add.text(this.game.config.width * 0.5, 40, 'Top Scores', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.scoreTitle.setOrigin(0.5);

    this.subtitle = this.add.text(this.game.config.width * 0.20, 420, 'Start a New Game', {
      fontFamily: 'monospace',
      fontSize: 35,
      fontStyle: 'bold',
      color: '#670D52',
      align: 'center',
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start(window.location.reload());
      });
  }

  update() {
    allScores.then((response) => {
      const results = response.result;
      // eslint-disable-next-line no-nested-ternary
      results.sort((a, b) => ((a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)));
      let height = 0.3;
      results.slice(0, 5).forEach((result) => {
        this.add.text(this.game.config.width * 0.3, this.game.config.height * height, `${result.user}: ${result.score}`, {
          fontFamily: 'monospace',
          fontSize: 32,
          fontStyle: 'bold',
          color: '#ffffff',
          align: 'center',
        });
        height += 0.1;
      });
    });
  }
}