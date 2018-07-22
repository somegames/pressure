import Die from '/pressure/src/die';

class CrewMember extends Phaser.GameObjects.Sprite {
  constructor(scene, spriteCfg, statsCfg) {
    super(scene, spriteCfg.x, spriteCfg.y, spriteCfg.key);

    // drag stuff
    this.location = 'unassigned';

    this.setInteractive();
    scene.input.setDraggable(this);

    // tint stuff
    this.on('pointerover', () => {
      this.setTint(0x00ff00);
    });

    this.on('pointerout', () => {
      this.clearTint();
    });

    // stats stuff - BIG TODO
    this.stats = statsCfg;

    // TESTING DUMMY dice pool for testing events handling
    let dummyDieCfg = { type: 'tech',
                        quality: 'expert',
                      }
    this.dicePool = [dummyDieCfg];
  }


}
export default CrewMember;
