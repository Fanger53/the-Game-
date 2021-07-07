import Player from './entities/player';
import ChaserShip from './entities/enemy1';
import GunShip from './entities/enemy2';
import CarrierShip from './entities/enemy3';
import ScrollingBackground from './entities/scrolling';
import sprBg0 from '../assets/img/sprBg0.png';
import sprBg1 from '../assets/img/sprBg1.png';
import sprExplosion from '../assets/img/sprExplosion.png';
import sprEnemy0 from '../assets/img/sprEnemy0.png';
import sprEnemy1 from '../assets/img/sprEnemy1.png';
import sprEnemy2 from '../assets/img/sprEnemy2.png';
import sprLaserEnemy0 from '../assets/img/sprLaserEnemy0.png';
import sprLaserPlayer from '../assets/img/sprLaserPlayer.png';
import sprPlayer from '../assets/img/sprPlayer.png';
import sndExplode0 from '../assets/sounds/sndExplode0.wav';
import sndExplode1 from '../assets/sounds/sndExplode1.wav';
import sndLaser from '../assets/sounds/sndLaser.wav';


export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1.png);
    this.load.spritesheet('sprExplosion', sprExplosion, {
  frameWidth: 32,
  frameHeight: 32
});
this.load.spritesheet('sprEnemy0', sprEnemy0, {
  frameWidth: 16,
  frameHeight: 16
});
this.load.image('sprEnemy1', sprEnemy1);
this.load.spritesheet('sprEnemy2', sprEnemy2, {
  frameWidth: 16,
  frameHeight: 16
});
this.load.image('sprLaserEnemy0', sprLaserEnemy0);
this.load.image('sprLaserPlayer', sprLaserPlayer);
this.load.spritesheet('sprPlayer', sprPlayer, {
  frameWidth: 16,
  frameHeight: 16
});
this.load.audio('sndExplode0', sndExplode0);
this.load.audio('sndExplode1', sndExplode1);
this.load.audio('sndLaser', sndLaser);
  }

  create() {

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser")
    };

    this.backgrounds = [];
      for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
        var bg = new ScrollingBackground(this, "sprBg0", i * 10);
        this.backgrounds.push(bg);
      }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.6,
      "sprPlayer",
    );

    this.player.setScale(2);
    this.livesText = this.add.text(16, 16, 'Lives: 3', { fontSize: '32px', fill: '#FFF' });

    this.scoreText = this.add.text(306, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });


    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });


    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function() {
        var enemy = null;

    if (Phaser.Math.Between(0, 10) >= 3) {
      // enemy = new GunShip(
      //   this,
      //   Phaser.Math.Between(0, this.game.config.width),
      //   0
      // );
      enemy = new CarrierShip(
        this,
        Phaser.Math.Between(0, this.game.config.width),
        0
      );
    }else {
      enemy = new ChaserShip(
        this,
        Phaser.Math.Between(0, this.game.config.width),
        0
      );
    }

    if (enemy !== null) {
      enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
      this.enemies.add(enemy);
    }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
          this.player.score += 200;
        }
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
      if (!player.getData("isDead") &&
          !enemy.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
      if (!player.getData("isDead") &&
          !laser.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });

  }

  update() {
    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      }
      else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyD.isDown) {
        this.player.moveRight();
      }
    
      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
      this.scoreText.setText(`Score: ${this.player.score}`);
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
    
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
    
          enemy.destroy();
        }
    
    }

      enemy.update();
    }

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }


}