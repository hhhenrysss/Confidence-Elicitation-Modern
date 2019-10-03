import $ from "jquery";
import {SurveyResults} from "./storage/store";
import {FrontPage} from "./components/frontPage";

import './assets/styles/style.css';

class Survey {
    constructor() {
        this.elems = {
            textElem: $('#question-text'),
            graphElem: $('#question-graph'),
            buttonElem: $('#proceed-next-section'),
            errorElem: $('#proceed-error-msg'),
        };
        this.results = new SurveyResults();
        this.elems.errorElem.hide();
    }
    storeResults() {
        const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.results));
        const node = document.createElement('a');
        node.setAttribute("href", str);
        node.setAttribute("download", this.results.SubjectID + ".json");
        document.body.appendChild(node); // required for firefox
        node.click();
        node.remove();
    }
    init() {
        let currentPage = new FrontPage(this.elems, this.results);
        const body = $('html, body');
        this.elems.buttonElem.click(() => {
            if (currentPage == null) {
                this.storeResults();
                location.reload(true);
                return;
            }
            if (currentPage.canProceed()) {
                currentPage.record();
                currentPage = currentPage.nextElement();
                body.animate({scrollTop: 0}, 200);
            }
        });
    }
}

$(() => {
    const survey = new Survey();
    survey.init();
});