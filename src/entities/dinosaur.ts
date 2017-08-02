export class Dinosaur extends Phaser.Sprite {
  constructor(game: Phaser.Game) {
    super(game, 0, 0, 'dinosaur');

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(2, 2);
    this.height = 128;
    this.width = 93;
  }

  public initPhysics(): void {
    this.body.gravity.y = 50;
  }
}