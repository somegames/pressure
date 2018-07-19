class TurnManager {
  constructor() {
    this.turn = 0;
    this.difficulty = 1; // unused
    this.eventDispatchList = [];  // full of events
  }

  nextTurn() {
    // check for fail condition
    this.turn += 1;
  }

  dispatchEvents() {
    
  }
}
