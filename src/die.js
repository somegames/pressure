class Die extends Phaser.GameObjects.Sprite {
  constructor(scene, spriteCfg, dieCfg) {
    const typeIndex = { intuition: [0, 1, 2],
                        tech: [3, 4, 5],
                        body: [6, 7, 8],
                        wild: [9, 10, 11]};

    const qualityRating = { novice: [0,0,1,1,1,2],
                            adept: [0,1,1,1,2,2],
                            expert: [1,1,1,2,2,2],
                            desperation: [0,0,0,2,2,2]};

    // determine which face is default displayed based off of die quality
    let defaultFace = { novice: 0,
                         adept: 1,
                         expert: 2,
                         desperation: 2};

    // have to call this before I can set the roll faces
    super(scene, spriteCfg.x, spriteCfg.y, 'dice', typeIndex[dieCfg.type][defaultFace[dieCfg.quality]]);
    scene.add.existing(this);

    this.setInteractive();

    this.type = dieCfg.type;  // one of: wild, tech, body, intuition, injury
    this.quality = dieCfg.quality; // novice, adept, expert, desperation
    this.rollTable = qualityRating[dieCfg.quality];
    this.spent = false; // if the dice is spent it cannot be rolled

    // determine tint color based off die type:
    switch(this.type) {
      case 'tech':
        this.setTint(0x996699);
        break;
      case 'body':
        this.setTint(0xAA3333);
        break;
      case 'intuition':
        this.setTint(0x3399FF);
        break;
      default:  // no tint
        this.clearTint();
        break;
    }

    // roll events
    this.on('pointerup', () => {
      this.roll();
    });

  }

  // static constants
  get typeIndex() {
    return { intuition: [0, 1, 2],
             tech: [3, 4, 5],
             body: [6, 7, 8],
             wild: [9, 10, 11]};
  }

  roll() {
    console.log(this.rollTable);
    let result = this.rollTable[Math.floor(Math.random() * this.rollTable.length)];
    console.log(result);

    let key = 'roll' + this.type;

    // TODO: should probably put this on scene level but ... later
    if (this.scene.anims.get(key) === undefined) {
      let animCfg = { key: key,
                       frames: this.scene.anims.generateFrameNumbers('dice', {start: this.typeIndex[this.type][0], end: this.typeIndex[this.type][2]}),
                       repeat: 3,
                       frameRate: 16};

      this.scene.anims.create(animCfg);
    }

    this.disableInteractive();
    this.anims.play(key, this);

    //set the frame anyway once the animation is complete
    this.on('animationcomplete', ()=> {
        this.setFrame(this.typeIndex[this.type][result]);
        this.setInteractive();
    }, this);

  }

  rollRepeatCallback(sprite, anim, result) {
    console.log('this does not work');
  }
}

export default Die;
