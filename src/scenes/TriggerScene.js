import * as Phaser from 'phaser';

class TriggerScene extends Phaser.Scene {
  constructor() {
    super('TriggerScene')

  }

  preload() {
    this.load.image('triggerSceneBg', 'assets/trigger-scene-bg.png');
    this.load.image('playBtnRound', 'assets/play-btn-round.png');
  }

  create() {
    this.add.image(0, 0, 'triggerSceneBg').setOrigin(0, 0);
    this.add.image(400, 300, 'playBtnRound')
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => this.scene.start('PreloadScene'));
  }
}

export default TriggerScene;
