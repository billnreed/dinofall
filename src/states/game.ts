import { GameStateEntities } from '../types/game-state-entities';

import { Floor } from '../entities/floor';
import { Floors } from '../entities/floors';
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
    this.entities.floors.forEach((floor: Floor) => {
      this.physics.arcade.collide(floor, this.entities.dinosaur);
    }, null);
  }

  private createEntities(): GameStateEntities {
    const floor1: Floor = new Floor(this.game);
    const floor2: Floor = new Floor(this.game, { start: 0.1, end: 0.3 });
    const floors: Floors = new Floors(this.game);
    floors.add(floor1);
    floors.add(floor2);

    const dinosaur: Dinosaur = new Dinosaur(this.game);

    return {
      floors,
      dinosaur,
    };
  }

  private addEntities(): void {
    this.game.add.existing(this.entities.floors);
    this.game.add.existing(this.entities.dinosaur);
  }

  private positionEntities(): void {
    const floor1: Floor = this.entities.floors.getChildAt(0) as Floor;
    floor1.centerX = this.world.centerX;
    floor1.centerY = this.world.centerY;

    const floor2: Floor = this.entities.floors.getChildAt(1) as Floor;
    floor2.centerX = this.world.centerX;
    floor2.centerY = this.world.centerY + 300;

    this.entities.dinosaur.centerX = this.world.width - 200;
    this.entities.dinosaur.centerY = this.world.centerY - 200;
  }

  private enablePhysics(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.entities.floors.forEach((floor: Floor) => {
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
    this.entities.floors.startMovement();
  }
}
