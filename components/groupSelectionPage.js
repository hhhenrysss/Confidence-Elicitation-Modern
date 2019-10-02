import {BasePage} from "./baseObject";
import {CreateOption, CreateExplanation, CreateQuestionTitle, CreateSectionTitle} from "./miscObjects";
import {GroupType} from "../storage/store";
import {StartPage} from "./startPage";

export class GroupSelectionPage extends BasePage {
    constructor(elements, data) {
        super();

        this.elements = elements;
        this.data = data;

        const options = CreateOption([
            {name: 'Group 1: Linear Slider', value: GroupType.linear},
            {name: 'Group 2: Parabolic Slider', value: GroupType.parabolic}
        ]);

        elements.textElem.append(CreateSectionTitle('Group Selection'))
            .append(CreateQuestionTitle(`What's your subject group?`))
            .append(CreateExplanation(`You must select a group for this experiment.`))
            .append(options);

        this.options = options;
        this.groupSelectResult = '';
    }
    canProceed() {
        const value = this.options.val();
        if (value === GroupType.linear || value === GroupType.parabolic) {
            this.elements.errorElem.hide();
            this.groupSelectResult = value;
            return true;
        }
        this.elements.errorElem.innerHTML = 'Please select a value before continue';
        this.elements.errorElem.show();
        return false;
    }
    record() {
        this.data.GroupType = this.groupSelectResult;
    }
    nextElement() {
        return new StartPage(this.elements, this.data);
    }
}