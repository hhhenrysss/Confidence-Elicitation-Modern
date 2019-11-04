import {BasePage} from "./baseObject";
import {createExplanation, createSectionTitle} from "./miscObjects";
import {IntroductionStatements} from "../assets/questions/introductionStatements";

export class StartPage extends BasePage {
    constructor(elements, data) {
        super(elements);

        this.elements = elements;
        this.data = data;

        const elem = elements.textElem.append(createSectionTitle('INSTRUCTIONS'));
        const instructions = IntroductionStatements[this.data.Type];
        for (const instruction of instructions) {
            elem.append(createExplanation(instruction));
        }
    }
    canProceed() {
        return true
    }
    record() {}
    nextElement() {
        super.clearPage();
        // import {TutorialPage} from "./tutorialPage";
        // return new TutorialPage(this.elements, this.data);
        return import(/* webpackChunkName: "TutorialPage" */ "./tutorialPage").then(c => new c.TutorialPage(this.elements, this.data));
    }
}