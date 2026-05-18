import BaseScene from "./BaseScene";

class ClickMoveMenu extends BaseScene {
  constructor() {
    super('ClickMoveMenu')
  }

  create() {
    this.createMenu({sceneToCreate: this.scene.key, sceneToPlay: 'ClickMoveScene'});
  }
}

export default ClickMoveMenu;
