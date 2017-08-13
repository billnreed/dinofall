import { FloorPool } from '../pools/floor-pool';

export class FloorSpawner {
  public onSpawn: Phaser.Signal;

  private floorPool: FloorPool;

  constructor(floorPool: FloorPool) {
    this.floorPool = floorPool;
    this.onSpawn = new Phaser.Signal();
  }

  public initPosition(): void {
    const floor = this.floorPool.getFirstNotExists();

    floor.reuse();
    floor.startMovement();
  }

  start() {}
}