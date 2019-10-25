import $ from "jquery";
import {SurveyResults} from "./storage/store";
import {FrontPage} from "./components/frontPage";

import './assets/styles/style.css';
import {BankPage} from "./components/bankPage";
import {reload} from "./utils";

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
    init() {
        // this.results.Type = groupType.parabolicWithBank;
        // this.results.RoundRewardsHistory = new Array(10).fill(undefined).map((_, idx) => {
        //     return {
        //         questionNumber: idx,
        //         amount: Math.random() * (0.25 - (-0.75)) + (-0.75)
        //     }
        // });
        // new BankPage(this.elems, this.results, 0);
        let isFirstPage = true;
        let currentPage = new FrontPage(this.elems, this.results);
        const body = $('html, body');
        this.elems.buttonElem.click(() => {
            Promise.resolve(currentPage.canProceed()).then(canProceed => {
                if (canProceed) {
                    if (isFirstPage) {
                        window.onbeforeunload = () => "Your previous answers will be lost";
                        isFirstPage = false;
                    }
                    currentPage.record();
                    currentPage = currentPage.nextElement();
                    body.animate({scrollTop: 0}, 200);
                }
                if (currentPage == null) {
                    reload();
                }
            });
        });
    }
}

$(() => {
    $('#root').empty().append($.parseHTML(`
        <div id="question-text"></div>
        <div id="question-graph"></div>
        <div id="actions">
            <button id="proceed-next-section">Continue</button>
            <div id="proceed-error-msg"></div>
        </div>
    `));
    const survey = new Survey();
    survey.init();
});