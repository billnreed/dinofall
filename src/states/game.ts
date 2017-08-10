import { GameStateEntities } from '../types/game-state-entities';

import { Floor } from '../entities/floor';
import { FloorPool } from '../pools/floor-pool';
import { Dinosaur } from '../entities/dinosaur';

export class GameState extends Phaser.State {
  private entities: GameStateEntities;

  public preload(): void {
    this.game.load.image('ground', 'assets/abstract-platformer/PNG/Tiles/Brown tiles/tileBrown_02.png');
    this.game.load.spritesheet('dinosaur', 'assets/characters/dinosaur-spritesheet.png', 93, 128);
  }

  public create(): void {
    this.entities = this.createEntities();

    this.addEntities();
    this.positionEntities();

    this.enablePhysics();
    this.enableInput();

    this.startMovement();
  }

  public update(): void {
    this.entities.floorPool.forEach((floor: Floor) => {
      this.physics.arcade.collide(floor, this.entities.dinosaur);
    }, null);
  }

  private createEntities(): GameStateEntities {
    const dinosaur: Dinosaur = new Dinosaur(this.game);
    const floorPool: FloorPool = new FloorPool(this.game);
    floorPool.createFloors();

    return {
      dinosaur,
      floorPool,
    };
  }

  private addEntities(): void {
    this.game.add.existing(this.entities.floorPool);
    this.game.add.existing(this.entities.dinosaur);
  }

  private positionEntities(): void {
    this.entities.floorPool.initiallyPositionFloors();

    this.entities.dinosaur.centerX = this.world.width - 200;
    this.entities.dinosaur.centerY = this.world.centerY - 200;
  }

  private enablePhysics(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.entities.floorPool.forEach((floor: Floor) => {
      this.physics.enable(floor);
      floor.initPhysics();
    }, this);

    this.physics.enable(this.entities.dinosaur);
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

  private startMovement(): void {
    this.entities.floorPool.startMovement();
  }
}
