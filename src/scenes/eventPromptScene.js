import Die from '../die';

class EventPromptScene extends Phaser.Scene {
  constructor(config) {
    super({key: 'eventPromptScene'});
  }

  init(data) {  // passes data to the rest of the prompt scene
    this.data = data;

    this.crewMember = data.attempting;
  }

  preload() {
    this.load.image('textBox', 'assets/textbox.png');
    this.load.image('xButton', 'assets/button.png');
    this.load.spritesheet('dice', 'assets/alldice.png', {frameWidth: 33, frameHeight: 33, endFrame: 8});

    this.group = this.add.group();
    this.graphics = this.add.graphics();
  }

  create() {
    this.drawOutlines(100, 100, 400, 400);
  }

  drawOutlines(x, y, width, height) {
    let centerX = x + (width/ 2);
    let centerY = y + (height / 2);
    console.log(centerX);
    // main text box
    this.graphics.lineStyle(3, 0xFFFFFF);
    this.graphics.fillStyle(0x000000, 1);
    this.graphics.fillRect(x, y, width, height);
    this.graphics.strokeRect(x, y, width, height);

    let miniBoxWidth = 100;
    let miniBoxHeight = 100;

    // target value box
    this.graphics.strokeRect(centerX - miniBoxWidth/2, y - miniBoxHeight/2, miniBoxWidth, miniBoxHeight);
    this.graphics.fillRect(centerX - miniBoxWidth/2, y - miniBoxHeight/2, miniBoxWidth, miniBoxHeight);

    // write target value
    let text = this.make.text({
      x: centerX,
      y: y,
      style: {font: 'bold 60px Arial'},
      text: this.data.successThreshold,
      wordWrap: {width: miniBoxWidth}
    }).setOrigin(0.5, 0.5);

    let dropZoneBoxWidth = width * 0.8;
    let dropZoneBoxHeight = 70;

    // drop zone
    this.graphics.fillStyle(0xFFFFFF, 100);
    this.graphics.fillRect(x + (width * 0.1), y + height - dropZoneBoxHeight - 100, dropZoneBoxWidth, dropZoneBoxHeight);

    //  handling the event: draw a dummy version of the crew member sprite
    let crewImg = this.group.create(x + (width * 0.15), y + height - 65, this.crewMember.texture.key);

    //  create their dice objects
    for (let i = 0; i < this.crewMember.dicePool.length; i++) {
      this.group.create(new Die(this, {x: crewImg.x + 80 + i*40, y: crewImg.y}, tShis.crewMember.dicePool[0]));
    }
  }

  // TESTING - unused for now
  /* displayEventBoxBase(xPos, yPos, xSize, ySize) {
    let textBox = this.group.create(xPos, yPos, 'textBox').setOrigin(0,0);
    textBox.scaleMode = Phaser.ScaleModes.NEAREST;
    textBox.scaleX = xSize / 300;
    textBox.scaleY = xSize / 300;

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
  } */

  closeEventBox() {
    this.group.clear(true, true);
    this.scene.resume('mapScene');
  }
}

export default EventPromptScene;
