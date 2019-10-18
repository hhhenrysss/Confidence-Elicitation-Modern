const GroupType = require('../types/groupType');
const Participant = require('../types/participantID');

function participant(...args) {
    return new Participant(args);
}

module.exports = [
    participant(1, GroupType.linearNoBank),
    participant(2, GroupType.linearNoBank),
    participant(3, GroupType.linearWithBank),
    participant(4, GroupType.linearWithBank),
    participant(5, GroupType.parabolicNoBank),
    participant(6, GroupType.parabolicNoBank),
    participant(7, GroupType.parabolicWithBank),
    participant(8, GroupType.parabolicWithBank)
];