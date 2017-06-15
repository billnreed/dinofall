export default class Preloader extends Phaser.State {
  public create(): void {
    this.game.state.start('title');
  }
}
