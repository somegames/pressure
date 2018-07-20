class Event {
  constructor(eventCfg) {
    // prototype
    this.sprite;            // key for the sprite used in the event - the sprite will actually be made as a child to the room it's in
    this.key;                // event key
    this.title;             // the title of the event that actually gets displayed
    this.desc;              // a description for the player to read on mouseover maybe?
    this.possibleRooms;     // the locations that this event may affect
    this.severity;          // difficulty rating to determine dispatch
    this.permanent;         // boolean, a permanent event is one that does not disappear after it is dealt with

    // TODO:  multi-category events?  O:
    // Pass/fail qualities
    this.eventCategory;     // Tech, Body, Intuition
    this.successThreshold;  // The threshold the player needs to meet to pass the event;

    // TODO: consider making a Choice obj for this instead later ???
    // pass/fail
    this.onFailureDesc;     // the text presented to the player when the event is failed
    this.onSuccessDesc;     // the text presented to the player when the event is passed
    this.onFailureScript;   // a script that executes when the event is failed
    this.onSuccessScript;   // a script that executes when the event is passed
    this.onIgnoreScript;    // a script that executes when the event is ignored

    // not in config
    this.room;                      // a reference to the room that the event is in
    this.attempting;                // who is currently attempting this event
    this.rolledMax = 1;             // how many times can they try?
    this.rolledAttempts = 0;        // how many times have they tried?
    this.score = 0;                 // how high have they scored?
    this.diceList = [];             // what dice are currently queued up to be rolled?
  }

  canRoll() {
      return ((this.rolledAttempts < this.rolledMax) && (!this.diceList.length === 0));
  }

  // attempt to roll to pass the event
  attempt() {
      for (let i = 0; i < diceList.length; i++) {
          this.score += diceList[i].roll();
      }

      this.rolledAttempts += 1;
  }

  resolve() {
      if (this.score >= this.success) {
          // invoke success script and just pass through reference
          this.onSuccess(this);
      }

      else {
          this.onFailure(this);
      }

      // remove the event
      if (!this.permanent) {
          this.room = null;
          this.room.removeEvent(this.key);
      }
  }
}

// module of event-related utility scripts for internal use
let eventUtils = function() {
    Util.prototype.checkAttr(target, attr) { // REALLY basic target/attribute handler
        if (target.attr === undefined) {
            throw new Error(`Target ${target} does not have attribute ${attr}`);
        }
    }

    Util.prototype.damage(target, amt) {
        target.currHP -= amt;

        if (target.currHP <= 0) {
            target.currHP = 0;
        }
    }

    Util.prototype.heal(target, amt) {
        target.currHP += amt;

        if(target.currHP >= target.maxHP) {
            target.currHP = target.maxHP;
        }
    }

    Util.prototype.queueNextEvent(target, eventId) {    //target should be a room
        target.events.push(eventId);                    // TODO:  maybe set a limit on how many events a room can have....
                                                        // TODO:  also maybe use the event dispatcher
    }

}


export default Event;
