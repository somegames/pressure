class Room extends Phaser.GameObjects.Sprite {
  constructor(scene, spriteCfg, roomCfg) {
    // TODO: different sprites for different rooms, use Dice as a reference for using frames of a spritesheet
    super(scene, spriteCfg.x, spriteCfg.y, 'room');
    scene.add.existing(this);

    this.name = roomCfg.name;
    this.waterLevel = roomCfg.waterLevel ? roomCfg.waterLevel : 0;    // range from 0->100
    this.leaking = false;

    this.canSpill = true;  // a room cannot be spilled into and spill on the same turn
  }

  processNextTurn() {
    // check yo self

    if (this.leaking) {
      this.waterLevel += 50;
    }

    // do graphics things
    if (this.waterLevel < 50) {
      this.clearTint();
    }
    else if (this.waterLevel >= 50 && this.waterLevel < 100) {
      this.setTintFill(0x0000ff, 0x9999ff);
    }
    else if (this.waterLevel >= 100) {
      this.waterLevel = 100;
      this.setTintFill(0xffffff);
    }

    // reset
    this.canSpill = true;
  }
}

export default Room;
