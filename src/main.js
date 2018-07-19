// imports
import Room from '/pressure/src/room';
import CrewMember from '/pressure/src/crewmember';
import Die from '/pressure/src/die';

// scenes
import DiceScene from '/pressure/src/scenes/dicescene';
import MapScene from '/pressure/src/scenes/mapScene';
import EventPromptScene from '/pressure/src/scenes/eventpromptscene'

// register plugins
class CrewMemberPlugin extends Phaser.Plugins.BasePlugin {
  constructor (pluginManager) {
    super(pluginManager);
    pluginManager.registerGameObject('crewMember', this.createCrewMember);
  }

  createCrewMember(spriteCfg, statsCfg) {
    return this.displayList.add(new CrewMember(this.scene, spriteCfg, statsCfg));
  }
}

class DiePlugin extends Phaser.Plugins.BasePlugin {
  constructor (pluginManager) {
    super(pluginManager);
    pluginManager.registerGameObject('die', this.createDie);
  }

  createDie(spriteCfg, dieCfg) {
    return this.displayList.add(new Die(this.scene, spriteCfg, dieCfg));
  }
}

class RoomPlugin extends Phaser.Plugins.BasePlugin {
  constructor (pluginManager) {
    super(pluginManager);
    pluginManager.registerGameObject('room', this.createRoom);
  }

  createRoom(spriteCfg, roomCfg) {
    let room = new Room(this.scene, spriteCfg, roomCfg);
    this.displayList.add(room);
    return room;
  }
}

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  plugins: {
    global: [
      {key: 'CrewMemberPlugin', plugin: CrewMemberPlugin, start: true},
      {key: 'DiePlugin', plugin: DiePlugin, start: true},
      {key: 'RoomPlugin', plugin: RoomPlugin, start: true}
    ]
  },
  scene: [MapScene]
};

let game = new Phaser.Game(config);
