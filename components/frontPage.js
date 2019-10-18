import $ from "jquery";
import {BasePage} from "./baseObject";
import {CreateExplanation, CreateOption, CreateQuestionTitle, CreateSectionTitle} from "./miscObjects";
import {GroupType, GroupTypeUtils} from "../storage/store";
import {StartPage} from "./startPage";

export class FrontPage extends BasePage{
    constructor(elements, data) {
        super(elements);

        const inputElem = $('<input type="text">');
        const options = CreateOption([
            {name: `Group 1: ${GroupType.linearNoBank}`, value: GroupType.linearNoBank},
            {name: `Group 2: ${GroupType.linearWithBank}`, value: GroupType.linearWithBank},
            {name: `Group 3: ${GroupType.parabolicNoBank}`, value: GroupType.parabolicNoBank},
            {name: `Group 4: ${GroupType.parabolicWithBank}`, value: GroupType.parabolicWithBank}
        ]);

        elements.textElem
            .append(CreateSectionTitle('Testing Website for the Confidence Elicitation Project'))
            .append(CreateExplanation('You must enter the subject ID string and group.'))
            .append(CreateQuestionTitle('Please enter the subject ID.'))
            .append(inputElem)
            .append(CreateQuestionTitle('Please select the subject group.'))
            .append(options.jQueryObj);


        this.inputElem = inputElem;
        this.options = options;
        this.subjectID = '';
        this.groupSelectResult = '';

        this.elements = elements;
        this.data = data;
    }

    // public methods
    canProceed() {
        const inputText = this.inputElem.val();
        const groupValue = this.options.value;
        if (inputText !== '' && GroupTypeUtils.isGroupType(value)) {
            this.subjectID = inputText;
            this.groupSelectResult = value;
            super.hideErrorMessage();
            return true;
        }
        super.addErrorMessage('Please select a value before continue');
        return false;
    }

    record() {
        this.data.SubjectID = this.subjectID;
        this.data.Type = this.groupSelectResult;
        this.data.ReadableType = Object.keys(GroupType).find(key => GroupType[key] === this.groupSelectResult);
    }

    nextElement() {
        super.clearPage();
        return new StartPage(this.elements, this.data);
    }
}