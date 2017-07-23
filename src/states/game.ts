export class GameState extends Phaser.State {
  public create(): void {
    const titleTextPosition: Phaser.Point = new Phaser.Point(this.game.width / 2, this.game.height / 4);
    this.game.add.text(titleTextPosition.x, titleTextPosition.y, 'game', { fill: '#fff' });
  }
}
