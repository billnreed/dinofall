export class Dinosaur extends Phaser.Sprite {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'dinosaur');

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(2, 2);
    this.height = 128;
    this.width = 93;
  }
}