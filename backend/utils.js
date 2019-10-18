const participantList = require('./configurations');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);

module.exports.getIndexAndGroup = function getIndexAndGroup(req) {
    return [req.query.participantId, req.query.group];
};

module.exports.isIDExist = function isIDExist(str, group) {
    for (const participant of participantList) {
        if (participant.participantId === str && participant.group === group) {
            return true;
        }
    }
    return false;
};

module.exports.storeFile = function storeFile(request) {
    const errorMsg = {errorMsg: null, isFileExist: false};
    const fileName = request.participantId + request.group;
    const completePath = path.resolve(__dirname, './data', fileName);
    return stat(completePath).then(() => {
        errorMsg.errorMsg = 'File already exists';
        errorMsg.isFileExist = true;
        return Promise.reject(errorMsg);
    }).catch(err => {
        if (errorMsg.errorMsg != null) {
            return Promise.reject(errorMsg);
        }
        if (err.code === 'ENOENT') {
            return writeFile(completePath, JSON.stringify(request.data));
        }
        errorMsg.errorMsg = 'Unknown Error Occurred: ' + err.code;
        return Promise.reject(errorMsg);
    }).catch(err => {
        if (errorMsg.errorMsg != null) {
            return Promise.reject(errorMsg);
        }
        if (err != null) {
            errorMsg.errorMsg = 'Unknown Error Occurred: ' + err.code;
            return Promise.reject(errorMsg);
        }
    })
};
