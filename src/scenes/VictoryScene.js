import BaseScene from "./BaseScene";

class VictoryScene extends BaseScene {
  constructor() {
    super('VictoryScene');
  }

  init(data) {
    this.sceneToPlay = data.currentScene;
  }

  create() {
    this.createMenu({sceneToCreate: this.scene.key, sceneToPlay: this.sceneToPlay});
    if (this.registry.get('isFirstPlay')) {
      this.playSfx('victorySound');
      this.registry.remove('isFirstPlay');
    }
  }
}

export default VictoryScene;
