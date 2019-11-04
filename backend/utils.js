const participantList = require('./configurations');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const stat = promisify(fs.stat);
const readAddr = promisify(fs.readdir);
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

module.exports.allDataFiles = function allDataFiles(folderPath) {
    return readAddr(folderPath);
};

module.exports.generateFileNameFromParticipant = function generateFileName(participant) {
    return [participant.participantId, participant.group].join('') + '.json';
};

module.exports.generateFileNameFromReq = function generateFileName(req) {
    return module.exports.cookieUtils.getIndexAndGroup(req).join('') + '.json';
};

module.exports.generateDataFolderPath = function generateDataFolderPath() {
    return path.resolve(__dirname, './data/');
};

module.exports.storeFile = function storeFile(requestedData, req) {
    const errorMsg = {errorMsg: null, isFileExist: false};
    const fileName = module.exports.generateFileNameFromReq(req);
    const completePath = path.resolve(module.exports.generateDataFolderPath(), fileName);
    return stat(completePath).then(() => {
        errorMsg.errorMsg = 'File with the same participant ID and group exist. Cannot store the file remotely.';
        errorMsg.isFileExist = true;
        return Promise.reject(errorMsg);
    }).catch(err => {
        if (errorMsg.errorMsg != null) {
            return Promise.reject(errorMsg);
        }
        if (err.code === 'ENOENT') {
            return writeFile(completePath, JSON.stringify(requestedData.data));
        }
        errorMsg.errorMsg = 'Unknown error occurred: ' + err.code;
        return Promise.reject(errorMsg);
    }).catch(err => {
        if (errorMsg.errorMsg != null) {
            return Promise.reject(errorMsg);
        }
        if (err != null) {
            errorMsg.errorMsg = 'Unknown error occurred while trying to write to file: ' + err.code;
            return Promise.reject(errorMsg);
        }
    })
};
