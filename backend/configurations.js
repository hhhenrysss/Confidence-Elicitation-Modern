const {groupType} = require('../types/groupType');
const {Participant} = require('../types/participantID');

function creareParticipant(num, groupType) {
    return new Participant(num, groupType);
}

module.exports.participantsList = [
    creareParticipant(1, groupType.linearNoBank),
    creareParticipant(2, groupType.linearNoBank),
    creareParticipant(3, groupType.linearWithBank),
    creareParticipant(4, groupType.linearWithBank),
    creareParticipant(5, groupType.parabolicNoBank),
    creareParticipant(6, groupType.parabolicNoBank),
    creareParticipant(7, groupType.parabolicWithBank),
    creareParticipant(8, groupType.parabolicWithBank)
];