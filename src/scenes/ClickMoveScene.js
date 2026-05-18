import BaseScene from './BaseScene';
import Tank from '../objects/ClickMoveTank';
import { addScore } from '../utilities/dataStoring';

class ClickMoveScene extends BaseScene {
  constructor() {
    super('ClickMoveScene');
  }

  create() {
    this.clicks = 0;
    this.canClick = true;

    super.create(); // getting the shared config from the base scene
    this.tank = new Tank(this, 400, 550);

    this.handleLeftClick();
    this.saveGameData({historyKey: 'clickMoveScoreHistory', wave: this.currentWave, accuracy: this.accuracy});
  }

  update() {
    this.tank.tracking();
    this.tank.reloadBombs();
  }

  resetMeasures() {
    this.totalBalls = 0;
    this.createdBalls = 0;
    this.activeBalls = 0;
    this.explosion.destroy();
    this.ballCreationTimer.remove();
  }

  handleLeftClick() {
    this.input.on('pointerdown', (pointer) => {
      if (pointer.leftButtonDown() && this.canClick) {
        this.tank.createAndShootBomb(this.bombs);
        this.clicks++;
        this.emitHudData();
      }
    });
  }

  emitHudData() {
    this.accuracy = this.clicks > 0 ? Math.round((this.hits / this.clicks) * 100) : 0;
    this.events.emit('emitHudData', this.score, this.accuracy, this.currentWave);
  }
}

export default ClickMoveScene;
