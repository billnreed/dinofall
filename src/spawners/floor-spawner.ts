import { LevelConfig } from '../level-config';
import { FloorPool } from '../pools/floor-pool';

export class FloorSpawner {
  public onSpawn: Phaser.Signal;

  private game: Phaser.Game;
  private floorPool: FloorPool;
  private spawnTimer: Phaser.Timer;

  constructor(game: Phaser.Game, floorPool: FloorPool) {
    this.game = game;
    this.floorPool = floorPool;

    this.onSpawn = new Phaser.Signal();

    this.spawnTimer = new Phaser.Timer(game, false);
    game.time.add(this.spawnTimer);
  }

  public initPosition(): void {
    const floor = this.floorPool.getFirstAvailable();

    floor.reuse();
    floor.startMovement();
  }

  start(): void {
    this.spawnTimer.loop(LevelConfig.spawners.floor.delay, () => {
      const floor = this.floorPool.getFirstAvailable();

      floor.reuse();
      floor.startMovement();
    }, this);
    this.spawnTimer.start();
  }

  boost(boostDuration: number): void {
    this.pause();

    const originalFloorMoveSpeed = LevelConfig.entities.floor.moveSpeed;
    const floorBoostSpeedTween = this.game.add.tween(LevelConfig.entities.floor);
    floorBoostSpeedTween.to({
      moveSpeed: originalFloorMoveSpeed * 4,
    }, boostDuration);
    floorBoostSpeedTween.onComplete.add(() => {
      LevelConfig.entities.floor.moveSpeed = originalFloorMoveSpeed;
      this.resume();
    });

    floorBoostSpeedTween.start();
  }

  pause(): void {
    this.spawnTimer.pause();
  }

  resume(): void {
    this.spawnTimer.resume();
  }
}