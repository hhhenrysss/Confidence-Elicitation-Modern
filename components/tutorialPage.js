import {BasePage} from "./baseObject";
import {CreateExplanation, CreateOption, CreateQuestionTitle, CreateSectionTitle} from "./miscObjects";
import {GroupType, Response} from "../storage/store";
import {TutorialQuestions} from "../assets/questions/tutorialQuestions";
import {LinearSlider, ParabolicSlider} from "./graphObject";
import {QuestionPage} from "./questionPage";

export class TutorialPage extends BasePage{
    constructor(elements, data) {
        super();

        this.currentContentIndex = 0;
        this.selectedValue = '';

        const sectionTitleElem = CreateSectionTitle('');
        const questionTitleElem = CreateQuestionTitle('');
        const optionsElem = CreateOption();

        elements.textElem.append(sectionTitleElem)
            .append(questionTitleElem)
            .append(optionsElem);

        this.sectionTitleElem = sectionTitleElem;
        this.questionTitleElem = questionTitleElem;
        this.optionsElem = optionsElem;
        this.graph = null;

        this.elements = elements;
        this.data = data;

        this.render();
    }

    clearAll() {
        this.optionsElem.val([]);
        this.selectedValue = '';
        this.graph = null;
        this.elements.graphElem.empty();
    }
    render() {
        const question = TutorialQuestions[this.currentContentIndex];
        this.sectionTitleElem.innerHTML = question.title;
        this.questionTitleElem.innerHTML = question.text;

        this.elements.graphElem.append(CreateExplanation(question[this.data.GroupType])[0]);
        this.graph = this.data.GroupType === GroupType.parabolic ?
            new ParabolicSlider(this.elements.graphElem) : new LinearSlider(this.elements.graphElem);
        for (let i = 1; i < question[this.data.GroupType].length; i += 1) {
            this.elements.graphElem.append(CreateExplanation(question[this.data.GroupType][i]));
        }
    }
    canProceed() {
        const selectedValue = this.optionsElem.val();
        if (selectedValue === GroupType.parabolic || selectedValue === GroupType.linear) {
            this.elements.errorElem.hide();
            this.selectedValue = selectedValue;
            return true;
        }
        this.elements.errorElem.innerHTML = 'Please make a selection';
        this.elements.errorElem.show();
        return false;
    }
    record() {
        const question = TutorialQuestions[this.currentContentIndex];
        this.data.TutorialResponses.push(
            new Response(question.id, question.correctAnswer, this.selectedValue, this.graph.getValues())
        )
    }
    nextElement() {
        if (this.currentContentIndex === len(TutorialQuestions) - 1) {
            return new QuestionPage(this.elements, this.data);
        } else {
            this.currentContentIndex += 1;
            this.clearAll();
            this.render();
            return this;
        }
    }
}