import { GameConfig } from '../game-config';
import { Floor } from '../entities/floor';

export class FloorPool extends Phaser.Group {

  constructor(game: Phaser.Game) {
    super(game);
  }

  public createFloors(): void {
    for (let i = 0; i < GameConfig.pools.floor.size; i++) {
      const floor = new Floor(this.game);
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
}