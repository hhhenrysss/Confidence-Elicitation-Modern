export class BasePage {
    constructor(elements) {
        this.elements = elements;
    }
    canProceed() {/* Need to be implemented by derived class */}
    record() {/* Need to be implemented by derived class */}
    nextElement() {/* Need to be implemented by derived class */}

    addErrorMessage(str) {
        this.elements.errorElem.html(str);
        this.elements.errorElem.show();
    }
    hideErrorMessage() {
        this.elements.errorElem.hide();
    }

    clearPage() {
        this.elements.textElem.empty();
        this.elements.graphElem.empty();
    }
}