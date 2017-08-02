import { Floor } from '../entities/floor';
import { Dinosaur } from '../entities/dinosaur';

export class GameState extends Phaser.State {
  private entities: any = {};

  public preload(): void {
    this.game.load.image('ground', 'assets/abstract-platformer/PNG/Tiles/Brown tiles/tileBrown_02.png');
    this.game.load.image('dinosaur', 'assets/characters/dinosaur.png');
  }

  public create(): void {
    this.entities = this.createEntities();
    this.positionEntities();
    this.addEntities();
    this.enablePhysics();
  }

  public update(): void {
    this.physics.arcade.collide(this.entities.floor, this.entities.dinosaur);
  }

  private createEntities(): any {
    const floor: Floor = new Floor(this.game);
    const dinosaur: Dinosaur = new Dinosaur(this.game);

    return {
      floor,
      dinosaur,
    };
  }

  private positionEntities(): void {
    this.entities.floor.centerX = this.world.centerX;
    this.entities.floor.centerY = this.world.centerY;

    this.entities.dinosaur.centerX = this.world.centerX;
    this.entities.dinosaur.centerY = this.world.centerY - 200;
  }

  private addEntities(): void {
    this.game.add.existing(this.entities.floor);
    this.game.add.existing(this.entities.dinosaur);
  }

  private enablePhysics(): void {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.enable(this.entities.dinosaur);
    this.physics.enable(this.entities.floor);

    this.entities.dinosaur.initPhysics();
    this.entities.floor.initPhysics();
  }
}