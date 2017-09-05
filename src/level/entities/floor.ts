import { LevelConfig } from '../level-config';

export class Floor extends Phaser.Group {

  public static HEIGHT: number = 64;
  public static TILE_WIDTH: number = 64;

  public onExitWorld: Phaser.Signal;
  public body: Phaser.Physics.Arcade.Body;

  private isActive: boolean;

  constructor(game: Phaser.Game) {
    super(game);

    this.onExitWorld = new Phaser.Signal();

    const necessaryTiles = Math.ceil(this.game.width / Floor.TILE_WIDTH);
    this.createMultiple(necessaryTiles, 'ground', 0, true);
    this.align(-1, 1, 64, 64);

    this.isActive = false;
  }

  public update(): void {
    if (this.isActive) {
      this.children.forEach((floorTile: Phaser.Sprite) => {
        floorTile.body.velocity.y = -1 * LevelConfig.speed;
      });
    }

    if (this.bottom < 0) {
      this.onExitWorld.dispatch(this);
    }
  }

  public initPhysics(): void {
    this.setAll('body.immovable', true);
    this.recycle();
  }

  public recycle(): void {
    this.isActive = false;

    this.setAll('visible', false);

    this.setAll('body.velocity.y', 0);
  }

  public reuse(): void {
    this.isActive = true;

    this.setAll('visible', true);
    this.align(-1, 1, 64, 64);
    this.y = this.game.world.height;

    this.setRandomGap();
  }

  public isAvailable(): boolean {
    return !this.isActive;
  }

  private setRandomGap(): void {
    const width = 0.2;
    const start = this.game.rnd.integerInRange(1, 7) / 10;
    const end = start + width;

    const startIndex = Math.floor((this.game.world.width * start) / Floor.TILE_WIDTH);
    const endIndex = Math.floor((this.game.world.width * end) / Floor.TILE_WIDTH);

    this.children.forEach((floorTile: Phaser.Sprite, index: number) => {
      if (index >= startIndex && index <= endIndex) {
        floorTile;
        floorTile.visible = false;
      }
    });
  }
}