import { LevelConfig } from '../level-config';
import { LevelStates } from '../state-machines/level-states';

import { DinosaurFrames } from '../types/entities/dinosaur/dinosaur-frames';

export class Dinosaur extends Phaser.Sprite {

  private FRAMES: DinosaurFrames = {
    FACE_LEFT: 0,
    FACE_RIGHT: 1,
  };

  private direction: number;
  private currentState: LevelStates;

  constructor(game: Phaser.Game) {
    super(game, 0, 0, 'dinosaur');

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(2, 2);
    this.height = 128;
    this.width = 93;

    this.currentState = LevelStates.FALLING;
  }

  public update(): void {
    switch(this.currentState) {
      case LevelStates.FALLING:
        this.updateFalling();
        break;
      case LevelStates.BOOSTING:
        this.updateBoosting();
        break;
    }
  }

  private updateFalling(): void {
    if (!this.body.blocked.down) {
      this.body.velocity.y = LevelConfig.entities.dinosaur.fallSpeed;
    }

    if (this.direction === Phaser.LEFT && !this.body.blocked.left) {
      this.body.velocity.x = -1 * LevelConfig.entities.dinosaur.moveSpeed;
    } else if (this.direction === Phaser.RIGHT && !this.body.blocked.right) {
      this.body.velocity.x = LevelConfig.entities.dinosaur.moveSpeed;
    }
  }

  private updateBoosting(): void {
    this.body.velocity.y = 0;
  }

  public boost(boostDuration: number, onFinishBoost: () => void): void {
    this.currentState = LevelStates.BOOSTING;

    const dinoBoostPositionTween = this.game.add.tween(this);
    dinoBoostPositionTween.to({
      x: this.x,
      y: 150,
    }, boostDuration);
    dinoBoostPositionTween.onComplete.add(() => {
      this.currentState = LevelStates.FALLING;
      onFinishBoost.call(null);
    });

    const dinoBoostScaleTween = this.game.add.tween(this.scale);
    dinoBoostScaleTween.to({
      x: this.scale.x * 2,
      y: this.scale.y * 2,
    }, boostDuration / 2).to({
      x: this.scale.x,
      y: this.scale.y,
    }, boostDuration / 2);

    dinoBoostPositionTween.start();
    dinoBoostScaleTween.start();
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