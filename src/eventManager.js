class EventManager {
  constructor(json) {
    this.turn = 0;
    this.difficulty = 1;            // unused
    this.events = [];               // all event objs
    this.eventDispatchList = [];    // full of events that will be dispatched ?

    // grab and parse events from XML

  }

  processNextTurn() {
    // check for fail condition

    // turn counter used to determine which
    this.turn += 1;
  }

  dispatchEvent() {

  }
}
