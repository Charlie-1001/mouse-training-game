import * as Phaser from 'phaser';

class DragDropTank extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'tankBase');
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.baseCenter = this.getCenter();
    this.remainginBombs = 0;
    this.canShoot = false;
    this.bombSpeed = 1200;
    this.isReloading = true;
    this.targetIndex = 0;

    // create the health bar
    this.healthBar = this.scene.add.sprite(this.baseCenter.x, this.baseCenter.y + 25, 'healthBar');

    // create the top part
    this.tankTop = this.scene.add.sprite(this.baseCenter.x, this.baseCenter.y - 10, 'tankTop')
      .setOrigin(0.5, 0.8)
      .setDepth(1);

    // create animations
    this.tankTop.anims.create({
      key: 'shoot',
      frames: this.anims.generateFrameNumbers('tankTop', {start: 1, end: 0}),
      frameRate: 20,
      repeat: 0,
    })
  }

  // tracking the mouse pointer
  tracking(target) {
    // target variables
    const Tx = target.x;
    const Ty = target.y;
    const Tvx = target.body.velocity.x;
    const Tvy = target.body.velocity.y;
    // bomb variables
    const Bx = this.tankTop.x;
    const By = this.tankTop.y;
    const Bv = this.bombSpeed;
    // relative positions
    const dx = Tx - Bx;
    const dy = Ty - By;
    // solve with quadratic formula and we get,
    const a = Tvx * Tvx * Tvy * Tvy - Bv * Bv;
    const b = 2 * (dx * Tvx + dy * Tvy);
    const c = dx * dx + dy * dy;
    // discriminant
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) return; // no solution, target is too fast

    const sqrtDiscriminant = Math.sqrt(discriminant);
    const t1 = (-b + sqrtDiscriminant) / (2 * a);
    const t2 = (-b - sqrtDiscriminant) / (2 * a);

    // choose the smallest positive time, meaning the soonest intercept
    const time = Math.min(t1, t2) > 0 ? Math.min(t1, t2) : Math.max(t1, t2);
    if (time < 0) return; // no positive solution, the target is moving away too fast

    // future positions of the target
    const Tdx = target.x + target.body.velocity.x * time;
    const Tdy = target.y + target.body.velocity.y * time;

    const angle = Phaser.Math.Angle.Between(this.tankTop.x, this.tankTop.y, Tdx, Tdy);
    this.tankTop.rotation = angle + Math.PI / 2;
  }

  createAndShootBomb(bombs) {
    const angle = this.tankTop.rotation - Math.PI / 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    // create the bomb
    if (this.canShoot) {
      const bomb = bombs.create(this.tankTop.x, this.tankTop.y, 'bomb');
      bomb.rotation = this.tankTop.rotation;
      bomb.setDepth(0);
      bomb.setOrigin(0.5);
      this.tankTop.anims.play('shoot');
      this.scene.sound.play('tankShootSound', {volume: 0.5});
      this.remainginBombs--;
      this.scene.shapesDropped--;
      this.scene.shapes.updateShapesDropped();
      bomb.setVelocity(dx * this.bombSpeed, dy * this.bombSpeed);
      this.removeBombs(bomb);
    }
  }

  removeBombs(bomb) {
    if (
      bomb.x < 0 || bomb.x > this.scene.scale.width ||
      bomb.y < 0 || bomb.y > this.scene.scale.height
    ) {
      bomb.destroy();
    }
  }

  reloadBombs() {
    if (this.scene.shapesDropped === 0) {
      this.isReloading = true;
      this.canShoot = false;
    }

    if (this.isReloading) {
      this.tankTop.setFrame(2);
    }

    if (this.scene.shapesDropped) {
      this.isReloading = false;
      this.canShoot = true;
      this.tankTop.setFrame(0);
      this.remainginBombs = this.scene.shapesDropped;
    }
  }

  updateHealth() {
    if (this.scene.health === 0) return;
    let curentHealthFrame = 5 - this.scene.health;
    this.healthBar.setFrame(curentHealthFrame);
  }

  autoTrackAndShoot(targets) {
    const children = targets.getChildren();
    if (children.length === 0) {
      this.targetIndex = 0;
      return;
    }

    if (this.isReloading) return;

    const target = children[0];
    if (!target || !target.active) return;
    if (target.isTracked) return;
    target.isTracked = true;

    this.scene.time.delayedCall(500, () => {
      this.tracking(target);
      this.createAndShootBomb(this.scene.bombs);
    })
  }

}

export default DragDropTank;
