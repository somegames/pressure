import Event from '/pressure/src/event';

class EventManager {
  constructor(scene, json) {
    this.turn = 0;
    this.difficulty = 1;            // unused
    this.events = {};        // all event objs
    this.eventDispatchList = [];    // full of events that will be dispatched ?

    // make bigass list of event objects
    // in the dumbest way possible
    for (let i = 0; i < json.length; i++) {
      let eventToAdd = new Event(json[i]),
        key = eventToAdd.key;

      this.events[key] = eventToAdd;
    }
  }

  processNextTurn() {
    // check for fail condition

    // turn counter used to determine which
    this.turn += 1;
  }

  dispatchEvent(room, eventId) {
    room.addEvent(this.events[eventId]);
  }

  dispatchRandomEvent(room) {
    room.events.addEvent(this.events[Math.floor(Math.random()*this.events.length)]);
  }

  getEvent(eventId) {
    return this.events[eventId];
  }

  dispatchEventObj(room, eventToDispatch) { // TESTING ONLY
    room.addEvent(eventToDispatch);
  }
}

export default EventManager
