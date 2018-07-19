class Room extends Phaser.GameObjects.Sprite {
  constructor(scene, spriteCfg, roomCfg) {
    // TODO: different sprites for different rooms, use Dice as a reference for using frames of a spritesheet
    super(scene, spriteCfg.x, spriteCfg.y, 'room');
    scene.add.existing(this);

    this.name = roomCfg.name;
  }
}

export default Room;
