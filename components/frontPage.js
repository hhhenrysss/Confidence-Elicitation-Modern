import $ from "jquery";
import {BasePage} from "./baseObject";
import {CreateExplanation, CreateQuestionTitle, CreateSectionTitle} from "./miscObjects";
import {GroupSelectionPage} from "./groupSelectionPage";

export class FrontPage extends BasePage{
    constructor(elements, data) {
        super(elements);

        const layoutElem = elements.textElem.append(CreateSectionTitle('Website for Confidence Elicitation Testing'))
            .append(CreateQuestionTitle('Please enter the subject ID.'))
            .append(CreateExplanation('You must enter a subject ID.'));

        const inputElem = $('<input type="text">');
        elements.textElem.append(layoutElem).append(inputElem);
        this.inputElem = inputElem;
        this.subjectID = '';

        this.elements = elements;
        this.data = data;
    }

    idValidation(text) {
        return text !== '';
    }

    // public methods
    canProceed() {
        const inputText = this.inputElem.val();
        if (this.idValidation(inputText)) {
            this.subjectID = inputText;
            super.hideErrorMessage();
            return true;
        }
        super.addErrorMessage('Please enter a valid Subject ID');
        return false;
    }

    record() {
        this.data.subjectID = this.subjectID;
    }

    nextElement() {
        super.clearPage();
        return new GroupSelectionPage(this.elements, this.data);
    }
}