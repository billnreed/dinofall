import { GameConfig } from '../../game-config';

export class DepthCounter {
  private depth: number;
  private countTimer: Phaser.Timer;

  constructor(game: Phaser.Game) {
    this.depth = 0;

    this.countTimer = new Phaser.Timer(game, false);
    game.time.add(this.countTimer);
  }

  start(): void {
    this.countTimer.loop(GameConfig.counters.depth.delay, () => {
      this.depth += 1;
    });

    this.countTimer.start();
  }

  getDepth(): number {
    return this.depth;
  }
}