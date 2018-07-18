class EventPromptScene extends Phaser.Scene {
  constructor(config) {
    super({key: 'eventPromptScene'});

    // Additional properties
    // this.desc = config.desc;
    // this.choices = config.choices;

  }

  preload() {
    this.load.image('textBox', 'assets/textbox.png');
    this.load.image('xButton', 'assets/button.png');

    this.group = this.add.group();
  }

  create() {
    this.displayEventBox(100, 100, 300, 300);
  }

  displayEventBox(xPos, yPos, xSize, ySize) {

    let textBox = this.group.create(xPos, yPos, 'textBox').setOrigin(0,0);
    textBox.scaleMode = Phaser.ScaleModes.NEAREST;
    textBox.scaleX = xSize / 300;
    textBox.scaleY = xSize / 300;
    // TODO:  Fix scaling, idea:  use 2 sprites

    let txtGeneric = { padding: {left: 15, right: 15, top: 24, bottom: 20},
                       origin: {x: 0, y: 0},
                       style: {
                         font: 'bold 16px Courier New',
                         fill: 'white',
                         wordWrap: { width: xSize,
                                     useAdvancedWrap: true }
                       }};

    // Draw the close button
    let closeButton = this.group.create(xPos + textBox.displayWidth - 28, yPos + 12, 'xButton').setOrigin(0,0);
    closeButton.setInteractive();

    closeButton.on('pointerover', function() {
      this.setTint(0xff0000);
    });

    closeButton.on('pointerout', function() {
      this.clearTint();
    });

    closeButton.on('pointerup', () => {
      closeButton.clearTint();
      this.closeEventBox();
    });

    // write the text
    let body = this.make.text(Object.assign({}, txtGeneric,
      {x: xPos,
       y: yPos,
       text: "HI"}));

    this.group.add(body);
    }

  closeEventBox() {
    this.group.clear(true, true);
    this.scene.resume('mapScene');
  }
}

export default EventPromptScene;
