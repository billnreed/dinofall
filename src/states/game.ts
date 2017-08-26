import { GameStateEntities } from '../types/states/game/entities';
import { GameStateSpawners } from '../types/states/game/spawners';
import { GameStatePools } from '../types/states/game/pools';
import { GameStateBoundaries } from '../types/states/game/boundaries';

import { FloorSpawner } from '../spawners/floor-spawner';
import { FloorPool } from '../pools/floor-pool';
import { Floor } from '../entities/floor';
import { Dinosaur } from '../entities/dinosaur';
import { Boundary } from '../entities/boundary';

export class GameState extends Phaser.State {
  private entities: GameStateEntities;
  private spawners: GameStateSpawners;
  private pools: GameStatePools;
  private boundaries: GameStateBoundaries;

  public preload(): void {
    this.game.load.image('ground', 'assets/abstract-platformer/PNG/Tiles/Brown tiles/tileBrown_02.png');
    this.game.load.spritesheet('dinosaur', 'assets/characters/dinosaur-spritesheet.png', 93, 128);
  }

  public create(): void {
    this.entities = this.createEntities();
    this.pools = this.createPools();
    this.spawners = this.createSpawners();
    this.boundaries = this.createBoundaries();

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

    this.physics.arcade.collide(this.entities.dinosaur, this.boundaries.left);
    this.physics.arcade.collide(this.entities.dinosaur, this.boundaries.right);
    this.physics.arcade.collide(this.entities.dinosaur, this.boundaries.top, () => {
      this.game.state.start('title');
    });
  }

  private createEntities(): GameStateEntities {
    const dinosaur: Dinosaur = new Dinosaur(this.game);

    return {
      dinosaur,
    };
  }

  private createPools(): GameStatePools {
    const floorPool: FloorPool = new FloorPool(this.game);
    floorPool.createFloors();

    return {
      floorPool,
    };
  }

  private createSpawners(): GameStateSpawners {
    const floorSpawner: FloorSpawner = new FloorSpawner(this.game, this.pools.floorPool);

    return {
      floorSpawner,
    };
  }

  private createBoundaries(): GameStateBoundaries {
    const left = new Boundary(this.game, Phaser.LEFT);
    const right = new Boundary(this.game, Phaser.RIGHT);
    const top = new Boundary(this.game, Phaser.UP);

    return {
      left,
      right,
      top,
    };
  }

  private enablePhysics(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.physics.enable(this.entities.dinosaur);

    this.pools.floorPool.enablePhysics();

    this.physics.enable(this.boundaries.left);
    this.physics.enable(this.boundaries.right);
    this.physics.enable(this.boundaries.top);
    this.boundaries.left.initPhysics();
    this.boundaries.right.initPhysics();
    this.boundaries.top.initPhysics();
  }

  private addEntities(): void {
    this.game.add.existing(this.entities.dinosaur);
    this.game.add.existing(this.pools.floorPool);
    this.game.add.existing(this.boundaries.left);
    this.game.add.existing(this.boundaries.right);
    this.game.add.existing(this.boundaries.top);
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
