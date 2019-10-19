const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const {participantsList} = require('./configurations');
const {NextIDResponse, UploadResponse, ValidIDResponse} = require('../types/responseType');
const utils = require('./utils');
const {UploadRequest} = require("../types/requestType");

const app = new express();

app.use(cookieParser('confidence elicitation modern repo'));
app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

app.get('/next-id', (req, res) => {
    const [str, group] = utils.cookieUtils.getIndexAndGroup(req);
    console.log(`Get request from ${str} and ${group}`);
    if (str == null || group == null) {
        const currentParticipant = participantsList[0];
        utils.cookieUtils.createCookie(currentParticipant, res);
        return res.json(new NextIDResponse(currentParticipant, null));
    }
    let isFound = false;
    for (let i = 0; i < participantsList.length; i += 1) {
        const participant = participantsList[i];
        if (participant.participantId === str && participant.group === group) {
            isFound = true;
            if (i + 1 < participantsList.length) {
                const candidate = participantsList[i+1];
                utils.cookieUtils.createCookie(candidate, res);
                return res.json(new NextIDResponse(candidate, null));
            }
        }
    }
    if (isFound) {
        // end of list
        utils.cookieUtils.clearCookie(res);
        return res.json(new NextIDResponse(null, 'End of List'));
    } else {
        return res.json(new NextIDResponse(null, 'ID does not exist in ID'));
    }
});

app.get('/validate-id', (req, res) => {
    const [str, group] = utils.cookieUtils.getIndexAndGroup(req);
    return utils.isFileExist().then(() => {
        return res.json(new ValidIDResponse(false, 'File already exists'));
    }).catch(() => {
        const result = utils.isIDExist(str, group);
        const response = new ValidIDResponse(result, result === true ? null : 'ID does not exist');
        return res.json(response);
    });
});

app.post('/new-response', (req, res) => {
    const [str, group] = utils.cookieUtils.getIndexAndGroup(req);
    const data = req.query.data;
    if (utils.isIDExist(str, group)) {
        return utils.storeFile(new UploadRequest(str, group, data))
            .catch(err => {
                if (err.errorMsg == null) {
                    return res.json(new UploadResponse(true, null));
                } else {
                    return res.json(new UploadResponse(false, err.errorMsg));
                }
            })
    } else {
        return res.json(new UploadResponse(false, 'ID does not exist'));
    }
});

app.listen('8000');