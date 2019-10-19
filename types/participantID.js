module.exports.Participant = class Participant {
    constructor(num, groupType) {
        this.participantId = typeof num === 'number' ? `${num}` : num;
        this.group = groupType;
    }
};