import {BasePage} from "./baseObject";
import {CreateOption, CreateExplanation, CreateQuestionTitle, CreateSectionTitle} from "./miscObjects";
import {GroupType, GroupTypeUtils} from "../storage/store";
import {StartPage} from "./startPage";

export class GroupSelectionPage extends BasePage {
    constructor(elements, data) {
        super(elements);

        this.elements = elements;
        this.data = data;

        const options = CreateOption([
            {name: `Group 1: ${GroupType.linearNoBank}`, value: GroupType.linearNoBank},
            {name: `Group 2: ${GroupType.linearWithBank}`, value: GroupType.linearWithBank},
            {name: `Group 3: ${GroupType.parabolicNoBank}`, value: GroupType.parabolicNoBank},
            {name: `Group 4: ${GroupType.parabolicWithBank}`, value: GroupType.parabolicWithBank}
        ]);

        elements.textElem.append(CreateSectionTitle('Group Selection'))
            .append(CreateQuestionTitle(`What's your subject group?`))
            .append(CreateExplanation(`You must select a group for this experiment.`))
            .append(options.jQueryObj);

        this.options = options;
        this.groupSelectResult = '';
    }
    canProceed() {
        const value = this.options.value;
        if (GroupTypeUtils.isGroupType(value)) {
            super.hideErrorMessage();
            this.groupSelectResult = value;
            return true;
        }
        super.addErrorMessage('Please select a value before continue');
        return false;
    }
    record() {
        this.data.Type = this.groupSelectResult;
    }
    nextElement() {
        super.clearPage();
        return new StartPage(this.elements, this.data);
    }
}