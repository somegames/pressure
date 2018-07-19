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

      // instantiate map - map creates rooms now
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

      //TEST!
      let graphics = this.add.graphics();
      graphics.lineStyle(10, 0xFFFFFF);

      for (let i = 0; i < map.rooms.length; i++) {
        for (let j = 0; j < map.rooms.length; j++) {
          if (map.adjacent(map.rooms[i], map.rooms[j])) {
            graphics.beginPath();
            graphics.moveTo(map.rooms[i].x, map.rooms[i].y);
            graphics.lineTo(map.rooms[j].x, map.rooms[j].y);
            graphics.closePath();
            graphics.strokePath();
          }
        }
      }
      // TEST END!

      // events
      this.input.on('dragstart', function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
      }, this);

      this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });

      this.input.on('dragend', function(pointer, gameObject) {
        let foundRoom = false;
        for (let i = 0; i< map.rooms.length; i++) {
          if (checkOverlap(gameObject, map.rooms[i])) {   // crew is dragged over a room
            if (gameObject.location === map.rooms[i]) {   // it is the one they're already in
              gameObject.x = map.rooms[i].x;              // keep the sprite there
              gameObject.y = map.rooms[i].y;              // don't change crew or room state
              foundRoom = true;
              break;
            }

            else if (map.rooms[i].occupied === true ) {   // room is already occupied by another crew member
              break;                                      // stop looking
            }

            else {                                        // crew can get into room
              gameObject.x = map.rooms[i].x;
              gameObject.y = map.rooms[i].y;

              if (gameObject.location !== 'unassigned') {                     // crew was in a room previously, so
                map.roomByName(gameObject.location.name).occupied = false;    //mark previous room as free
              }

              gameObject.location = map.rooms[i]; // set crew location to the room
              map.rooms[i].occupied = true;       // occupy new room
              foundRoom = true;
              break;
            }
          }
        }

        if (foundRoom === false) {                    // crew was not dragged over a new room
          gameObject.x = gameObject.input.dragStartX; // snap to where it had been
          gameObject.y = gameObject.input.dragStartY;
        }
      });

      // turn stuff
      let nextTurnButton = this.add.text(500, 500, 'NEXT TURN', {fontFamily: 'Arial', fontSize: 30}).setInteractive();
      nextTurnButton.on('pointerover', function () { this.setTint(0x00ff00)});
      nextTurnButton.on('pointerup', () => {
        this.events.emit('nextTurn')});

      // Flood one room to test it
      map.roomByName('Hydroponics').leaking = true;
      map.roomByName('Power Generator').leaking = true;

      this.events.on('nextTurn', () => {
        map.processNextTurn();
      }, this);
  }
}

function checkOverlap(spriteA, spriteB) {
    let boundsA = spriteA.getBounds();
    let boundsB = spriteB.getBounds();

    return Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB);
}

export default MapScene;
