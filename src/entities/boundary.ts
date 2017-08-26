export class Boundary extends Phaser.Sprite {
  constructor(game: Phaser.Game, side: number) {
    super(game, 0, 0);

    switch (side) {
      case Phaser.LEFT:
        this.x = 0;
        this.y = 0;
        this.height = this.game.height;
        this.width = 1;
        break;
      case Phaser.RIGHT:
        this.x = this.game.width;
        this.y = 0;
        this.height = this.game.height;
        this.width = 1;
        break;
      case Phaser.UP:
        this.x = 0;
        this.y = 0;
        this.height = 1;
        this.width = this.game.width;
        break;
    }
  }

  initPhysics() {
    this.body.immovable = true;
  }
}