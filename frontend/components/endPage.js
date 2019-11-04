import $ from 'jquery';
import axios from 'axios';
import {BasePage} from "./baseObject";
import {createQuestionTitle, createSectionTitle} from "./miscObjects";

const {UploadRequest} = require("../../types/requestType");

export class EndPage extends BasePage {
    constructor(elements, data) {
        super(elements);

        this.elements = elements;
        this.data = data;

        this.isClickFirstTime = true;
        this.propmt = createQuestionTitle('Please click on Continue to store experiment results');

        this.elements.textElem.append(createSectionTitle('End of Experiment'))
            .append(this.propmt);
    }
    storeResultsLocal() {
        const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data));
        const node = document.createElement('a');
        node.setAttribute("href", str);
        node.setAttribute("download", this.data.SubjectID + this.data.Type + ".json");
        document.body.appendChild(node); // required for firefox
        node.click();
        node.remove();
    }
    storeResultsRemote() {
        return axios.post('/new-response', new UploadRequest(this.data));
    }
    canProceed() {
        if (this.isClickFirstTime) {
            this.storeResultsLocal();
            this.isClickFirstTime = false;
            return this.storeResultsRemote().then(response => {
                const res = response.data;
                if (res.errorMsg != null) {
                    super.addErrorMessage(res.errorMsg);
                } else {
                    this.propmt.html('Please click on Continue to end current experiment');
                    super.hideErrorMessage();
                }
                return false;
            });
        } else {
            return true;
        }
    }
    record() {}
    nextElement() {
        $('#root').html(`
        <div style="display: flex; flex-direction: row; align-items: center;">
            <div style="margin-right: 1em;">Loading Website</div>
            <div class="loading"></div>
        </div>
        `);
        return null;
    }
}