export class Floor extends Phaser.Group {
  constructor(game: Phaser.Game, emptyZone = { start: 0.5, end: 0.7}) {
    super(game);

    const tileWidth: number = 64;
    const necessaryTiles = Math.ceil(this.game.width / tileWidth);
    this.createMultiple(necessaryTiles, 'ground', 0, true);
    this.align(-1, 1, 64, 64);

    const startIndex: number = Math.floor((this.game.world.width * emptyZone.start) / tileWidth);
    const endIndex: number = Math.floor((this.game.world.width * emptyZone.end) / tileWidth);
    this.removeBetween(startIndex, endIndex, true);
  }

  public initPhysics(): void {
    this.setAll('body.immovable', true);
  }
}