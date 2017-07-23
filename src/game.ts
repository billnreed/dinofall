import 'p2';
import 'pixi';
import 'phaser';

import { TitleState } from './states/title';
import { GameState } from './states/game';

export class Game extends Phaser.Game {
  constructor(config: Phaser.IGameConfig) {
    super(config);

    this.state.add('title', TitleState);
    this.state.add('game', GameState);
    this.state.start('title');
  }
}
