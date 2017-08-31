import { LevelConfig } from '../level-config';
import { DinosaurFrames } from '../types/entities/dinosaur/dinosaur-frames';

export class Dinosaur extends Phaser.Sprite {

  private FRAMES: DinosaurFrames = {
    FACE_LEFT: 0,
    FACE_RIGHT: 1,
  };

  private direction: number;
  private isBoosting: boolean;

  constructor(game: Phaser.Game) {
    super(game, 0, 0, 'dinosaur');

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(2, 2);
    this.height = 128;
    this.width = 93;

    this.isBoosting = false;
  }

  public update(): void {
    if (this.isBoosting) {
      this.body.velocity.y = 0;
    } else if (!this.body.blocked.down) {
      this.body.velocity.y = LevelConfig.entities.dinosaur.fallSpeed;
    }

    if (this.direction === Phaser.LEFT && !this.body.blocked.left) {
      this.body.velocity.x = -1 * LevelConfig.entities.dinosaur.moveSpeed;
    } else if (this.direction === Phaser.RIGHT && !this.body.blocked.right) {
      this.body.velocity.x = LevelConfig.entities.dinosaur.moveSpeed;
    }
  }

  public enterBoostMode(): void {
    this.isBoosting = true;
  }

  public exitBoostMode(): void {
    this.isBoosting = false;
  }

  public goLeft():void {
    this.frame = this.FRAMES.FACE_LEFT;
    this.direction = Phaser.LEFT;
    this.body.velocity.x = -1 * LevelConfig.entities.dinosaur.moveSpeed;
  }

  public goRight():void {
    this.frame = this.FRAMES.FACE_RIGHT;
    this.direction = Phaser.RIGHT;
    this.body.velocity.x = LevelConfig.entities.dinosaur.moveSpeed;
  }
}