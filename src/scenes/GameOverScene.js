import BaseScene from "./BaseScene";

class GameOverScene extends BaseScene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.sceneToPlay = data.currentScene;
  }

  create() {
    this.createMenu({sceneToCreate: this.scene.key, sceneToPlay: this.sceneToPlay});
    if (this.registry.get('isFirstPlay')) {
      this.playSfx('gameOverSound');
      this.registry.remove('isFirstPlay');
    }
  }
}

export default GameOverScene;
