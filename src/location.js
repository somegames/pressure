class Location {
  constructor(config) {
    this.name = config.name;
    this.type = config.type;
    this.maxHP = config.maxHP;
    this.currHP = config.maxHP;
    this.currEvents = config.currEvents;

    // generating the sprite here instead of using class to extend it because
    // of some es6 interaction I can't figure out yet
    // also, why does make draw this now?
    this.sprite = config.scene.make.sprite(config.sprite);
  }
}

export default Location;
