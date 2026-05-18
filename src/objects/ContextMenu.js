class ContextMenu {
  constructor(scene) {
    this.scene = scene;
    this.menu = null;

    // close the context menu when there's a click on the canva
    this.scene.input.on('pointerdown', (pointer) => {
      if (!this.menu) return;
      if (pointer.leftButtonDown()) {
        this.closeMenu();
        this.scene.totalClick++;
        this.scene.emitHudData();
      }
    })

  }

  openMenu(pointer, shapesGroup, sprite) {
    if (this.menu) this.closeMenu();
    const menuX = pointer.worldX + 10;
    const menuY = pointer.worldY + 10;
    const menuWidth = 200;
    const menuHeight = 300;
    const container = this.scene.add.container(menuX, menuY);
    const bg = this.scene.add.rectangle(0, 0, menuWidth, menuHeight, 0x222222)
      .setOrigin(0, 1);
    container.add(bg);

    // creating menu
    const menu = [];
    const initialY = 20 - menuHeight;
    const centerX = menuWidth / 2;
    let spacingY = 40;

    const title = this.scene.add.text(centerX, initialY, 'Choose the shape', {color: 'white'}).setOrigin(0.5);
    container.add(title);

    shapesGroup.forEach(shape => {
      const shapeImage = this.scene.add.image(centerX, initialY + spacingY, shape.getData('texturePink'));

      shapeImage.setInteractive({useHandCursor: true});
      shapeImage.setData('shapeId', shape.getData('shapeId'));
      shapeImage.on('pointerdown', () => {
        if (shapeImage.getData('shapeId') === sprite.getData('shapeId')) {
          sprite.setTexture(shapeImage.texture.key);
          this.scene.shapes.toggleRightClickImage(sprite, false); // hide the rigt click placeholder image
          sprite.isDropped = true;
          this.scene.shapesDropped += this.scene.shapes.bombsPerShape;
          this.scene.rightClickDuration += this.scene.time.now - sprite.clickStartTime;
          this.scene.correctClick++;
        }

        this.scene.emitHudData();
      });

      spacingY += 50;
      menu.push(shapeImage);
    })

    container.add(menu);
    this.menu = {container};
  }

  closeMenu() {
    if (!this.menu) return;
    this.menu.container.destroy();
    this.menu = null;
  }
}

export default ContextMenu;
