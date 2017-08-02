import { Floor } from '../entities/floor';
import { Dinosaur } from '../entities/dinosaur';

export class GameState extends Phaser.State {
  public preload(): void {
    this.game.load.image('ground', 'assets/abstract-platformer/PNG/Tiles/Brown tiles/tileBrown_02.png');
    this.game.load.image('dinosaur', 'assets/characters/dinosaur.png');
  }

  public create(): void {
    const floor: Floor = new Floor(this.game);

    const dinosaur: Dinosaur = new Dinosaur(this.game, this.world.centerX, this.world.centerY - 100);

    this.game.add.existing(floor);
    this.game.add.existing(dinosaur);

    floor.centerX = this.world.centerX;
    floor.centerY = this.world.centerY;
  }
}
