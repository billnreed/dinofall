import 'p2';
import 'pixi';
import 'phaser';

// import Boot from './states/boot';
// import Preloader from './states/preloader';
import Title from './states/title';

class App extends Phaser.Game {
    constructor(config: Phaser.IGameConfig) {
        super (config);

        // this.state.add('boot', Boot);
        // this.state.add('preloader', Preloader);
        this.state.add('title', Title);

        this.state.start('title');
    }
}

function startApp(): void {
    const gameWidth: number = 640;
    const gameHeight: number = 480;

    // There are a few more options you can set if needed, just take a look at Phaser.IGameConfig
    const gameConfig: Phaser.IGameConfig = {
        width: gameWidth,
        height: gameHeight,
        renderer: Phaser.AUTO,
        parent: '',
        resolution: 1
    };

    new App(gameConfig);
}

window.onload = () => {
  startApp();
};
