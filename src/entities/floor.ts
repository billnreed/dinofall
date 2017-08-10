export class Floor extends Phaser.Group {

  public static HEIGHT: number = 64;
  public static TILE_WIDTH: number = 64;

  public onExitWorld: Phaser.Signal;
  public body: Phaser.Physics.Arcade.Body;

  constructor(game: Phaser.Game) {
    super(game);

    this.onExitWorld = new Phaser.Signal();

    const tileWidth: number = 64;
    const necessaryTiles = Math.ceil(this.game.width / tileWidth);
    this.createMultiple(necessaryTiles, 'ground', 0, true);
    this.align(-1, 1, 64, 64);
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
    this.setRandomGap();

    this.setAll('body.y', this.game.world.height);
  }

  private setRandomGap(): void {
    const width = 0.2;
    const start = this.game.rnd.integerInRange(1, 7) / 10;
    const end = start + width;

    const startIndex: number = Math.floor((this.game.world.width * start) / Floor.TILE_WIDTH);
    const endIndex: number = Math.floor((this.game.world.width * end) / Floor.TILE_WIDTH);

    this.filter((floorTile: Phaser.Sprite, index: number) => {
      if (index >= startIndex && index <= endIndex) {
        floorTile.visible = false;
        floorTile.exists = false;
      }
    });
  }
}