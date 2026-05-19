import * as Phaser from 'phaser';

class ClickMoveTank extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'tankBase');
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.baseCenter = this.getCenter();
    this.remainingBombs = 5;
    this.canShoot = true;
    this.bombSpeed = 1200;
    this.isReloading = false;

    // create the health bar
    this.healthBar = this.scene.add.sprite(this.baseCenter.x, this.baseCenter.y + 25, 'healthBar');

    // create the top part
    this.tankTop = this.scene.add.sprite(this.baseCenter.x, this.baseCenter.y - 10, 'tankTop').setOrigin(0.5, 0.8);

    // create animations
    this.tankTop.anims.create({
      key: 'shoot',
      frames: this.anims.generateFrameNumbers('tankTop', {start: 1, end: 0}),
      frameRate: 20,
      repeat: 0,
    })
  }

  // tracking the mouse pointer
  tracking() {
    const target = this.scene.input.activePointer;
    const distance = Phaser.Math.Distance.Between(this.tankTop.x, this.tankTop.y, target.worldX, target.worldY);

    if (distance < 50) { return }; // to preven the turret from spinning when the pointer gets closer to the center

    const angle = Phaser.Math.Angle.Between(this.tankTop.x, this.tankTop.y, target.worldX, target.worldY);
    this.tankTop.rotation = angle + Math.PI / 2;
  }

  createAndShootBomb(bombs) {
    const angle = this.tankTop.rotation - Math.PI / 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const distance = 80; // distance from the turret center
    const x = this.tankTop.x + distance * dx;
    const y = this.tankTop.y + distance * dy;
    // create the bomb
    if (this.canShoot) {
      const bomb = bombs.create(x, y, 'bomb');
      bomb.rotation = this.tankTop.rotation;
      this.tankTop.anims.play('shoot');
      this.scene.sound.play('tankShootSound', {volume: 0.5});
      bomb.setVelocity(dx * this.bombSpeed, dy * this.bombSpeed);
      this.remainingBombs--;
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
    if (this.remainingBombs === 0 && !this.isReloading) {
      this.isReloading = true;
      this.canShoot = false;
      this.scene.canClick = false;
      this.tankTop.anims.stop();
      this.tankTop.setFrame(2);
      this.scene.time.delayedCall(2000, () => {
        this.remainingBombs = 5;
        this.isReloading = false;
        this.canShoot = true;
        this.scene.canClick = true;
        this.tankTop.setFrame(0);
      })
    }
  }

  updateHealth() {
    if (this.scene.health === 0) return;
    let curentHealthFrame = 5 - this.scene.health;
    this.healthBar.setFrame(curentHealthFrame);
  }

}

export default ClickMoveTank;
