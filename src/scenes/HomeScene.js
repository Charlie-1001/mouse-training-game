import BaseScene from "./BaseScene";

class HomeScene extends BaseScene {
  constructor() {
    super('HomeScene');
  }

  create() {
    this.createMenu({sceneToCreate: this.scene.key});
    this.add.image( this.scale.width - 30, 30, 'closeBtn')
      .setOrigin(0.5)
      .setInteractive({useHandCursor: true})
      .on('pointerup', () => {
        window.location.reload();
      })
    this.playBgm('menuBgm');
  }
}

export default HomeScene;
