const participantList = require('./configurations');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);

const cookieKey = 'participant';

module.exports.cookieUtils = {
    getIndexAndGroup(req) {
        try {
            const data = JSON.parse(req.signedCookies[cookieKey]);
            return [data.participantId, data.group];
        } catch (e) {
            return [null, null];
        }
    },
    createCookie(participant, res) {
        res.cookie(cookieKey, JSON.stringify(participant), {
            path: '/',
            maxAge: 86400 * 1000 * 100, // 100 days
            httpOnly: true,
            signed: true
        });
    },
    clearCookie(res) {
        res.cookie(cookieKey, '', {
            path: '/',
            maxAge: 0,
            httpOnly: true,
            signed: true
        });
    }
};

module.exports.isIDExist = function isIDExist(str, group) {
    for (const participant of participantList) {
        if (participant.participantId === str && participant.group === group) {
            return true;
        }
    }
    return false;
};

module.exports.isFileExist = function isFileExist(filePath) {
    return stat(filePath).then(() => true).catch(() => false);
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
