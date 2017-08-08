import { Floor } from '../entities/floor';

export class Floors extends Phaser.Group {
  constructor(game: Phaser.Game) {
    super(game);
  }

  public createEntities(): void {
    const spaceBetweenFloors: number = this.game.world.height * 0.2;

    const numberOfFloors: number = Math.floor(this.game.world.height / (Floor.HEIGHT + spaceBetweenFloors));
    for (let i = 0; i < numberOfFloors; i++) {
      const floor: Floor = Floor.newWithRandomGap(this.game);
      this.add(floor);
    }
  }

  public positionEntities(): void {
    const floorSpacing: number = this.game.world.height / this.length;

    let index = 0;
    this.forEach((floor: Floor) => {
      floor.centerX = this.game.world.centerX;
      floor.centerY = index * floorSpacing;
      index++;
    }, this);
  }

  public startMovement(): void {
    this.forEach((floor: Floor) => {
      floor.startMovement();
    }, this);
  }
}