import { DinosaurFrames } from '../types/dinosaur-frames';

export class Dinosaur extends Phaser.Sprite {

  private FRAMES: DinosaurFrames = {
    FACE_LEFT: 0,
    FACE_RIGHT: 1,
  };

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
    this.frame = this.FRAMES.FACE_LEFT;
    this.body.velocity.x = -500;
  }

  public goRight():void {
    this.frame = this.FRAMES.FACE_RIGHT;
    this.body.velocity.x = 500;
  }
}