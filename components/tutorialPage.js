import {BasePage} from "./baseObject";
import {CreateExplanation, CreateOption, CreateQuestionTitle, CreateSectionTitle} from "./miscObjects";
import {GroupTypeUtils, Response} from "../storage/store";
import {TutorialQuestions} from "../assets/questions/tutorialQuestions";
import {LinearSlider, ParabolicSlider} from "./graphObject";
import {QuestionPage} from "./questionPage";

export class TutorialPage extends BasePage{
    constructor(elements, data) {
        super(elements);

        this.currentContentIndex = 0;
        this.selectedOption = '';
        this.selectedChartData = null;

        const sectionTitleElem = CreateSectionTitle('');
        const questionTitleElem = CreateQuestionTitle('');
        const optionsElem = CreateOption();

        elements.textElem.append(sectionTitleElem)
            .append(questionTitleElem)
            .append(optionsElem.jQueryObj);

        this.sectionTitleElem = sectionTitleElem;
        this.questionTitleElem = questionTitleElem;
        this.optionsElem = optionsElem;
        this.graph = null;

        this.elements = elements;
        this.data = data;

        this.render();
    }

    clearAll() {
        this.optionsElem.value = '';
        this.selectedOption = '';
        this.selectedChartData = null;
        this.graph = null;
        this.elements.graphElem.empty();
    }
    render() {
        const question = TutorialQuestions[this.currentContentIndex];
        this.sectionTitleElem.html(question.title);
        this.questionTitleElem.html(question.text);

        this.elements.graphElem.append(CreateExplanation(question[this.data.Type][0]));
        this.graph = GroupTypeUtils.isParabolic(this.data.Type) ?
            new ParabolicSlider(this.elements.graphElem) : new LinearSlider(this.elements.graphElem);
        for (let i = 1; i < question[this.data.Type].length; i += 1) {
            this.elements.graphElem.append(CreateExplanation(question[this.data.Type][i]));
        }
    }
    canProceed() {
        const selectedOption = this.optionsElem.value;
        const chartData = this.graph.getValues();
        if ((GroupTypeUtils.isGroupType(selectedOption)) || chartData === null) {
            super.addErrorMessage('Please enter response for the tutorial question');
            return false;
        }
        this.selectedOption = selectedOption;
        this.selectedChartData = chartData;
        super.hideErrorMessage();
        return true;
    }
    record() {
        const question = TutorialQuestions[this.currentContentIndex];
        this.data.TutorialResponses.push(
            new Response(question.id, question.correctAnswer, this.selectedOption, this.selectedChartData)
        )
    }
    nextElement() {
        if (this.currentContentIndex === TutorialQuestions.length - 1) {
            super.clearPage();
            return new QuestionPage(this.elements, this.data);
        } else {
            this.currentContentIndex += 1;
            this.clearAll();
            this.render();
            return this;
        }
    }
}