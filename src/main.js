import * as Phaser from "phaser";
import TriggerScene from "./scenes/TriggerScene";
import PreloadScene from "./scenes/PreloadScene";
import ClickMoveScene from "./scenes/ClickMoveScene";
import HudScene from "./scenes/HudScene";
import WaveScene from "./scenes/WaveScene";
import DragDropScene from "./scenes/DragDropScene";
import RightClickScene from "./scenes/RightClickScene";
import PauseScene from "./scenes/PauseScene";
import HomeScene from "./scenes/HomeScene";
import ClickMoveMenu from "./scenes/ClickMoveMenu";
import DragDropMenu from "./scenes/DragDropMenu";
import RightClickMenu from "./scenes/RightClickMenu";
import BestScoreScene from "./scenes/BestScoreScene";
import GameOverScene from "./scenes/GameOverScene";
import VictoryScene from "./scenes/VictoryScene";

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {createContainer: true},
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: 200,
      debug: false,
    }
  },
  scene: [
    TriggerScene,
    PreloadScene,
    HomeScene,
    ClickMoveMenu,
    DragDropMenu,
    RightClickMenu,
    ClickMoveScene,
    DragDropScene,
    RightClickScene,
    HudScene,
    WaveScene,
    PauseScene,
    BestScoreScene,
    GameOverScene,
    VictoryScene,
  ],
}

new Phaser.Game(config);
