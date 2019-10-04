import $ from "jquery";
import {GroupType, SurveyResults} from "./storage/store";
import {FrontPage} from "./components/frontPage";

import './assets/styles/style.css';
import {BankPage} from "./components/bankPage";

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
        // this.results.Type = GroupType.parabolicWithBank;
        // this.results.RoundRewardsHistory = new Array(10).fill(undefined).map((_, idx) => {
        //     return {
        //         questionNumber: idx,
        //         amount: Math.random() * (0.25 - (-0.75)) + (-0.75)
        //     }
        // });
        // new BankPage(this.elems, this.results, 0);
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
    $('#root').empty().append($.parseHTML(
        `
        <div id="question-text"></div>
        <div id="question-graph"></div>
        <div id="actions">
            <button id="proceed-next-section">Continue</button>
            <div id="proceed-error-msg"></div>
        </div>
        `
    ));
    const survey = new Survey();
    survey.init();
});