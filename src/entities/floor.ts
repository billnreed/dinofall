export class Floor extends Phaser.Group {
  constructor(game: Phaser.Game) {
    super(game);

    const tileWidth: number = 64;
    const necessaryTiles = Math.ceil(this.game.width / tileWidth);
    this.createMultiple(necessaryTiles, 'ground', 0, true);
    this.align(-1, 1, 64, 64);

    this.removeBetween(this.length / 2 - 1, this.length / 2 + 1, true);
  }

  public initPhysics(): void {
    this.setAll('body.immovable', true);
  }
}