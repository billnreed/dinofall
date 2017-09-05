import { LevelConfig } from '../../level-config';

export class DepthCounter {
  public depth: number;

  private game: Phaser.Game;

  private countTimer: Phaser.Timer;
  private depthListeners: any[];
  private recurringListeners: any[];

  constructor(game: Phaser.Game) {
    this.depth = 0;
    this.depthListeners = [];
    this.recurringListeners = [];

    this.game = game;
  }

  public start(): void {
    this.countTimer = new Phaser.Timer(this.game, false);
    this.game.time.add(this.countTimer);

    this.countTimer.add(LevelConfig.counters.depth.delay, this.count, this);

    this.countTimer.start();
  }

  public addDepthListener(depth: number, callback: () => void, context?: any) {
    this.depthListeners[depth] = {
      at: depth,
      callback,
      context,
     };
  }

  public addRecurringListener(amount: number, callback: () => void, context?: any) {
    this.recurringListeners.push({
      at: this.depth + amount,
      amount,
      callback,
      context,
    });
  }

  public boost(duration: number) {
    const originalDepthDelay = LevelConfig.counters.depth.delay;
    const originalSpeedFactor = LevelConfig.counters.depth.speedFactor;

    const levelSpeedTween = this.game.add.tween(LevelConfig.counters.depth);
    levelSpeedTween.to({
      delay: originalDepthDelay / 4,
      speedFactor: originalSpeedFactor * 4,
    }, duration);
    levelSpeedTween.onComplete.add(() => {
      LevelConfig.counters.depth.delay = originalDepthDelay;
      LevelConfig.counters.depth.speedFactor = originalSpeedFactor;
    });

    levelSpeedTween.start();
  }

  private checkDepthListeners() {
    const listener = this.depthListeners[this.depth];
    if (listener != null) {
      listener.callback.call(listener.context);
      this.depthListeners[this.depth] = null;
    }
  }

  private checkRecurringListeners() {
    this.recurringListeners
      .filter(listener => listener.at === this.depth)
      .forEach(listener => {
        listener.callback.call(listener.context);
        listener.at = this.depth + listener.amount;
      });
  }

  private count(): void {
    this.depth += 1;
    this.countTimer.add(LevelConfig.counters.depth.delay, this.count, this);

    this.checkDepthListeners();
    this.checkRecurringListeners();
  }
}