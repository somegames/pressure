import Map from '../map';

class MapScene extends Phaser.Scene {
    constructor() {
      super('mapScene');
    }

    preload() {
      this.load.image('facility', 'assets/maptest.png');
      this.load.image('crewpanel', 'assets/crewpanel.png');
      this.load.image('infopanel', 'assets/infopanel.png');
      this.load.image('portrait', 'assets/portrait.png');
      this.load.image('room', 'assets/room.png');

    }

    create() {
      // sections
      let facilityMap = this.add.image(0,0,'facility').setOrigin(0,0);
      let crewPanel = this.add.image(550,0, 'crewpanel').setOrigin(0,0);
      let infoPanel = this.add.image(550, 250, 'infopanel').setOrigin(0,0);

      let crewPane = { topLeft: {x: crewPanel.x + 65, y: crewPanel.y + 71},
                              topRight: {x: crewPanel.x + 184, y: crewPanel.y + 71},
                              bottomLeft: {x: crewPanel.x + 65, y: crewPanel.y + 186},
                              bottomRight: {x: crewPanel.x + 184, y: crewPanel.y + 186}};

      // instantiate map
      let map = new Map(this);

      // crew members
      let jimSpriteCfg = {x: crewPane.topLeft.x, y: crewPane.topLeft.y, key:'portrait'};
      let jim = this.add.crewMember(jimSpriteCfg, "hi");
      let bobSpriteCfg = {x: crewPane.topRight.x, y: crewPane.topRight.y, key:'portrait'};
      let bob = this.add.crewMember(bobSpriteCfg, "hi");
      let buffSpriteCfg = {x: crewPane.bottomLeft.x, y: crewPane.bottomLeft.y, key: 'portrait'};
      let buff = this.add.crewMember(buffSpriteCfg, "hi");
      let lindSpriteCfg = {x: crewPane.bottomRight.x, y: crewPane.bottomRight.y, key:'portrait'};
      let lind = this.add.crewMember(lindSpriteCfg, "hi");

      // TEST!
      let graphics = this.add.graphics();
      graphics.lineStyle(10, 0xFFFFFF);

      for (let i = 0; i < map.rooms.length; i++) {
        for (let j = 0; j < map.rooms.length; j++) {
          if (map.adjacent(map.rooms[i], map.rooms[j])) {
            console.log('buut');
            graphics.beginPath();
            graphics.moveTo(map.rooms[i].x, map.rooms[i].y);
            graphics.lineTo(map.rooms[j].x, map.rooms[j].y);
            graphics.closePath();
            graphics.strokePath();
          }
        }
      }

      // rooms -- testing
      // let roomGroup = this.add.group();
      //
      // let command = roomGroup.create(100, 100, 'room');
      // let medBay = roomGroup.create(215, 95, 'room');
      // let dorms = roomGroup.create(100, 210, 'room');
      // let kitchen = roomGroup.create(215, 210, 'room');
      // let hydroponics = roomGroup.create(315, 200, 'room');
      // let powerGen = roomGroup.create(100, 300, 'room');
      // let oxyGen = roomGroup.create(300, 315, 'room');
      // let escapeRoom = roomGroup.create(215, 400, 'room');

      // let allRooms = [command, medBay, dorms, kitchen, hydroponics, powerGen, oxyGen];

      // drag events
      this.input.on('dragstart', function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
      }, this);

      this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });

      // this.input.on('dragend', function(pointer, gameObject) {
      //   let foundRoom = false;
      //   for (let i = 0; i< allRooms.length; i++) {
      //     if (checkOverlap(gameObject, allRooms[i])) {
      //       gameObject.x = allRooms[i].x;
      //       gameObject.y = allRooms[i].y;
      //       foundRoom = true;
      //       break;
      //     }
      //   }
      //
      //   if (foundRoom === false) {
      //     gameObject.x = gameObject.originalX;
      //     gameObject.y = gameObject.originalY;
      //   }
      // });
  }

  initTurnManager() {
    this.turnManager = new TurnManager(this);
  }
}

function checkOverlap(spriteA, spriteB) {
    let boundsA = spriteA.getBounds();
    let boundsB = spriteB.getBounds();

    return Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB);
}

export default MapScene;
