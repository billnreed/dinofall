import { Floor } from '../entities/floor';

export class GameState extends Phaser.State {
  public preload(): void {
    this.game.load.image('ground', 'assets/abstract-platformer/PNG/Tiles/Brown tiles/tileBrown_02.png');
    this.game.load.spritesheet('dinosaur', 'assets/characters/dino_walk_normal.bmp', 32, 32);
  }

  public create(): void {
    const floor: Floor = new Floor(this.game);

    const dinosaur: Phaser.Sprite = this.game.add.sprite(this.world.centerX, this.world.centerY - 100, 'dinosaur');
    dinosaur.anchor.setTo(0.5, 0.5);
    dinosaur.scale.setTo(2, 2);

    this.game.add.existing(floor);

    floor.centerX = this.game.width / 2;
    floor.centerY = this.game.height / 2;
  }
}
