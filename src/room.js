class Room extends Phaser.GameObjects.Sprite {
  constructor(scene, spriteCfg, roomCfg) {
    // TODO: different sprites for different rooms, use Dice as a reference for using frames of a spritesheet
    super(scene, spriteCfg.x, spriteCfg.y, 'room');
    scene.add.existing(this);

    // need this for events for now... bad :(
    this.scene = scene;

    // info stuff
    this.name = roomCfg.name;

    // event stuff
    this.eventList = [];

    // water stuff (TODO:  maybe integrate this with events dispatcher)
    this.waterLevel = roomCfg.waterLevel ? roomCfg.waterLevel : 0;    // range from 0->100
    this.leaking = false;

    this.canSpill = true;  // a room cannot be spilled into and spill on the same turn
  }

  removeEvent(key) {
      this.eventList.filter(function (key) {
          return item.key !== key.key;
      });
  }

  addEvent(key) {
      // don't add two events of the same type
      if (this.eventList.indexOf(key) === -1 && this.eventList.length <= 4) {
          this.eventList.push(key);
          return true;
      } else {
          return false;
      }
  }

  processNextTurn() {
    // Water stuff
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

    // Event stuff
    if (this.eventList.length !== 0) {
      for (let i = 0; i < this.eventList.length; i++) {
        let eventSprite = this.scene.add.sprite(this.x + 20, this.y + 20, 'eventplaceholder').setInteractive();
        eventSprite.on('pointerup', () => {
          this.scene.scene.pause();
          this.scene.scene.launch('eventPromptScene', this.eventList[i]);
        });
      }
    }
  }
}

export default Room;
