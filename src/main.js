// imports
import Location from '/pressure/src/location';
import CrewMember from '/pressure/src/crewmember';
import EventPromptScene from '/pressure/src/event';
import DiceScene from '/pressure/src/dice';
import MapScene from '/pressure/src/scenes/mapScene';

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

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  plugins: {
    global: [
      {key: 'CrewMemberPlugin', plugin: CrewMemberPlugin, start: true
    }]
  },
  scene: [MapScene]
};

let game = new Phaser.Game(config);
