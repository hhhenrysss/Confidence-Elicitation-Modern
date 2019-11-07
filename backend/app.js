const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const {participantsList} = require('./configurations');
const {NextIDResponse, UploadResponse, ValidIDResponse} = require('../types/responseType');
const {generateDataFolderPath, allDataFiles, cookieUtils,
    isFileExist, storeFile, generateFileNameFromParticipant,
    generateFilePath} = require("./utils");
const {UploadRequest} = require("../types/requestType");

const app = new express();

app.use(helmet());
app.use(cookieParser('confidence elicitation modern repo'));
app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

app.get('/next-id', (req, res) => {
    return allDataFiles(generateDataFolderPath()).then(files => {
        const fileSet = new Set(files);
        let [str, group] = cookieUtils.getIndexAndGroup(req);
        console.log(`Get request from ${str} and ${group}`);
        if (str == null || group == null) {
            // means start over
            const currentParticipant = participantsList[0];
            let fileName = generateFileNameFromParticipant(currentParticipant);
            if (!fileSet.has(fileName)) {
                cookieUtils.createCookie(currentParticipant, res);
                return res.json(new NextIDResponse(currentParticipant, null));
            } else {
                // trying to find available candidates in the predefined list
                str = currentParticipant.participantId;
                group = currentParticipant.group;
            }
        }
        let startingPoint = -1;
        let i = 0;
        let secondLoop = false;
        for (; i < participantsList.length; i += 1) {
            const participant = participantsList[i];
            if (startingPoint < 0 && secondLoop === true) {
                break;
            }
            if (participant.participantId === str && participant.group === group) {
                // skip if found the same participant as the previous one
                startingPoint = i;
                if (secondLoop === true) {
                    break;
                }
            }
            const candidate = participantsList[i];
            let fileName = generateFileNameFromParticipant(candidate);
            if (!fileSet.has(fileName)) {
                cookieUtils.createCookie(candidate, res);
                return res.json(new NextIDResponse(candidate, null));
            }
            if (i === participantsList.length - 1) {
                i = -1;
                secondLoop = true;
            }
        }
        if (startingPoint >= 0) {
            // end of list
            cookieUtils.clearCookie(res);
            return res.json(new NextIDResponse(null, 'List has been completed'));
        } else {
            return res.json(new NextIDResponse(null, 'Previous experiments involve IDs outside predefined lists. This reminder cannot be used.'));
        }
    });
});

app.get('/validate-id', (req, res) => {
    if (req.query.participantId == null || req.query.group == null) {
        return res.json(new ValidIDResponse(false, 'Invalid parameter'));
    }
    const fileName = generateFileNameFromParticipant(req.query);
    const filePath = generateFilePath(fileName);
    return isFileExist(filePath).then(exist => {
        return res.json(new ValidIDResponse(!exist, !exist ? null:'Data file for this participant already exists'));
    });
});

const jsonParser = bodyParser.json();
app.post('/new-response', jsonParser, (req, res) => {
    return storeFile(new UploadRequest(req.body), req)
        .then(() => res.json(new UploadResponse(null)))
        .catch(err => {
            if (err.errorMsg == null) {
                return res.json(new UploadResponse(null));
            } else {
                return res.json(new UploadResponse(err.errorMsg));
            }
        });
});

if (require.main === module) {
    app.listen('8000', '0.0.0.0');
}

module.exports.start = () => app.listen('8000', '0.0.0.0');