export class BasePage {
    constructor(elements) {
        this.elements = elements;
    }
    canProceed() { return true; /* Need to be implemented by derived class */ }
    record() { /* Need to be implemented by derived class */ }
    nextElement() { return null; /* Need to be implemented by derived class */ }

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