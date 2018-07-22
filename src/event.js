class Event {
  constructor(eventCfg) {
    let key = Object.keys(eventCfg)[0],   // possibly the hackiest thing i have done so far
        k = eventCfg[key];
    this.key = key;

    // i am doing it this way because i am stupid
    // and for documentation purposes i guesss?

    this.sprite = k.sprite;                   // key for the sprite used in the event - the sprite will actually be made as a child to the room it's in
    this.title = k.title;                     // the title of the event that actually gets displayed
    this.desc = k.desc;                       // a description for the player to read on mouseover maybe?
    this.possibleRooms = k.possibleRooms;     // the locations that this event may affect
    this.severity = k.severity;               // difficulty rating to determine dispatch
    this.permanent = k.permanent;             // boolean, a permanent event is one that does not disappear after it is dealt with

    // TODO:  multi-category events?  O:
    // Pass/fail qualities
    this.category = k.category;     // Tech, Body, Intuition
    this.successThreshold = k.successThreshold;  // The threshold the player needs to meet to pass the event;

    // TODO: consider making a Choice obj for this instead later ???
    // pass/fail
    this.onFailureDesc = k.onFailureDesc;     // the text presented to the player when the event is failed
    this.onSuccessDesc = k.onSuccessDesc;     // the text presented to the player when the event is passed
    this.onFailureScript = k.onFailureScript;   // a script that executes when the event is failed
    this.onSuccessScript = k.onSuccessScript;   // a script that executes when the event is passed
    this.onIgnoreScript = k.onIgnoreScript;    // a script that executes when the event is ignored

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
  }

  assignCrewMember(crewMember) {
    this.attempting = crewMember;
  }
};

// let eventUtils = function() {
//     Util.prototype.checkAttr(target, attr) { // REALLY basic target/attribute handler
//         if (target.attr === undefined) {
//             throw new Error(`Target ${target} does not have attribute ${attr}`);
//         }
//     }
//
//     Util.prototype.damage(target, amt) {
//         target.currHP -= amt;
//
//         if (target.currHP <= 0) {
//             target.currHP = 0;
//         }
//     }
//
//     Util.prototype.heal(target, amt) {
//         target.currHP += amt;
//
//         if(target.currHP >= target.maxHP) {
//             target.currHP = target.maxHP;
//         }
//     }
//
//     Util.prototype.queueNextEvent(target, eventId) {    //target should be a room
//         target.events.push(eventId);                    // TODO:  maybe set a limit on how many events a room can have....
//                                                         // TODO:  also maybe use the event dispatcher
//     }
//
// }


export default Event;
