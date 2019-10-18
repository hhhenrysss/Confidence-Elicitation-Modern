import $ from 'jquery';
import {BasePage} from "./baseObject";
import {CreateQuestionTitle, CreateSectionTitle} from "./miscObjects";

export class EndPage extends BasePage {
    constructor(elements, data) {
        super(elements);

        this.elements = elements;
        this.data = data;

        this.elements.textElem.append(CreateSectionTitle('End of Experiment'))
            .append(CreateQuestionTitle('Please click on Continue to end current experiment'));
    }
    storeResults() {
        const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data));
        const node = document.createElement('a');
        node.setAttribute("href", str);
        node.setAttribute("download", this.data.SubjectID + this.data.Type + ".json");
        document.body.appendChild(node); // required for firefox
        node.click();
        node.remove();
    }
    canProceed() {
        return true;
    }
    record() {
        this.storeResults();
    }
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