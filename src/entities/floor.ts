export class Floor extends Phaser.Group {

  public static HEIGHT: number = 64;

  public onExitWorld: Phaser.Signal;
  public body: Phaser.Physics.Arcade.Body;

  constructor(game: Phaser.Game) {
    super(game);

    this.onExitWorld = new Phaser.Signal();

    const tileWidth: number = 64;
    const necessaryTiles = Math.ceil(this.game.width / tileWidth);
    this.createMultiple(necessaryTiles, 'ground', 0, true);
    this.align(-1, 1, 64, 64);

    // const startIndex: number = Math.floor((this.game.world.width * emptyZone.start) / tileWidth);
    // const endIndex: number = Math.floor((this.game.world.width * emptyZone.end) / tileWidth);
    // this.removeBetween(startIndex, endIndex, true);
  }

  public update(): void {
    if (this.bottom < 0) {
      this.onExitWorld.dispatch(this);
    }
  }

  public initPhysics(): void {
    this.setAll('body.immovable', true);
  }

  public initiallyPositionAt(x: number, y: number): void {
    this.centerX = x;
    this.y = y;
  }

  public startMovement(): void {
    this.setAll('body.velocity.y', -100);
  }

  public recycle(): void {
    this.setAll('visible', false);
    this.setAll('exists', false);

    this.setAll('body.y', 0);
  }

  public reuse(): void {
    this.setAll('visible', true);
    this.setAll('exists', true);

    this.setAll('body.y', this.game.world.height);
  }
}