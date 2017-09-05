import { LevelConfig } from '../level-config';
import { Floor } from '../entities/floor';

export class FloorPool extends Phaser.Group {

  constructor(game: Phaser.Game) {
    super(game);
  }

  public createFloors(): void {
    for (let i = 0; i < LevelConfig.pools.floor.size; i++) {
      const floor = new Floor(this.game);
      this.add(floor);
    }

    this.forEach((floor: Floor) => {
      floor.onExitWorld.add(floor.recycle, floor);
    }, this);
  }

  public enablePhysics(): void {
    this.forEach((floor: Floor) => {
      this.game.physics.enable(floor);
      floor.initPhysics();
    }, this);
  }

  public getFirstAvailable(): Floor {
    const availableFloors = this.filter((floor: Floor) => floor.isAvailable(), false);
    if (availableFloors.total === 0) {
      throw 'All floors are unavailable, therefore they are all being used';
    } else {
      return availableFloors.first;
    }
  }
}