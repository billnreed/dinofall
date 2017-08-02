import { GameStateEntities } from '../types/game-state-entities';

import { Floor } from '../entities/floor';
// import { Floors } from '../entities/floors';
import { Dinosaur } from '../entities/dinosaur';

export class GameState extends Phaser.State {
  private entities: GameStateEntities;

  public preload(): void {
    this.game.load.image('ground', 'assets/abstract-platformer/PNG/Tiles/Brown tiles/tileBrown_02.png');
    this.game.load.spritesheet('dinosaur', 'assets/characters/dinosaur-spritesheet.png', 93, 128);
  }

  public create(): void {
    this.entities = this.createEntities();
    this.positionEntities();
    this.addEntities();
    this.enablePhysics();
    this.enableInput();
  }

  public update(): void {
    this.physics.arcade.collide(this.entities.floor1, this.entities.dinosaur);
    this.physics.arcade.collide(this.entities.floor2, this.entities.dinosaur);
  }

  private createEntities(): GameStateEntities {
    const floor1: Floor = new Floor(this.game);
    const floor2: Floor = new Floor(this.game, { start: 0.1, end: 0.3 });
    const dinosaur: Dinosaur = new Dinosaur(this.game);

    return {
      floor1: floor1,
      floor2: floor2,
      dinosaur,
    };
  }

  private positionEntities(): void {
    this.entities.floor1.centerX = this.world.centerX;
    this.entities.floor1.centerY = this.world.centerY;
    this.entities.floor2.centerX = this.world.centerX;
    this.entities.floor2.centerY = this.world.centerY + 300;

    this.entities.dinosaur.centerX = this.world.width - 200;
    this.entities.dinosaur.centerY = this.world.centerY - 200;
  }

  private addEntities(): void {
    this.game.add.existing(this.entities.floor1);
    this.game.add.existing(this.entities.floor2);
    this.game.add.existing(this.entities.dinosaur);
  }

  private enablePhysics(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.enable(this.entities.floor1);
    this.physics.enable(this.entities.floor2);
    this.physics.enable(this.entities.dinosaur);

    this.entities.floor1.initPhysics();
    this.entities.floor2.initPhysics();
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
}
