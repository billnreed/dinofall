export default class Title extends Phaser.State {
  public create(): void {
    this.stage.backgroundColor = 0xBEEFED;
    this.game.add.text(30, 30, 'Hello World', null);
  }
}
