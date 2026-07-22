import * as Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');

    this.loadingPercent = 0;
  }

  preload() {
    // loading UI
    this.load.image('triggerSceneBg', 'assets/trigger-scene-bg.png');
    this.add.image(0, 0, 'triggerSceneBg').setOrigin(0, 0);
    this.loadingText = this.add.text(400, 500, 'Loading 0%', {fontSize: 48, fontStyle: 'bold', color: 'blue'}).setOrigin(0.5);

    this.load.on('progress', (value) => {
      this.loadingText.setText(`Loading ${Math.round(value * 100)}%`);
    });

    this.load.on('complete', () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => this.scene.start('VictoryScene'));
    });

    // backgrounds
    this.load.image('gameBg', 'assets/game-bg.png');
    this.load.image('homeSceneBg', 'assets/home-scene-bg.png');
    this.load.image('clickMoveMenuBg', 'assets/click-move-scene-bg.png');
    this.load.image('dragDropMenuBg', 'assets/drag-drop-scene-bg.png');
    this.load.image('rightClickMenuBg', 'assets/right-click-scene-bg.png');
    this.load.image('gameOverSceneBg', 'assets/game-over-scene-bg.png');
    this.load.image('menuEmptyBg', 'assets/menu-empty-bg.png');
    this.load.image('gameOverBg', 'assets/game-over-bg.png');
    this.load.image('victoryBg', 'assets/victory-bg.png');

    // title text
    this.load.image('clickMoveText', 'assets/click-move-text.png');
    this.load.image('dragDropText', 'assets/drag-drop-text.png');
    this.load.image('rightClickText', 'assets/right-click-text.png');

    // buttons
    this.load.image('rightClickImg', 'assets/right-click-image.png');
    this.load.image('clickMoveThumbnail', 'assets/click-move-thumbnail.png');
    this.load.image('dragDropThumbnail', 'assets/drag-drop-thumbnail.png');
    this.load.image('rightClickThumbnail', 'assets/right-click-thumbnail.png');
    this.load.image('pauseBtn', 'assets/pause-btn.png');
    this.load.image('playBtn', 'assets/play-btn.png');
    this.load.image('homeTextBtn', 'assets/menu-home-btn.png');
    this.load.image('bestScoreTextBtn', 'assets/menu-statistics-btn.png');
    this.load.image('playTextBtn', 'assets/menu-play-btn.png');
    this.load.image('resumeTextBtn', 'assets/menu-play-btn.png');
    this.load.image('retryBtn', 'assets/menu-retry-btn.png');
    this.load.image('playAgainBtn', 'assets/menu-play-again-btn.png');
    this.load.image('backBtn', 'assets/back-btn.png');
    this.load.image('clickMoveScoreBtn', 'assets/click-move-score-btn.png');
    this.load.image('dragDropScoreBtn', 'assets/drag-drop-score-btn.png');
    this.load.image('rightClickScoreBtn', 'assets/right-click-score-btn.png');
    this.load.image('exitBtn', 'assets/menu-exit-btn.png');

    // objects
    this.load.image('tankBase', 'assets/tank-base.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('blackBall', 'assets/black-ball.png');
    this.load.image('explosion', 'assets/explosion.png');
    this.load.spritesheet('tankTop', 'assets/tank-top.png', {frameWidth: 46, frameHeight: 120});
    this.load.spritesheet('healthBar', 'assets/health-bar.png', {frameWidth: 50, frameHeight: 5});
    this.load.spritesheet('waveText', 'assets/wave-text.png', {frameWidth: 280, frameHeight: 64})

    // shapes
    this.load.image('shapeFrameBig', 'assets/shape-frame-big.png');
    this.load.image('shapeFrameSmall', 'assets/shape-frame-small.png');
    this.load.image('circlePink', 'assets/circle-pink.png');
    this.load.image('trianglePink', 'assets/triangle-pink.png');
    this.load.image('ovalPink', 'assets/oval-pink.png');
    this.load.image('squarePink', 'assets/square-pink.png');
    this.load.image('rectanglePink', 'assets/rectangle-pink.png');
    this.load.image('pentagonPink', 'assets/pentagon-pink.png');
    this.load.image('hexagonPink', 'assets/hexagon-pink.png');
    this.load.image('heptagonPink', 'assets/heptagon-pink.png');
    this.load.image('starPink', 'assets/star-pink.png');
    this.load.image('octagonPink', 'assets/octagon-pink.png');
    this.load.image('circleBlue', 'assets/circle-blue.png');
    this.load.image('triangleBlue', 'assets/triangle-blue.png');
    this.load.image('ovalBlue', 'assets/oval-blue.png');
    this.load.image('squareBlue', 'assets/square-blue.png');
    this.load.image('rectangleBlue', 'assets/rectangle-blue.png');
    this.load.image('pentagonBlue', 'assets/pentagon-blue.png');
    this.load.image('hexagonBlue', 'assets/hexagon-blue.png');
    this.load.image('heptagonBlue', 'assets/heptagon-blue.png');
    this.load.image('starBlue', 'assets/star-blue.png');
    this.load.image('octagonBlue', 'assets/octagon-blue.png');

    // audios
    this.load.audio('menuBgm', 'assets/audios/bgm-guitar-and-piano.mp3');
    this.load.audio('gameBgm', 'assets/audios/bgm-military-march.mp3');
    this.load.audio('tankShootSound', 'assets/audios/eff-tank-shooting-near.mp3');
    this.load.audio('explosionSound', 'assets/audios/eff-tank-shooting-distant.mp3');
    this.load.audio('gameOverSound', 'assets/audios/eff-failure-ending.wav');
    this.load.audio('victorySound', 'assets/audios/eff-victory-ending.wav');
  }
}

export default PreloadScene;
