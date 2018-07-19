class Map {
  constructor(scene) {
    this.graph = new graphlib.Graph({directed: false});

    this.rooms = [];
    this.airlocks = [];

    this.maxHP;
    this.currentHP;

    this.occupied = false;

    // construct default map for now - add rooms as nodes
    this.rooms = [
      scene.add.room({x:100, y:100, key:'room'}, {name:'Command Center'}),
      scene.add.room({x:250, y:100, key:'room'}, {name: 'Med Bay'}),
      scene.add.room({x:100, y:225, key:'room'}, {name: 'Dorms'}),
      scene.add.room({x:250, y:225, key:'room'}, {name: 'Kitchen'}),
      scene.add.room({x:400, y:225, key: 'room'}, {name: 'Hydroponics'}),
      scene.add.room({x:100, y:350, key: 'room'}, {name: 'Power Generator'}),
      scene.add.room({x:400, y:350, key: 'room'}, {name: 'Oxygen Generator'}),
      scene.add.room({x:250, y:425, key: 'room'}, {name: 'Escape Hatch'}),
    ];

    for (let i = 0; i < this.rooms.length; i++) {
      this.graph.setNode(this.rooms[i].name, this.rooms[i]);
    }

    // and add all airlocks as edges
    this.graph.setEdge('Command Center', 'Med Bay');
    this.graph.setEdge('Command Center', 'Dorms');
    this.graph.setEdge('Med Bay', 'Hydroponics');
    this.graph.setEdge('Hydroponics', 'Kitchen');
    this.graph.setEdge('Kitchen', 'Dorms');
    this.graph.setEdge('Dorms', 'Power Generator');
    this.graph.setEdge('Power Generator', 'Oxygen Generator');
    this.graph.setEdge('Power Generator', 'Escape Hatch');
    this.graph.setEdge('Oxygen Generator', 'Escape Hatch');
  }

  // get a room object from its name
  roomByName(name) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (name === this.rooms[i].name) {
        return this.rooms[i];
      }
    }
  }

  // returns true if the two rooms are adjacent to each other
  adjacent(roomA, roomB) {
    return (this.graph.nodeEdges(roomA.name, roomB.name).length !== 0);
  }

  // returns names (node ids) of all neighbours of a room
  neighbors(room) {
    return this.graph.neighbors(room.name);
  }

  processNextTurn() {
    let processQueue = [];

    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].waterLevel >= 100 && this.rooms[i].canSpill === true) {
        // move water to an adjacent room
        let n = this.neighbors(this.rooms[i]);

        if (n.length >= 1) {
          // go into the one with the smallest water level
          n.sort((a, b) => {
            if (this.roomByName(a).waterLevel === this.roomByName(b).waterLevel) {
              return 0;
            }
            if (this.roomByName(a).waterLevel > this.roomByName(b).waterLevel) {
              return 1;
            }
            if (this.roomByName(a).waterLevel < this.roomByName(b).waterLevel) {
              return -1;
            }
          });

          if (this.roomByName(n[0]).waterLevel < 100) {
            console.log('spilling water from ' + this.rooms[i].name + ' into ' + n[0]);
            this.roomByName(n[0]).waterLevel += 50;
            this.roomByName(n[0]).canSpill = false;
          }
        }

        else {   // there is no edge
          console.log('no edge!');
        }
      }
    }

    for (let i = 0; i < this.rooms.length; i++) {
      this.rooms[i].processNextTurn();
    }

  }
};

export default Map;
