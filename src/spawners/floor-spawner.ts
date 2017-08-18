import { GameConfig } from '../game-config';
import { FloorPool } from '../pools/floor-pool';

export class FloorSpawner {
  public onSpawn: Phaser.Signal;

  private spawnTimer: Phaser.Timer;
  private floorPool: FloorPool;

  constructor(game: Phaser.Game, floorPool: FloorPool) {
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

  start() {
    this.spawnTimer.loop(GameConfig.spawners.floor.delay, () => {
      const floor = this.floorPool.getFirstAvailable();

      floor.reuse();
      floor.startMovement();
    }, this);
    this.spawnTimer.start();
  }
}