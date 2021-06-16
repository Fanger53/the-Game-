import '../assets/style.scss';
import Phaser from 'phaser';
import SceneStart from './sceneStart';
import SceneMain from './sceneMain';
import SceneLast from './sceneLast';

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 600,
  parent: 'board-game',
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [SceneStart,
    SceneMain,
    SceneLast],
  pixelArt: true,
  roundPixels: true
};

const game = new Phaser.Game(config);

