class Map {
  constructor(scene) {
    this.graph = new graphlib.Graph({directed: false});

    this.rooms = [];
    this.airlocks = [];

    this.maxHP;
    this.currentHP;

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

};

export default Map;
