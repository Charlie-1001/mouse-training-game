import * as Phaser from 'phaser';

class Balls extends Phaser.Physics.Arcade.Sprite{
  constructor(scene) {
    super(scene);
    this.scene = scene;
  }

  createBalls(group, x, y) {
    return group.create(x, y, 'blackBall').setOrigin(0.5);
  }

  steadyBalls() {
    const x = Phaser.Math.Between(10, 790);
    const y = Phaser.Math.Between(10, 200);

    this.createBalls(this.scene.balls, x, y).setOrigin(0.5);
  }

  dropBalls({group, speed}) {
    const x = Phaser.Math.Between(10, 790);
    const y = -10;
    const ball = this.createBalls(group, x, y);
    ball.setOrigin(0.5);
    ball.setVelocityY(speed);

    const distance = this.scene.scale.height + 10;
    const duration = (distance / speed) * 1000;
    this.scene.tweens.add({
      targets: ball,
      y: distance, // without this the onComplete will run immediately
      duration: duration,
      onComplete: () => {
        if (ball.active) {
          this.removeMissedBalls(ball);
        }
      }
    })
  }

  shrinkingBalls({group, shrinkDelay}) {
    const x = Phaser.Math.Between(10, 790);
    const y = Phaser.Math.Between(10, 200);
    let scale = 1;
    const shrinkStep = 0.01;
    const ball = this.createBalls(group, x, y);
    ball.setOrigin(0.5);
    const timer = this.scene.time.addEvent({
      delay: shrinkDelay,
      loop: true,
      callback: () => {
        scale = scale - shrinkStep;
        ball.setScale(scale);

        if (!ball.active) {timer.remove()} // stop and remove the timer when the ball gets hit

        if (scale <= 0.01) {
          this.removeMissedBalls(ball);
          timer.remove();
        }
      }
    });
  }

  // remove missed balls
  removeMissedBalls(ball) {
    ball.destroy();
    this.scene.activeBalls--;
    this.scene.health--;
    this.scene.showDamageFlash();
    this.scene.tank.updateHealth();
    this.scene.updateWaves();
  }
}

export default Balls;
