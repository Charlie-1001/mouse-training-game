import * as Phaser from 'phaser';
import { getTop3Scores, getHistory } from '../utilities/dataStoring';

class BestScoreScene extends Phaser.Scene {
  constructor() {
    super('BestScoreScene');

    this.top3Dom = null;
    this.scoreHistoryDom = null;
  }

  init(data) {
    this.menuScene = data.currentScene;
  }

  create() {
    this.add.image(0, 0, 'menuEmptyBg').setOrigin(0, 0);
    this.title = this.add.image(400, 60, 'clickMoveText');
    this.btnGroup = this.add.group();

    this.createButtons();
    this.highlightBtn();

    // showing scores with html
    if (this.menuScene === 'ClickMoveMenu') this.showScores('clickMoveScoreHistory');
    if (this.menuScene === 'DragDropMenu') this.showScores('dragDropScoreHistory');
    if (this.menuScene === 'RightClickMenu') this.showScores('rightClickScoreHistory');
    if (this.menuScene === 'VictoryScene' || this.menuScene === 'GameOverScene') this.showScores('clickMoveScoreHistory');
  }

  createButtons() {
    this.btnGroup.create(30, 25, 'backBtn')
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
        this.scene.start(this.menuScene);
      })

    const dragDropScoreBtn = this.btnGroup.create(400, 600, 'dragDropScoreBtn')
      .setOrigin(0.5, 1)
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
        this.showScores('dragDropScoreHistory');
      })

    const clickMoveScoreBtn = this.btnGroup.create(dragDropScoreBtn.getBounds().left, 600, 'clickMoveScoreBtn')
      .setOrigin(1)
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
        this.showScores('clickMoveScoreHistory');
      })

    const rightClickScoreBtn = this.btnGroup.create(dragDropScoreBtn.getBounds().right + 1, 600, 'rightClickScoreBtn')
      .setOrigin(0, 1)
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
        this.showScores('rightClickScoreHistory');
      })
  }

  highlightBtn() {
    this.btnGroup.getChildren().forEach(btn => {
      btn.on('pointerover', () => {
        btn.setTint(0xAAAAAA);
      });

      btn.on('pointerout', () => {
        btn.clearTint();
      })

      btn.on('pointerdown', () => {
        btn.setTint(0x555555);
      })

      btn.on('pointerup', () => {
        btn.setTint(0xAAAAAA);
      })
    })
  }

  // building html for scores
  showScores(historyKey) {
    if (historyKey === 'clickMoveScoreHistory') this.title.setTexture('clickMoveText');
    if (historyKey === 'dragDropScoreHistory') this.title.setTexture('dragDropText');
    if (historyKey === 'rightClickScoreHistory') this.title.setTexture('rightClickText');

    this.history = getHistory(historyKey);
    this.top3 = getTop3Scores(this.history);

    if (this.top3Dom) {
      this.top3Dom.destroy();
      this.top3Dom = null;
    }

    if (this.scoreHistoryDom) {
      this.scoreHistoryDom.destroy();
      this.scoreHistoryDom = null;
    }

    this.top3Dom = this.add.dom(400, 100).createFromHTML(this.top3Scores()).setOrigin(0.5, 0);
    this.scoreHistoryDom = this.add.dom(400, 260).createFromHTML(this.scoreHistory()).setOrigin(0.5, 0);
  }

  top3Scores() {
    return `
      <style>
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
          text-align: center;
          font-family: 'Arial', sans-serif;
        }
        table {
          width: 500px;
        }
        th {
          background-color: #700E7D;
          color: white;
          height: 30px;
        }
        td {
          background-color: #D6C1FF;
          font-size: 12px;
          height: 20px;
        }
      </style>

      <table>
        <tr>
          <th colspan="4">Top 3 Best Scores</th>
        </tr>
        <tr>
          <th>Time</th>
          <th>Waves</th>
          <th>Accuracy</th>
          <th>Score</th>
        </tr>
        ${this.top3.map(score => `
          <tr>
            <td>${score.time}</td>
            <td>${score.wave}</td>
            <td>${score.accuracy}%</td>
            <td>${score.score}</td>
          </tr>
        `).join('')}
      </table>
    `
  }

  scoreHistory() {
    return `
      <table>
        <tr>
          <th colspan="4">Score History</th>
        </tr>
        <tr>
          <th>Time</th>
          <th>Waves</th>
          <th>Accuracy</th>
          <th>Score</th>
        </tr>
        ${this.history.map(score => `
          <tr>
            <td>${score.time}</td>
            <td>${score.wave}</td>
            <td>${score.accuracy}%</td>
            <td>${score.score}</td>
          </tr>
          `).join('')}
      </table>
    `
  }
}

export default BestScoreScene;
