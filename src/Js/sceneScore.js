import {GetScore} from './get';

let allScores;

export default class SceneScore extends Phaser.Scene {
  constructor() {
    super({ key: "SceneScore" });
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
    console.log(allScores);
    // const top = await this.getTopScores();
    

    // let gap = 0;
    // top.forEach((item) => {
    //   this.add.text(530, 170 + gap, `${item.user} -------------  ${item.score}`, {
    //     fontSize: '17px',
    //     fill: '#f8e578',
    //     width: 400,
    //     fontFamily: '"Train One"',
    //     padding: {
    //       left: 10,
    //       right: 10,
    //       top: 10,
    //       bottom: 10,
    //     },
    //   });
    //   gap += 50;
    // });

    

    this.scoreTitle = this.add.text(this.game.config.width * 0.5, 300, "SPACE WARS", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    
    this.scoreTitle.setOrigin(0.5);

    this.subtitle = this.add.text(this.game.config.width * 0.29, 320, "Start a New Game", {
      fontFamily: 'monospace',
      fontSize: 35,
      fontStyle: 'bold',
      color: '#670D52',
      align: 'center'
    }).setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.scene.start(window.location.reload());
    });
  }

  // async getTopScores() {
  //   const { sys: { game: { globals: { api: Api } } } } = this;
  //   const scores = await api.getScores();
  //   const array = [];
  //   scores.forEach((item) => array.push({ user: item.user, score: item.score }));
  //   const topScores = array.sort(
  //     (a, b) => ((a.score) > (b.score) ? -1 : 1),
  //   ).slice(0, 5);

  //   return topScores;
  // }

  // async deleteLoadingText(scores) {
  //   const topScores = await scores;
  //   if (topScores) { this.loading.destroy(); }
  // }
}