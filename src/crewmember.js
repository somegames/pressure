class CrewMember extends Phaser.GameObjects.Sprite {
  constructor(scene, spriteCfg, statsCfg) {
    super(scene, spriteCfg.x, spriteCfg.y, spriteCfg.key);

    // drag stuff
    this.originalX = spriteCfg.x;
    this.originalY = spriteCfg.y;

    this.setInteractive();
    scene.input.setDraggable(this);

    // tint stuff
    this.on('pointerover', () => {
      this.setTint(0x00ff00);
    });

    this.on('pointerout', () => {
      this.clearTint();
    });

    // stats stuff
    this.stats = statsCfg;
  }

  
}
export default CrewMember;
