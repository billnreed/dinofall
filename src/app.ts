import { Game } from './game';

function startApp(): void {
  const gameWidth: number = 640;
  const gameHeight: number = 480;

  const gameConfig: Phaser.IGameConfig = {
    width: gameWidth,
    height: gameHeight,
    renderer: Phaser.AUTO,
    parent: 'game-container',
  };

  new Game(gameConfig);
}

window.onload = () => {
  startApp();
};
