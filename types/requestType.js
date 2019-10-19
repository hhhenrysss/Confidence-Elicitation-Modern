const {Participant} = require('./participantID');

module.exports.UploadRequest = class UploadRequest extends Participant {
    constructor(num, group, data) {
        super(num, group);
        this.data = data;
    }
};