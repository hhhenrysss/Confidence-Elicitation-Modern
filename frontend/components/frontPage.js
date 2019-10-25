import $ from "jquery";
import axios from 'axios';
import {BasePage} from "./baseObject";
import {createBanner, createExplanation, createOption, createQuestionTitle, createSectionTitle} from "./miscObjects";
import {groupType, GroupTypeUtils} from "../storage/store";
import {StartPage} from "./startPage";

import '../assets/styles/banner_style.css';
import {reload} from "../utils";

export class FrontPage extends BasePage{
    constructor(elements, data) {
        super(elements);

        const inputElem = $('<input type="text">');
        const options = createOption([
            {name: `Group 1: ${groupType.linearNoBank}`, value: groupType.linearNoBank},
            {name: `Group 2: ${groupType.linearWithBank}`, value: groupType.linearWithBank},
            {name: `Group 3: ${groupType.parabolicNoBank}`, value: groupType.parabolicNoBank},
            {name: `Group 4: ${groupType.parabolicWithBank}`, value: groupType.parabolicWithBank}
        ]);

        elements.textElem
            .append(createSectionTitle('Testing Website for the Confidence Elicitation Project'))
            .append(createExplanation('You must enter the subject ID string and group.'))
            .append(createQuestionTitle('Please enter the subject ID.'))
            .append(inputElem)
            .append(createQuestionTitle('Please select the subject group.'))
            .append(options.jQueryObj);


        this.inputElem = inputElem;
        this.options = options;
        this.subjectID = '';
        this.groupSelectResult = '';

        this.elements = elements;
        this.data = data;

        axios.get('/next-id')
            .then(response => {
                const data = response.data;
                if (data.errorMsg != null) {
                    const bannerElem = createBanner(
                        data.errorMsg,
                        `Start New`,
                        `Dismiss`,
                        () => {
                            // refresh page
                            reload();
                        }
                    );
                    bannerElem.addRed();
                    elements.textElem.prepend(bannerElem.jQueryObj);
                } else {
                    const id = data.data.participantId;
                    const group = data.data.group;
                    const bannerElem = createBanner(
                        `Current participant has ID ${id} with group ${group}`,
                        `Use this ID and Group`,
                        `Dismiss`,
                        () => {
                            this.inputElem.val(id);
                            this.options.value = group;
                            bannerElem.jQueryObj.remove();
                        }
                    );
                    bannerElem.addBlue();
                    elements.textElem.prepend(bannerElem.jQueryObj);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    // public methods
    canProceed() {
        const inputText = this.inputElem.val();
        const groupValue = this.options.value;
        if (inputText !== '' && GroupTypeUtils.isGroupType(groupValue)) {
            this.subjectID = inputText;
            this.groupSelectResult = groupValue;
            super.hideErrorMessage();
            return true;
        }
        super.addErrorMessage('Please select a value before continue');
        return false;
    }

    record() {
        this.data.SubjectID = this.subjectID;
        this.data.Type = this.groupSelectResult;
        this.data.ReadableType = Object.keys(groupType).find(key => groupType[key] === this.groupSelectResult);
    }

    nextElement() {
        super.clearPage();
        return new StartPage(this.elements, this.data);
    }
}