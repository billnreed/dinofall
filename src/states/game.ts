import { GameStateEntities } from '../types/states/game/entities';
import { GameStateSpawners } from '../types/states/game/spawners';
import { GameStatePools } from '../types/states/game/pools';
import { GameStateBoundaries } from '../types/states/game/boundaries';
import { GameStateCounters } from '../types/states/game/counters';
import { GameStateGui } from '../types/states/game/gui';

import { FloorSpawner } from '../spawners/floor-spawner';
import { FloorPool } from '../pools/floor-pool';
import { Floor } from '../entities/floor';
import { Dinosaur } from '../entities/dinosaur';
import { Boundary } from '../entities/boundary';

import { DepthCounter } from '../gui/counters/depth-counter';
import { DepthText } from '../gui/text/depth-text';

export class GameState extends Phaser.State {
  private counters: GameStateCounters;
  private entities: GameStateEntities;
  private spawners: GameStateSpawners;
  private pools: GameStatePools;
  private boundaries: GameStateBoundaries;
  private gui: GameStateGui;

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
    this.pools.floorPool.forEach((floor: Floor) => {
      this.physics.arcade.collide(floor, this.entities.dinosaur);
    }, null);

    this.physics.arcade.collide(this.entities.dinosaur, this.boundaries.left);
    this.physics.arcade.collide(this.entities.dinosaur, this.boundaries.right);
    this.physics.arcade.collide(this.entities.dinosaur, this.boundaries.top, () => {
      this.game.state.start('title');
    });
    this.physics.arcade.overlap(this.entities.dinosaur, this.boundaries.bottom, () => {
      console.log('hit the bottom');
      // | stop collisions between dinosaur and platforms
      // | stop dinosaur falling & moving to side
      //  \
      //   | tween dinosaur to top      |\
      //   | scroll platforms real fast |-- these are all in a timed event together
      //   | count depth real fast      |/
      //  /
      // | make platforms scroll at correct speed
      // | make depth counter go at correct speed
      // | reenable dinosaur falling & movement
      // | reenable collisions between dinosaur and platforms
    });

    this.gui.depthText.updateDepthValue();
  }

  private createCounters(): GameStateCounters {
    const depth = new DepthCounter(this.game);

    return {
      depth,
    };
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

  private createSpawners(floorPool: FloorPool): GameStateSpawners {
    const floorSpawner: FloorSpawner = new FloorSpawner(this.game, floorPool);

    return {
      floorSpawner,
    };
  }

  private createBoundaries(): GameStateBoundaries {
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

  private createGui(depthCounter: DepthCounter): GameStateGui {
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
    this.counters.depth.start();
  }
}
