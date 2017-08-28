import { GameConfig } from '../game-config';

export class Floor extends Phaser.Group {

  public static HEIGHT: number = 64;
  public static TILE_WIDTH: number = 64;

  public onExitWorld: Phaser.Signal;
  public body: Phaser.Physics.Arcade.Body;

  private isMoving: boolean;

  constructor(game: Phaser.Game) {
    super(game);

    this.onExitWorld = new Phaser.Signal();
    this.isMoving = false;

    const necessaryTiles = Math.ceil(this.game.width / Floor.TILE_WIDTH);
    this.createMultiple(necessaryTiles, 'ground', 0, true);
    this.align(-1, 1, 64, 64);

    this.setAll('exists', false);
  }

  public update(): void {
    if (this.isMoving) {
      this.setAll('body.velocity.y', -1 * GameConfig.entities.floor.moveSpeed);
    }

    if (this.bottom < 0) {
      this.onExitWorld.dispatch(this);
    }
  }

  public initPhysics(): void {
    this.setAll('body.immovable', true);
  }

  public startMovement(): void {
    this.isMoving = true;
  }

  public recycle(): void {
    this.setAll('exists', false);
  }

  public reuse(): void {
    this.setAll('exists', true);
    this.setRandomGap();

    this.setAll('y', 0);
    this.y = this.game.world.height;
  }

  public doesNotExist(): boolean {
    return this.checkAll('exists', false);
  }

  private setRandomGap(): void {
    const width = 0.2;
    const start = this.game.rnd.integerInRange(1, 7) / 10;
    const end = start + width;

    const startIndex = Math.floor((this.game.world.width * start) / Floor.TILE_WIDTH);
    const endIndex = Math.floor((this.game.world.width * end) / Floor.TILE_WIDTH);

    this.filter((floorTile: Phaser.Sprite, index: number) => {
      if (index >= startIndex && index <= endIndex) {
        floorTile.visible = false;
        floorTile.exists = false;
      }
    });
  }
}