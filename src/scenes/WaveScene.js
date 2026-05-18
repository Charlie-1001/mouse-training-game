import * as Phaser from 'phaser';

class WaveScene extends Phaser.Scene {
  constructor() {
    super('WaveScene');
  }

  init(data) {
    this.currentScene = data.currentScene;
    this.currentWave = data.currentWave;
    this.currentWaveFrame = this.currentWave - 1;
  }

  create() {
    this.overlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.5)
      .setOrigin(0);
    this.waveText = this.add.sprite(400, 300, 'waveText', this.currentWaveFrame);

    this.tweens.add({
      targets: [this.overlay, this.waveText],
      duration: 2000,
      alpha: 0,
      onComplete: () => {
        this.scene.resume(this.currentScene);
      }
    })
  }
}

export default WaveScene;
