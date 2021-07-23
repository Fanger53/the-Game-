/* eslint import/no-unresolved: 2 */
import Phaser from 'phaser';
import '../assets/style.scss';
import SceneStart from './sceneStart';
import SceneMain from './sceneMain';
import SceneLast from './sceneLast';
import SceneScore from './sceneScore';

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 550,
  parent: 'board-game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [SceneStart,
    SceneMain,
    SceneLast,
    SceneScore],
  pixelArt: true,
  roundPixels: true,
};

window.game = new Phaser.Game(config);
