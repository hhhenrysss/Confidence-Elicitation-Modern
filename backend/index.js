const express = require('express');
const path = require('path');


const Participant = require('../types/participantID');
const participantList = require('./configurations');
const {NextIDResponse, UploadResponse, ValidIDResponse} = require('../types/responseType');
const utils = require('./utils');
const {UploadRequest} = require("../types/requestType");

const app = new express();

app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

app.get('next-id', (req, res) => {
    const [str, group] = utils.getIndexAndGroup(req);
    let isFound = false;
    for (let i = 0; i < participantList.length; i += 1) {
        const participant = participantList[i];
        if (participant.participantId === str && participant.group === group) {
            isFound = true;
            if (i + 1 < participantList.length) {
                return res.json(new NextIDResponse(new Participant(), ''));
            }
        }
    }
    if (!isFound) {
        return res.json(new NextIDResponse(null, 'End of List'));
    } else {
        return res.json(new NextIDResponse(null, 'ID does not exist in ID'));
    }
});

app.get('validate-id', (req, res) => {
    const [str, group] = utils.getIndexAndGroup(req);
    return res.json(new ValidIDResponse(utils.isIDExist(str, group)));
});

app.post('new-response', (req, res) => {
    const [str, group] = utils.getIndexAndGroup(req);
    const data = req.query.data;
    if (utils.isIDExist(str, group)) {
        return utils.storeFile(new UploadRequest(str, group, data))
            .catch(err => {
                if (err.errorMsg == null) {
                    return res.json(new UploadResponse(true, ''));
                } else {
                    return res.json(new UploadResponse(false, err.errorMsg));
                }
            })
    } else {
        return res.json(new UploadResponse(false, 'ID does not exist'));
    }
});

app.listen('8000');