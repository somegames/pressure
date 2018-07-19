import Die from '../die';

class DiceScene extends Phaser.Scene {
  constructor() {
    super('diceScene');
  }

  preload() {
    this.load.spritesheet('dice', 'assets/alldice.png', {frameWidth: 33, frameHeight: 33, endFrame: 8});
  }

  create() {
    // Testing 
    // let tech = this.add.die({x: 100, y:100}, {type:'tech', quality:'expert'});
    // this.add.die({x: 200, y: 200}, {type: 'intuition', quality: 'novice'});
    // this.add.die({x: 150, y:150}, {type: 'body', quality: 'novice'});
  }
}

export default DiceScene;
