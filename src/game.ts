import 'p2';
import 'pixi';
import 'phaser';

import Title from './states/title';

export class Game extends Phaser.Game {
    constructor(config: Phaser.IGameConfig) {
        super (config);

        this.state.add('title', Title);
        this.state.start('title');
    }
}
