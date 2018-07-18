class Die extends Phaser.GameObjects.Sprite {
  constructor(scene, spriteCfg, dieCfg) {
    super(scene, spriteCfg.x, spriteCfg.y, spriteCfg.key);
    this.event = 'eventId';
    this.character = 'characterId';
  }

  preload() {
    this.load.spritesheet('dice', 'assets/dice.png', {frameWidth: 33, frameHeight: 33});
  }

  create() {

  }

  displayDiceBg() {

  }
}

export default DiceScene;
