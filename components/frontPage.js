import $ from "jquery";
import {BasePage} from "./baseObject";
import {TutorialPage} from "./tutorialPage";
import {SurveyResults} from "../storage/store";

export class FrontPage extends BasePage{
    constructor(parentElem, errorElem) {
        super();

        const layoutElem = $(`
            <h1 class="title">Website for Confidence Elicitation Testing</h1>
            <p class="question-title">You must enter a subject ID. If you do not enter an ID and click Continue, the software will reset.</p>
            <p class="question-explanation">Please enter the subject ID.</p>
        `);
        const inputElem = $('<input type="text">');
        parentElem.append(layoutElem).append(inputElem);

        this.parentElem = parentElem;
        this.inputElem = inputElem;
        this.errorElem = errorElem;
        this.subjectID = '';
    }

    idValidation(text) {
        return text !== '';
    }

    // public methods
    canProceed() {
        const inputText = this.inputElem.val();
        if (this.idValidation(inputText)) {
            this.subjectID = inputText;
            this.parentElem.remove(this.errorElem);
            return true;
        }
        this.errorElem.innerHTML = 'Please enter a valid Subject ID';
        this.parentElem.append(this.errorElem);
        return false;
    }

    record() {
        SurveyResults.subjectID = this.subjectID;
    }

    nextElement() {
        return new TutorialPage(this.parentElem, this.errorElem);
    }
}