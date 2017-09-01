import { LevelStateCounters } from '../level/types/level/counters';
import { LevelStateEntities } from '../level/types/level/entities';
import { LevelStatePools } from '../level/types/level/pools';
import { LevelStateSpawners } from '../level/types/level/spawners';
import { LevelStateBoundaries } from '../level/types/level/boundaries';
import { LevelStateGui } from '../level/types/level/gui';

import { DepthCounter } from '../level/gui/counters/depth-counter';
import { Dinosaur } from '../level/entities/dinosaur';
import { FloorPool } from '../level/pools/floor-pool';
import { FloorSpawner } from '../level/spawners/floor-spawner';
import { Boundary } from '../level/entities/boundary';
import { DepthText } from '../level/gui/text/depth-text';

export class LevelCreator {
  private game: Phaser.Game;

  constructor(game: Phaser.Game) {
    this.game = game;
  }

  public createCounters(): LevelStateCounters {
    const depth = new DepthCounter(this.game);

    return {
      depth,
    };
  }

  public createEntities(): LevelStateEntities {
    const dinosaur: Dinosaur = new Dinosaur(this.game);

    return {
      dinosaur,
    };
  }

  public createPools(): LevelStatePools {
    const floorPool: FloorPool = new FloorPool(this.game);
    floorPool.createFloors();

    return {
      floorPool,
    };
  }

  public createSpawners(floorPool: FloorPool): LevelStateSpawners {
    const floorSpawner: FloorSpawner = new FloorSpawner(this.game, floorPool);

    return {
      floorSpawner,
    };
  }

  public createBoundaries(): LevelStateBoundaries {
    const left = new Boundary(this.game, Phaser.LEFT);
    const right = new Boundary(this.game, Phaser.RIGHT);
    const top = new Boundary(this.game, Phaser.UP);
    const bottom = new Boundary(this.game, Phaser.DOWN);

    return {
      left,
      right,
      top,
      bottom,
    };
  }

  public createGui(depthCounter: DepthCounter): LevelStateGui {
    const depthText = new DepthText(this.game, depthCounter);

    return {
      depthText,
    };
  }

}