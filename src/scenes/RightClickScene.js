import Tank from '../objects/RightClickTank';
import RightClickShapes from '../objects/RightClickShapes';
import ContextMenu from '../objects/ContextMenu';
import BaseScene from "./BaseScene";

class RightClickScene extends BaseScene {
  constructor() {
    super('RightClickScene');
  }

  create() {
    this.shapesDropped = 0;
    this.correctClick = 0;
    this.totalClick = 0;
    this.speed = 0;
    this.rightClickDuration = null;

    super.create();

    this.tank = new Tank(this, 400, 500);
    this.contextMenu = new ContextMenu(this);
    this.shapes = new RightClickShapes(this);

    this.shapes.createShapes({x: this.tank.x, y: this.tank.y + 60, group: 1});
    this.saveGameData({historyKey: 'rightClickScoreHistory', wave: this.currentWave, accuracy: this.accuracy});
  }

  update() {
    this.tank.reloadBombs();
    this.tank.autoTrackAndShoot(this.balls);
  }

  resetMeasures() {
    this.totalBalls = 0;
    this.createdBalls = 0;
    this.activeBalls = 0;
    this.hits = 0;
    this.explosion.destroy();
    this.ballCreationTimer.remove();
    this.shapesDropped = 0;
    this.shapes.updateShapesDropped();
    console.log('reset!');
  }

  emitHudData() {
    if (this.totalClick > 0 && this.rightClickDuration > 0) {
      this.speed = Math.round(this.totalClick * 60000 / this.rightClickDuration); // average speed in moves/min
      this.accuracy = Math.round((this.correctClick / this.totalClick) * 100) // average accuracy in percentage
    }
    this.events.emit('emitHudData', this.score, this.speed, this.accuracy, this.currentWave);
  }

}

export default RightClickScene;
