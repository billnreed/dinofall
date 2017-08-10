import { Floor } from '../entities/floor';

export class FloorPool extends Phaser.Group {
  constructor(game: Phaser.Game) {
    super(game);
  }

  public createFloors(): void {
    const spaceBetweenFloors: number = this.game.world.height * 0.2;

    const numberOfFloors: number = Math.floor(this.game.world.height / (Floor.HEIGHT + spaceBetweenFloors));
    for (let i = 0; i < numberOfFloors; i++) {
      this.add(new Floor(this.game));
    }

    this.forEach((floor: Floor) => {
      floor.onExitWorld.add(this.recycleFloor, this);
    }, this);
  }

  public initiallyPositionFloors(): void {
    const floorSpacing: number = this.game.world.height / this.length;

    let index = 0;
    this.forEach((floor: Floor) => {
      floor.initiallyPositionAt(this.game.world.centerX, (index++ * floorSpacing) + Floor.HEIGHT);
    }, this);
  }

  public startMovement(): void {
    this.forEach((floor: Floor) => {
      floor.startMovement();
    }, this);
  }

  private recycleFloor(floor: Floor): void {
    floor.recycle();
    floor.reuse();
  }
}