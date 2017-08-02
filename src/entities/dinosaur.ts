export class Dinosaur extends Phaser.Sprite {
  constructor(game: Phaser.Game) {
    super(game, 0, 0, 'dinosaur');

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(2, 2);
    this.height = 128;
    this.width = 93;
  }

  public update(): void {
    if (!this.body.blocked.down) {
      this.body.velocity.y = 500;
    }
  }

  public goLeft():void {
    this.body.velocity.x = -500;
  }

  public goRight():void {
    this.body.velocity.x = 500;
  }
}