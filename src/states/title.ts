export class TitleState extends Phaser.State {
  public create(): void {
    this.stage.backgroundColor = 0x107852;

    this.configureForMobile();
    this.makeGui();
    this.addStartListener();
  }

  private configureForMobile(): void {
    this.input.maxPointers = 1;
  }

  private makeGui() {
    const titleTextPosition: Phaser.Point = new Phaser.Point(this.game.width / 2, this.game.height / 4);
    this.addText(titleTextPosition, 'DinoFall', {
      fill: '#fff',
      fontSize: 60,
    });

    const startTextPosition: Phaser.Point = new Phaser.Point(this.game.width / 2, this.game.height / 2);
    this.addText(startTextPosition, 'Press anywhere to start', {
      fill: '#fff',
      fontSize: 48,
    });
  }

  private addText(position: Phaser.Point, text: string, style: Phaser.PhaserTextStyle): void {
    const gameText: Phaser.Text = this.game.add.text(position.x, position.y, text, style);
    gameText.anchor.set(0.5, 0.5);
  }

  private addStartListener():void {
    this.input.onDown.add(() => {
      this.state.start('level');
    });
  }
}
