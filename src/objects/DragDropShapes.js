class Shapes {
  constructor(scene) {
    this.scene = scene;
    this.placeholderGroup = this.scene.add.group();
    this.baseGroup = this.scene.add.group();
    this.dragClone = null;
    this.bombsPerShape = 2;

    this.placeHolderShapes = [
      { shapeId: 'circle', key: 'circleBlue' },
      { shapeId: 'triangle', key: 'triangleBlue' },
      { shapeId: 'rectangle', key: 'rectangleBlue' },
      { shapeId: 'hexagon', key: 'hexagonBlue' },
      { shapeId: 'pentagon', key: 'pentagonBlue' },
      { shapeId: 'oval', key: 'ovalBlue' },
      { shapeId: 'square', key: 'squareBlue' },
      { shapeId: 'star', key: 'starBlue' },
      { shapeId: 'octagon', key: 'octagonBlue' },
      { shapeId: 'heptagon', key: 'heptagonBlue' },
    ];

    this.baseShapes = [
      { shapeId: 'circle', key: 'circlePink' },
      { shapeId: 'triangle', key: 'trianglePink' },
      { shapeId: 'rectangle', key: 'rectanglePink' },
      { shapeId: 'hexagon', key: 'hexagonPink' },
      { shapeId: 'pentagon', key: 'pentagonPink' },
      { shapeId: 'oval', key: 'ovalPink' },
      { shapeId: 'square', key: 'squarePink' },
      { shapeId: 'star', key: 'starPink' },
      { shapeId: 'octagon', key: 'octagonPink' },
      { shapeId: 'heptagon', key: 'heptagonPink' },
    ];

    // Create a replacement at the original spot when dragging starts
    this.scene.input.on('dragstart', (pointer, dragObject) => {
      dragObject.dragStartTime = this.scene.time.now;
      const replacement = this.scene.add.image(
        dragObject.x,
        dragObject.y,
        dragObject.texture.key
      ).setOrigin(dragObject.originX, dragObject.originY);

      replacement.setData('shapeId', dragObject.getData('shapeId'));
      replacement.setInteractive({ draggable: true });
      this.scene.input.setDraggable(replacement);
    });

    // dragging
    this.scene.input.on('drag', (pointer, dragObject, dragX, dragY) => {
      dragObject.x = dragX;
      dragObject.y = dragY;
      dragObject.setDepth(999);
    })

    // dropping event
    this.scene.input.on('drop', (pointer, dragObject, target) => {
      if (dragObject.getData('shapeId') === target.getData('shapeId')) {
        target.setTexture(dragObject.texture.key);
        target.isDropped = true;
        this.scene.shapesDropped += this.bombsPerShape;
        this.scene.successDrop++;
      };
    })

    // entering drop zone
    this.scene.input.on('dragenter', (pointer, dragObject, target) => {
      dragObject.setScale(target.scale);
    })

    // leaving drop zone
    this.scene.input.on('dragleave', (pointer, dragObject, target) => {
      dragObject.setScale(1);
    })

    // handling failed drops
    this.scene.input.on('dragend', (pointer, dragObject, target) => {
      this.scene.dragDuration += this.scene.time.now - dragObject.dragStartTime;
      dragObject.destroy();
      this.scene.totalDrops++;
      this.scene.emitHudData();
    })

  }

  createShapes({ x, y, type, group }) {
    if (type === 'baseShapes') {
      const frame = this.scene.add.image(x, y, 'shapeFrameBig').setOrigin(0, 1);
      const frameCenter = frame.getCenter();
      let spacingX = 20;

      this.baseShapes.forEach(shape => {
        const baseShape = this.baseGroup.create(x + spacingX, frameCenter.y, shape.key)
          .setOrigin(0, 0.5);
        baseShape.setData('shapeId', shape.shapeId);
        baseShape.setInteractive({ useHandCursor: true });
        this.scene.input.setDraggable(baseShape);

        spacingX += 80;
      });
    }

    if (type === 'placeholderShapes') {
      const frame = this.scene.add.image(x, y, 'shapeFrameSmall');
      const startPoint = frame.x - frame.width / 2;
      let spacingX = 20;

      if (group !== 1 && group !== 2) return;

      const start = group === 1 ? 0 : 5;
      const end = group === 1 ? 4 : 9;

      for (let i = start; i <= end; i++) {
        const currentShape = this.placeHolderShapes[i];
        const placeholderShape = this.placeholderGroup.create(startPoint + spacingX, y, currentShape.key)
          .setScale(0.8);
        placeholderShape.setData('shapeId', currentShape.shapeId);
        placeholderShape.setData('texture', currentShape.key);
        placeholderShape.setInteractive();
        placeholderShape.input.dropZone = true;

        spacingX += 40;
      }
    }
  }

  updateShapesDropped() {
    if (this.scene.shapesDropped === 0) {
      this.placeholderGroup.getChildren().forEach(shape => {
        shape.setTexture(shape.getData('texture'));
      })
    }

    if (this.scene.shapesDropped % this.bombsPerShape === 0) {
      for (const shape of this.placeholderGroup.getChildren()) {
        if (shape.isDropped) {
          shape.setTexture(shape.getData('texture'));
          shape.isDropped = false;
          return;
        }
      }
    }
  }
}

export default Shapes;