module.exports = class Participant {
    constructor(num, groupType) {
        this.participantId = `${num}`;
        this.group = groupType;
    }
};