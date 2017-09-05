// import { LevelConfig } from '../level-config';
import { LevelStates } from '../level-states';
import { LevelStateMachine } from '../level-state-machine';
import { FloorPool } from '../pools/floor-pool';
import { DepthCounter } from '../gui/counters/depth-counter';

export class FloorSpawner {
  private game: Phaser.Game;
  private levelStateMachine: LevelStateMachine;

  private floorPool: FloorPool;
  private depthCounter: DepthCounter;

  constructor(game: Phaser.Game, levelStateMachine: LevelStateMachine, floorPool: FloorPool, depthCounter: DepthCounter) {
    this.game = game;
    this.levelStateMachine = levelStateMachine;

    this.floorPool = floorPool;
    this.depthCounter = depthCounter;
  }

  public start(): void {
    this.depthCounter.addDepthListener(1, this.spawnFloor, this);
    this.depthCounter.addRecurringListener(20, this.spawnFloor, this);
  }

  private spawnFloor(): void {
    console.log('spawn floor');
    if (this.levelStateMachine.getCurrentState() === LevelStates.FALLING) {
      const floor = this.floorPool.getFirstAvailable();

      floor.reuse();
    }
  }
}
