import BaseScene from './BaseScene';
import Tank from '../objects/DragDropTank';
import Shapes from '../objects/DragDropShapes';

class DragDropScene extends BaseScene {
  constructor() {
    super('DragDropScene');
  }

  create() {
    this.dragDuration = 0;
    this.successDrop = 0;
    this.totalDrops = 0;
    this.speed = 0;
    this.shapesDropped = 0;

    super.create();

    this.tank = new Tank(this, 400, 450);
    this.shapes = new Shapes(this);

    this.shapes.createShapes({x: 0, y: 600, type: 'baseShapes'});
    this.shapes.createShapes({x: this.tank.x, y: this.tank.y + 60, type: 'placeholderShapes', group: 1});
    this.saveGameData({historyKey: 'dragDropScoreHistory', wave: this.currentWave, accuracy: this.accuracy});
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
    this.dragDuration = 0;
    this.successDrop = 0;
    this.totalDrops = 0;
    this.shapesDropped = 0;
    this.shapes.updateShapesDropped();
    console.log('reset!');
  }

  emitHudData() {
    if (this.totalDrops > 0 && this.dragDuration > 0) {
      this.speed = Math.round(this.totalDrops * 60000 / this.dragDuration); // average speed in moves/min
      this.accuracy = Math.round((this.successDrop / this.totalDrops) * 100) // average accuracy in percentage
    }
    this.events.emit('emitHudData', this.score, this.speed, this.accuracy, this.currentWave);
  }

}

export default DragDropScene;
