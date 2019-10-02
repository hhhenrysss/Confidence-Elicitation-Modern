import {BasePage} from "./baseObject";
import {CreateExplanation, CreateSectionTitle} from "./miscObjects";
import {TutorialPage} from "./tutorialPage";

export class StartPage extends BasePage {
    constructor(elements, data) {
        super(elements);

        this.elements = elements;
        this.data = data;

        elements.textElem.append(CreateSectionTitle('INSTRUCTIONS'))
            .append(CreateExplanation(`You will receive $10 for your participation in this experiment. This is yours to keep regardless of how you perform in the experiment.`))
            .append(CreateExplanation(`In the subsequent pages you will encounter three sample questions to help you get familiar with the format of questions.`));
    }
    canProceed() {
        return true
    }
    record() {}
    nextElement() {
        super.clearPage();
        return new TutorialPage(this.elements, this.data);
    }
}