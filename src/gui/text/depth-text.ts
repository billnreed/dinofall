import { DepthCounter } from '../counters/depth-counter';

export class DepthText extends Phaser.BitmapText {
  private depthCounter: DepthCounter;

  constructor(game: Phaser.Game, depthCounter: DepthCounter) {
    super(game, 0, 0, 'gemFont', '', 64);

    this.depthCounter = depthCounter;
  }

  updateDepthValue(): void {
    this.text = `Depth: ${this.depthCounter.getDepth()}`;
  }
}