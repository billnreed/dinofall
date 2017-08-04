import { Floor } from '../entities/floor';

export class Floors extends Phaser.Group {
  constructor(game: Phaser.Game) {
    super(game);
  }

  createEntities(): void {
    const spaceBetweenFloors: number = this.game.world.height * 0.2;
    const floorHeight: number = 64;

    const numberOfFloors: number = Math.floor(this.game.world.height / (floorHeight + spaceBetweenFloors));
    for (let i = 0; i < numberOfFloors; i++) {
      const floor: Floor = new Floor(this.game);
      this.add(floor);
    }
  }

  positionEntities(): void {
    const floorSpacing: number = this.game.world.height / this.length;

    let index = 0;
    this.forEach((floor: Floor) => {
      floor.centerX = this.game.world.centerX;
      floor.centerY = index * floorSpacing;
      console.log(index * floorSpacing);
      index++;
    }, this);
  }

  startMovement(): void {
    this.forEach((floor: Floor) => {
      floor.startMovement();
    }, this);
  }
}