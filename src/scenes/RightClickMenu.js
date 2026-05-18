import BaseScene from "./BaseScene";

class RightClickMenu extends BaseScene {
  constructor() {
    super('RightClickMenu')
  }

  create() {
    this.createMenu({sceneToCreate: this.scene.key, sceneToPlay: 'RightClickScene'});
  }
}

export default RightClickMenu;
