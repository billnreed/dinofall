import { GameStateEntities } from '../types/game-state-entities';
import { GameStateSpawners } from '../types/game-state-spawners';
import { GameStatePools } from '../types/game-state-pools';

import { FloorSpawner } from '../spawners/floor-spawner';
import { FloorPool } from '../pools/floor-pool';
import { Floor } from '../entities/floor';
import { Dinosaur } from '../entities/dinosaur';

export class GameState extends Phaser.State {
  private entities: GameStateEntities;
  private spawners: GameStateSpawners;
  private pools: GameStatePools;

  public preload(): void {
    this.game.load.image('ground', 'assets/abstract-platformer/PNG/Tiles/Brown tiles/tileBrown_02.png');
    this.game.load.spritesheet('dinosaur', 'assets/characters/dinosaur-spritesheet.png', 93, 128);
  }

  public create(): void {
    this.entities = this.createEntities();
    this.pools = this.createPools();
    this.spawners = this.createSpawners();

    this.enablePhysics();

    this.addEntities();
    this.positionEntities();

    this.enableInput();

    this.start();
  }

  public update(): void {
    this.pools.floorPool.forEach((floor: Floor) => {
      this.physics.arcade.collide(floor, this.entities.dinosaur);
    }, null);
  }

  private createEntities(): GameStateEntities {
    const dinosaur: Dinosaur = new Dinosaur(this.game);

    return {
      dinosaur,
    };
  }

  private createSpawners(): GameStateSpawners {
    const floorSpawner: FloorSpawner = new FloorSpawner(this.game, this.pools.floorPool);

    return {
      floorSpawner,
    };
  }

  private createPools(): GameStatePools {
    const floorPool: FloorPool = new FloorPool(this.game);
    floorPool.createFloors();

    return {
      floorPool,
    };
  }

  private enablePhysics(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.physics.enable(this.entities.dinosaur);
    this.pools.floorPool.enablePhysics();
  }

  private addEntities(): void {
    this.game.add.existing(this.entities.dinosaur);
    this.game.add.existing(this.pools.floorPool);
  }

  private positionEntities(): void {
    this.spawners.floorSpawner.initPosition();

    this.entities.dinosaur.centerX = this.world.width - 200;
    this.entities.dinosaur.centerY = this.world.centerY - 200;
  }

  private enableInput(): void {
    this.input.onDown.add(() => {
      if (this.input.activePointer.x < this.world.centerX) {
        this.entities.dinosaur.goLeft();
      } else {
        this.entities.dinosaur.goRight();
      }
    });
  }

  private start(): void {
    this.spawners.floorSpawner.start();
  }
}
