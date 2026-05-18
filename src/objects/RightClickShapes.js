class Shapes {
  constructor(scene) {
    this.scene = scene;
    this.placeholderGroup = this.scene.add.group();
    this.rightClickImageGroup = this.scene.add.group();
    this.bombsPerShape = 2;

    this.placeHolderShapes = [
      { shapeId: 'circle', key: 'circleBlue', key2: 'circlePink' },
      { shapeId: 'triangle', key: 'triangleBlue', key2: 'trianglePink' },
      { shapeId: 'rectangle', key: 'rectangleBlue', key2: 'rectanglePink' },
      { shapeId: 'hexagon', key: 'hexagonBlue', key2: 'hexagonPink' },
      { shapeId: 'pentagon', key: 'pentagonBlue', key2: 'pentagonPink' },
      { shapeId: 'oval', key: 'ovalBlue', key2: 'ovalPink' },
      { shapeId: 'square', key: 'squareBlue', key2: 'squarePink' },
      { shapeId: 'star', key: 'starBlue', key2: 'starPink' },
      { shapeId: 'octagon', key: 'octagonBlue', key2: 'octanglePink' },
      { shapeId: 'heptagon', key: 'heptagonBlue', key2: 'heptagonPink' },
    ];

  }

  toggleRightClickImage(shape, condition) {
    const image = this.rightClickImageGroup.getChildren().find(img => img.getData('id') === shape.getData('shapeId'));
    if (image) image.setVisible(condition);
  }

  createShapes({ x, y, group }) {
    if (group !== 1 && group !== 2) return;
    const group1 = [];
    const start = group === 1 ? 0 : 5;
    const end = group === 1 ? 4 : 9;
    const frame = this.scene.add.image(x, y, 'shapeFrameSmall');
    const startPoint = frame.x - frame.width / 2;
    let spacingX = 20;

    for (let i = start; i <= end; i++) {
      const currentShape = this.placeHolderShapes[i];
      const placeholderShape = this.placeholderGroup.create(startPoint + spacingX, y, currentShape.key)
        .setScale(0.8);
      // the right click image placeholder
      const shapeCenter = placeholderShape.getCenter();
      const rightClickImage = this.rightClickImageGroup.create(shapeCenter.x, shapeCenter.y, 'rightClickImg');

      rightClickImage.setData('id', currentShape.shapeId);
      placeholderShape.setData('shapeId', currentShape.shapeId);
      placeholderShape.setData('textureBlue', currentShape.key);
      placeholderShape.setData('texturePink', currentShape.key2);
      placeholderShape.setInteractive();
      group1.push(placeholderShape);
      placeholderShape.on('pointerdown', (pointer) => {
        if (pointer.rightButtonDown()) {
          placeholderShape.clickStartTime = this.scene.time.now;
          this.scene.contextMenu.openMenu(pointer, group1, placeholderShape);
        }
      })

      spacingX += 40;
    }
  }

  updateShapesDropped() {
    if (this.scene.shapesDropped === 0) {
      this.placeholderGroup.getChildren().forEach(shape => {
        shape.setTexture(shape.getData('textureBlue'));
      })
    }

    if (this.scene.shapesDropped % this.bombsPerShape === 0) {
      for (const shape of this.placeholderGroup.getChildren()) {
        if (shape.isDropped) {
          shape.setTexture(shape.getData('textureBlue'));
          this.toggleRightClickImage(shape, true); // show the right click placeholder image
          shape.isDropped = false;
          return;
        }
      }
    }
  }

}

export default Shapes;