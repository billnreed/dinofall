import { LevelStateEntities } from '../level/types/level/entities';
import { LevelStateSpawners } from '../level/types/level/spawners';
import { LevelStatePools } from '../level/types/level/pools';
import { LevelStateBoundaries } from '../level/types/level/boundaries';
import { LevelStateCounters } from '../level/types/level/counters';
import { LevelStateGui } from '../level/types/level/gui';

import { FloorSpawner } from '../level/spawners/floor-spawner';
import { FloorPool } from '../level/pools/floor-pool';
import { Floor } from '../level/entities/floor';
import { Dinosaur } from '../level/entities/dinosaur';
import { Boundary } from '../level/entities/boundary';

import { DepthCounter } from '../level/gui/counters/depth-counter';
import { DepthText } from '../level/gui/text/depth-text';

import { LevelStates } from '../level/level-states';

export class LevelState extends Phaser.State {
  private counters: LevelStateCounters;
  private entities: LevelStateEntities;
  private spawners: LevelStateSpawners;
  private pools: LevelStatePools;
  private boundaries: LevelStateBoundaries;
  private gui: LevelStateGui;

  private currentState: LevelStates;

  public init(): void {
    this.currentState = LevelStates.FALLING;
  }

  public preload(): void {
    this.game.load.image('ground', 'assets/abstract-platformer/PNG/Tiles/Brown tiles/tileBrown_02.png');
    this.game.load.spritesheet('dinosaur', 'assets/characters/dinosaur-spritesheet.png', 93, 128);
    this.game.load.bitmapFont('gemFont', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
  }

  public create(): void {
    this.counters = this.createCounters();
    this.entities = this.createEntities();
    this.pools = this.createPools();
    this.spawners = this.createSpawners(this.pools.floorPool);
    this.boundaries = this.createBoundaries();
    this.gui = this.createGui(this.counters.depth);

    this.enablePhysics();

    this.addEntities();
    this.positionEntities();

    this.addGui();

    this.enableInput();

    this.start();
  }

  public update(): void {
    if (this.currentState === LevelStates.FALLING) {
      this.pools.floorPool.forEach((floor: Floor) => {
        this.physics.arcade.collide(floor, this.entities.dinosaur);
      }, null);

      this.physics.arcade.overlap(this.entities.dinosaur, this.boundaries.bottom, () => {
        this.currentState = LevelStates.BOOSTING;
        const boostDuration = 2000;

        this.entities.dinosaur.boost(boostDuration, () => { this.currentState = LevelStates.FALLING; });
        this.spawners.floorSpawner.boost(boostDuration);
      });

      this.physics.arcade.collide(this.entities.dinosaur, this.boundaries.top, () => {
        this.game.state.start('title');
      });
    }

    this.physics.arcade.collide(this.entities.dinosaur, this.boundaries.left);
    this.physics.arcade.collide(this.entities.dinosaur, this.boundaries.right);

    this.gui.depthText.updateDepthValue();
  }

  private createCounters(): LevelStateCounters {
    const depth = new DepthCounter(this.game);

    return {
      depth,
    };
  }

  private createEntities(): LevelStateEntities {
    const dinosaur: Dinosaur = new Dinosaur(this.game);

    return {
      dinosaur,
    };
  }

  private createPools(): LevelStatePools {
    const floorPool: FloorPool = new FloorPool(this.game);
    floorPool.createFloors();

    return {
      floorPool,
    };
  }

  private createSpawners(floorPool: FloorPool): LevelStateSpawners {
    const floorSpawner: FloorSpawner = new FloorSpawner(this.game, floorPool);

    return {
      floorSpawner,
    };
  }

  private createBoundaries(): LevelStateBoundaries {
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

  private createGui(depthCounter: DepthCounter): LevelStateGui {
    const depthText = new DepthText(this.game, depthCounter);

    return {
      depthText,
    };
  }

  private enablePhysics(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.physics.enable(this.entities.dinosaur);

    this.pools.floorPool.enablePhysics();

    this.physics.enable(this.boundaries.left);
    this.physics.enable(this.boundaries.right);
    this.physics.enable(this.boundaries.top);
    this.physics.enable(this.boundaries.bottom);
    this.boundaries.left.initPhysics();
    this.boundaries.right.initPhysics();
    this.boundaries.top.initPhysics();
    this.boundaries.bottom.initPhysics();
  }

  private addEntities(): void {
    this.game.add.existing(this.entities.dinosaur);
    this.game.add.existing(this.pools.floorPool);
    this.game.add.existing(this.boundaries.left);
    this.game.add.existing(this.boundaries.right);
    this.game.add.existing(this.boundaries.top);
    this.game.add.existing(this.boundaries.bottom);
  }

  private positionEntities(): void {
    this.spawners.floorSpawner.initPosition();

    this.entities.dinosaur.centerX = this.world.width - 200;
    this.entities.dinosaur.centerY = this.world.centerY - 200;
  }

  private addGui(): void {
    this.game.add.existing(this.gui.depthText);
  }

  private enableInput(): void {
    this.input.keyboard.addCallbacks(this, (e: KeyboardEvent) => {
      if (this.currentState === LevelStates.FALLING) {
        if (e.keyCode === Phaser.Keyboard.A || e.keyCode === Phaser.Keyboard.LEFT) {
          this.entities.dinosaur.goLeft();
        } else if (e.keyCode === Phaser.Keyboard.D || e.keyCode === Phaser.Keyboard.RIGHT) {
          this.entities.dinosaur.goRight();
        }
      }
    });

    this.input.onDown.add(() => {
      if (this.currentState === LevelStates.FALLING) {
        if (this.input.activePointer.x < this.world.centerX) {
          this.entities.dinosaur.goLeft();
        } else {
          this.entities.dinosaur.goRight();
        }
      }
    });
  }

  private start(): void {
    this.spawners.floorSpawner.start();
    this.counters.depth.start();
  }
}
