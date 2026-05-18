import * as Phaser from 'phaser';

class HudScene extends Phaser.Scene {
  constructor() {
    super('HudScene');
  }

  init(data) {
    this.currentScene = data.currentScene;
  }

  create() {
    this.createLabels();
    this.updateLabels();
  }

  createLabels() {
    const x = this.scale.width - 150;
    let y = 20;
    let lineHeight = 20;
    const styles = {fontSize: 16, fontStyle: 'bold', fill: 'blue'};

    if (this.currentScene === 'ClickMoveScene') {
      this.scoreText = this.add.text(x, y, `Score: 0`, styles);
      y += lineHeight;
      this.accuracyText = this.add.text(x, y, `Accuracy: 0%`, styles);
      y += lineHeight;
      this.waveText = this.add.text(x, y, `Wave: 1`, styles);
    }

    if (this.currentScene === 'DragDropScene') {
      this.scoreText = this.add.text(x, y, `Score: 0`, styles);
      y += lineHeight;
      this.speedText = this.add.text(x, y, `Speed: 0 MPM`, styles);
      y += lineHeight;
      this.accuracyText = this.add.text(x, y, `Accuracy: 0`, styles);
      y += lineHeight;
      this.waveText = this.add.text(x, y, `Wave: 1`, styles);
    }

    if (this.currentScene === 'RightClickScene') {
      this.scoreText = this.add.text(x, y, `Score: 0`, styles);
      y += lineHeight;
      this.speedText = this.add.text(x, y, `Speed: 0 SPM`, styles);
      y += lineHeight;
      this.accuracyText = this.add.text(x, y, `Accuracy: 0`, styles);
      y += lineHeight;
      this.waveText = this.add.text(x, y, `Wave: 1`, styles);
    }
  };

  updateLabels() {
    if (this.currentScene === 'ClickMoveScene') {
      const ClickMoveScene = this.scene.get('ClickMoveScene');

      ClickMoveScene.events.on('emitHudData', (score, accuracy, wave) => {
        this.scoreText.setText(`Score: ${score}`);
        this.accuracyText.setText(`Accuracy: ${accuracy}%`);
        this.waveText.setText(`Wave: ${wave}`);
      })
    }

    if (this.currentScene === 'DragDropScene') {
      const DragDropScene = this.scene.get('DragDropScene');

      DragDropScene.events.on('emitHudData', (score, speed, accuracy, wave) => {
        this.scoreText.setText(`Score: ${score}`);
        this.speedText.setText(`Speed: ${speed} MPM`);
        this.accuracyText.setText(`Accuracy: ${accuracy}%`);
        this.waveText.setText(`Wave: ${wave}`);
      })
    }

    if (this.currentScene === 'RightClickScene') {
      const RightClickScene = this.scene.get('RightClickScene');

      RightClickScene.events.on('emitHudData', (score, speed, accuracy, wave) => {
        this.scoreText.setText(`Score: ${score}`);
        this.speedText.setText(`Speed: ${speed} SPM`);
        this.accuracyText.setText(`Accuracy: ${accuracy}%`);
        this.waveText.setText(`Wave: ${wave}`);
      })
    }

  }
}

export default HudScene;
