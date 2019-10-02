import $ from "jquery";
import {SurveyResults} from "./storage/store";
import {FrontPage} from "./components/frontPage";

class Survey {
    constructor() {
        this.elems = {
            textElem: $('#question-text'),
            graphElem: $('#question-graph'),
            buttonElem: $('#proceed-next-section'),
            errorElem: $('#proceed-error-msg'),
        };
        this.results = new SurveyResults();
    }
    init() {
        let currentPage = new FrontPage(this.elems, this.results);
        this.elems.buttonElem.click(() => {
            if (currentPage.canProceed()) {
                currentPage.record();
                currentPage = currentPage.nextElement();
            }
        });
    }
}

$(() => {
    const survey = new Survey();
    survey.init();
});