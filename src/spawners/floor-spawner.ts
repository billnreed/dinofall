import { FloorPool } from '../pools/floor-pool';

export class FloorSpawner {
  private static SPAWN_DELAY = 5000;

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
    this.spawnTimer.loop(FloorSpawner.SPAWN_DELAY, () => {
      const floor = this.floorPool.getFirstAvailable();

      floor.reuse();
      floor.startMovement();
    }, this);
    this.spawnTimer.start();
  }
}