import BaseScene from './BaseScene';

class PauseScene extends BaseScene {
  constructor() {
    super('PauseScene')

  }

  init(data) {
    this.currentScene = data.currentScene;
  }

  create() {
    const bgImages = {
      ClickMoveScene: 'resumeClickMove',
      DragDropScene: 'resumeDragDrop',
      RightClickScene: 'resumeRightClick',
    }

    this.add.image(0, 0, bgImages[this.currentScene]).setOrigin(0, 0);
    this.createMenu({sceneToCreate: this.scene.key, sceneToResume: this.currentScene});
  }

}

export default PauseScene;
