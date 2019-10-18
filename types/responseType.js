module.exports.NextIDResponse = class NextIDResponse {
    constructor(data, errorMsg) {
        this.data = data;
        this.errorMsg = errorMsg;
    }
};

module.exports.ValidIDResponse = class ValidIDResponse {
    constructor(isValid) {
        this.isValid = isValid;
    }
};

module.exports.UploadResponse = class UploadResponse {
    constructor(isUploaded, errorMsg) {
        this.isUploaded = isUploaded;
        this.errorMsg = errorMsg;
    }
};
