import { Game } from './game';

function startApp(): void {
  const gameConfig: Phaser.IGameConfig = {
    renderer: Phaser.AUTO,
    parent: 'game-container',
    scaleMode: Phaser.ScaleManager. RESIZE,
  };

  new Game(gameConfig);
}

window.onload = () => {
  startApp();
};
