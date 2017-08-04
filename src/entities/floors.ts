import { Floor } from '../entities/floor';

export class Floors extends Phaser.Group {
  constructor(game: Phaser.Game) {
    super(game);
  }

  startMovement(): void {
    this.forEach((floor: Floor) => {
      floor.startMovement();
    }, this);
  }
}