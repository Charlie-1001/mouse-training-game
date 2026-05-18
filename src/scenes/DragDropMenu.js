import BaseScene from "./BaseScene";

class DragDropMenu extends BaseScene {
  constructor() {
    super('DragDropMenu')
  }

  create() {
    this.createMenu({sceneToCreate: this.scene.key, sceneToPlay: 'DragDropScene'});
  }
}

export default DragDropMenu;
