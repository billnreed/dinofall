import 'p2';
import 'pixi';
import 'phaser';

import { TitleState } from './states/title';
import { LevelState } from './states/level';

export class Game extends Phaser.Game {
  constructor(config: Phaser.IGameConfig) {
    super(config);

    this.state.add('title', TitleState);
    this.state.add('level', LevelState);
    this.state.start('title');
  }
}
