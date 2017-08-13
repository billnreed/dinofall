import { Floor } from '../entities/floor';

export class FloorPool extends Phaser.Group {

  private static POOL_SIZE = 10;

  constructor(game: Phaser.Game) {
    super(game);
  }

  public createFloors(): void {
    for (let i = 0; i < FloorPool.POOL_SIZE; i++) {
      const floor = new Floor(this.game);
      floor.recycle();
      this.add(floor);
    }

    this.forEach((floor: Floor) => {
      floor.onExitWorld.add(this.recycleFloor, this);
    }, this);
  }

  public enablePhysics(): void {
    this.forEach((floor: Floor) => {
      this.game.physics.enable(floor);
      floor.initPhysics();
    }, this);
  }

  private recycleFloor(floor: Floor): void {
    floor.recycle();
  }

  public getFirstAvailable(): Floor {
    const notExistingFloors = this.filter((floor: Floor) => floor.doesNotExist(), false);
    if (notExistingFloors.total === 0) {
      throw 'All floors exist, therefore they are all being used';
    } else {
      return notExistingFloors.first;
    }
  }

  /*
  public initiallyPositionFloors(): void {
    const floorSpacing: number = this.game.world.height / this.length;

    let index = 0;
    this.forEach((floor: Floor) => {
      floor.initiallyPositionAt(this.game.world.centerX, (index++ * floorSpacing) + Floor.HEIGHT);
    }, this);
  }
  */

  /*
  public startMovement(): void {
    this.forEach((floor: Floor) => {
      floor.startMovement();
    }, this);
  }
  */
}