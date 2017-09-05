import { LevelStates } from './level-states';

export class LevelStateMachine {
  private currentState: LevelStates;

  constructor() {
    this.currentState = null;
  }

  public transitionTo(state: LevelStates) {
    this.currentState = state;
  }

  public getCurrentState(): LevelStates {
    return this.currentState;
  }
}