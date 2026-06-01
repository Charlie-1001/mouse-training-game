import * as Phaser from 'phaser';
import Balls from '../objects/Balls';
import { addScore } from '../utilities/dataStoring';

class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.waves = {
      wave1: {balls: 10},
      wave2: {balls: 10},
      wave3: {balls: 10},
      wave4: {balls: 10},
      wave5: {balls: 10},
      wave6: {balls: 15},
      wave7: {balls: 20},
      wave8: {balls: 25},
      wave9: {balls: 30},
      wave10: {balls: 35},
    }
  }

  //shared config for all scenes
  create() {
    this.add.image(0, 0, 'gameBg').setOrigin(0, 0);
    this.input.mouse.disableContextMenu();
    this.health = 5;
    this.currentWave = 1;
    this.totalBalls = 0;
    this.createdBalls = 0;
    this.activeBalls = 0;
    this.score = 0;
    this.hits = 0;
    this.accuracy = 0;
    this.ballCreationTimer = null;
    this.gameBgm = this.sound.add('gameBgm');

    this.ball = new Balls(this);

    this.bombs = this.physics.add.group();
    this.balls = this.physics.add.group();
    this.introduceWave();
    this.updateDifficulty(this.currentWave);
    this.scene.launch('HudScene', {currentScene: this.scene.key});
    this.scene.bringToTop('HudScene');
    this.createPlayPauseBtn(this.scene.key);
    this.createDamageFlash();

    this.physics.add.overlap(this.bombs, this.balls, this.handleHit, null, this);

    this.playBgm('gameBgm');
  }

  introduceWave() {
    this.scene.pause();
    this.scene.launch('WaveScene', {currentScene: this.scene.key, currentWave: this.currentWave});
  }

  updateDifficulty(wave) {
    this.totalBalls = this.waves[`wave${this.currentWave}`].balls;
    let delayTime = 1500;
    if (wave >= 7) delayTime = 1000;

    this.ballCreationTimer = this.time.addEvent({
      delay: delayTime,
      repeat: this.totalBalls - 1,
      callback: () => {
        if (wave === 1) {
          // this.ball.dropBalls({group: this.balls, speed: 900});
          this.ball.steadyBalls();
        } else if (wave === 2) {
          this.ball.shrinkingBalls({group: this.balls, shrinkDelay: 80});
        } else if (wave === 3) {
          this.ball.shrinkingBalls({group: this.balls, shrinkDelay: 60});
        } else if (wave === 4) {
          this.ball.shrinkingBalls({group: this.balls, shrinkDelay: 40});
        } else if (wave === 5) {
          this.ball.shrinkingBalls({group: this.balls, shrinkDelay: 30});
        } else if (wave === 6) {
          this.ball.shrinkingBalls({group: this.balls, shrinkDelay: 20});
        } else if (wave === 7) {
          this.ball.dropBalls({group: this.balls, speed: 150});
        } else if (wave === 8) {
          this.ball.dropBalls({group: this.balls, speed: 300});
        } else if (wave === 9) {
          this.ball.dropBalls({group: this.balls, speed: 350});
        } else if (wave === 10) {
          this.ball.dropBalls({group: this.balls, speed: 400});
        }

        this.createdBalls++;
        this.activeBalls++;

        if (this.ballCreationTimer.getRepeatCount() === 0) {this.ballCreationTimer.remove()}
      }
    })
  }

  updateWaves() {
    const totalWaves = Object.keys(this.waves).length;
    let waveEnd = this.totalBalls === this.createdBalls && this.activeBalls === 0;
    let waveFail = this.health === 0;
    let wavePass = !waveFail && waveEnd;

    if(wavePass) {
      this.resetMeasures();
      if (this.currentWave < totalWaves) {
        this.currentWave++;
        this.emitHudData();
        this.updateDifficulty(this.currentWave);
        this.introduceWave();
      } else {
        this.scene.stop('HudScene');
        this.scene.start('VictoryScene', {currentScene: this.scene.key});
        this.registry.set('isFirstPlay', true);
      }
    }

    if (waveFail) {
      this.scene.stop('HudScene');
      this.scene.start('GameOverScene', {currentScene: this.scene.key});
      this.registry.set('isFirstPlay', true);
    }
  }

  handleHit(bomb, ball) {
    bomb.disableBody(true, true);
    ball.disableBody(true, true);
    this.hits++;
    this.score += 10;
    this.emitHudData();
    bomb.destroy();
    ball.destroy();
    this.activeBalls--;

    this.playSfx('explosionSound');

    this.explosion = this.add.image(ball.x, ball.y, 'explosion');
    this.tweens.add({
      targets: this.explosion,
      duration: 200,
      alpha: 0,
      onComplete: () => {this.explosion.destroy()}
    })

    this.updateWaves();
  }

  createDamageFlash() {
    this.damageOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xff0000)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(999)     // make sure it's on top
      .setAlpha(0);      // initially invisible
  }

  showDamageFlash() {
    this.damageOverlay.setAlpha(0.3); // pale red

    this.tweens.add({
      targets: this.damageOverlay,
      alpha: 0,
      duration: 200, // fast fade
      ease: 'Linear'
    });
  }

  // play/pause/home button functions
  createPlayPauseBtn(sceneKey) {
    const playBtn = this.add.image(30, 30, 'playBtn');
    playBtn.setInteractive({useHandCursor: true});
    playBtn.on('pointerup', () => {this.launchPauseScene(sceneKey)});
  }

  launchPauseScene(sceneKey) {
    this.scene.pause(sceneKey);
    this.scene.launch('PauseScene', {currentScene: sceneKey});
    this.scene.get('HudScene').cameras.main.setVisible(false);
  }

  resumeScene(sceneToResume) {
    if (sceneToResume) this.scene.resume(sceneToResume);
    this.scene.get('HudScene').cameras.main.setVisible(true);
    this.scene.stop('PauseScene');
  }

  goToHomeScene(sceneToResume) {
    if (this.scene.isActive('HudScene')) this.scene.stop('HudScene');
    if (sceneToResume) this.scene.stop(sceneToResume);
    this.scene.start('HomeScene');
  }

  // menu creation function
  createMenu({sceneToCreate, sceneToPlay, sceneToResume}) {
    const btnFunctions = {
      playTextBtn: () => this.scene.start(sceneToPlay),
      playAgainTextBtn: () => this.scene.start(sceneToPlay),
      bestScoreTextBtn: () => this.scene.start('BestScoreScene', {currentScene: sceneToCreate}),
      homeTextBtn: () => this.goToHomeScene(sceneToResume),
      resumeTextBtn: () => this.resumeScene(sceneToResume),
      clickMoveThumbnail: () => this.scene.start('ClickMoveMenu'),
      dragDropThumbnail: () => this.scene.start('DragDropMenu'),
      rightClickThumbnail: () => this.scene.start('RightClickMenu'),
    };
    const menuData = {
      HomeScene: {
        background: 'homeSceneBg',
        buttons: ['clickMoveThumbnail', 'dragDropThumbnail', 'rightClickThumbnail'],
      },
      ClickMoveMenu: {
        background: 'clickMoveMenuBg',
        buttons: ['playTextBtn', 'bestScoreTextBtn', 'homeTextBtn'],
      },
      DragDropMenu: {
        background: 'dragDropMenuBg',
        buttons: ['playTextBtn', 'bestScoreTextBtn', 'homeTextBtn'],
      },
      RightClickMenu: {
        background: 'rightClickMenuBg',
        buttons: ['playTextBtn', 'bestScoreTextBtn', 'homeTextBtn'],
      },
      PauseScene: {
        background: null,
        buttons: ['resumeTextBtn', 'homeTextBtn'],
      },
      GameOverScene: {
        background: 'gameOverBg',
        buttons: ['playAgainTextBtn', 'bestScoreTextBtn', 'homeTextBtn'],
      },
      VictoryScene: {
        background: 'victoryBg',
        buttons: ['playAgainTextBtn', 'bestScoreTextBtn', 'homeTextBtn'],
      },
    };

    const currentScene = menuData[sceneToCreate];
    const currentBg = currentScene.background;

    if (currentBg) this.add.image(0, 0, currentScene.background).setOrigin(0, 0);
    let currentY = 200;
    let prevHeight = 0;
    const spacing = 20;

    currentScene.buttons.forEach(btn => {
      currentY += prevHeight === 0 ? 0 : prevHeight + spacing;

      const button = this.add.image(400, currentY, btn)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', btnFunctions[btn]);
      prevHeight = button.height;
    })
  }

  // play background music and sound effects
  playBgm(key) {
    this.sound.stopAll();
    this.sound.play(key, {
      loop: true,
      volume: key === 'gameBgm' ? 0.3 : 0.5,
    });
  }

  playSfx(key) {
    this.sound.play(key, {
      volume: 0.5,
    });
  }

  // save game data
  saveGameData({historyKey}) {
    this.events.once('shutdown', () => {
      addScore({historyKey: historyKey, score: this.score, wave: this.currentWave, accuracy: this.accuracy});
      this.sound.stopAll();
    })
  }
}

export default BaseScene;
