import {BasePage} from "./baseObject";
import {CreateExplanation, CreateSectionTitle} from "./miscObjects";
import {TutorialPage} from "./tutorialPage";
import {IntroductionStatements} from "../assets/questions/introductionStatements";

export class StartPage extends BasePage {
    constructor(elements, data) {
        super(elements);

        this.elements = elements;
        this.data = data;

        const elem = elements.textElem.append(CreateSectionTitle('INSTRUCTIONS'));
        const instructions = IntroductionStatements[this.data.Type];
        for (const instruction of instructions) {
            elem.append(CreateExplanation(instruction));
        }
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