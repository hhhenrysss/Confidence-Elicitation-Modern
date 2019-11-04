module.exports.NextIDResponse = class NextIDResponse {
    constructor(data, errorMsg = null) {
        this.data = data;
        this.errorMsg = errorMsg;
    }
};

module.exports.ValidIDResponse = class ValidIDResponse {
    constructor(isValid, errorMsg = null) {
        this.isValid = isValid;
        this.errorMsg = errorMsg;
    }
};

module.exports.UploadResponse = class UploadResponse {
    constructor(errorMsg = null) {
        this.errorMsg = errorMsg;
    }
};
