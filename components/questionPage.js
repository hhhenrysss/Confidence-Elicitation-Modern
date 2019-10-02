import {BasePage} from "./baseObject";
import {CreateOption, CreateQuestionTitle, CreateSectionTitle} from "./miscObjects";
import {GroupTypeUtils, Response} from "../storage/store";
import {LinearSlider, ParabolicSlider} from "./graphObject";
import {EndPage} from "./endPage";
import {RandomizedQuestions} from "../assets/questions/shuffleQuestions";
import {Config} from "../configurations";
import {BankPage} from "./bankPage";

export class QuestionPage extends BasePage {
    constructor(elements, data, currentIndex = 0) {
        super(elements);

        this.graph = null;
        this.sectionTitle = CreateSectionTitle('');
        this.questionTitle = CreateQuestionTitle('');
        this.optionsElem = CreateOption();

        elements.textElem.append(this.sectionTitle)
            .append(this.questionTitle)
            .append(this.optionsElem.jQueryObj);

        this.currentIndex = currentIndex;
        this.selectedOption = '';
        this.selectedChartData = null;

        this.elements = elements;
        this.data = data;

        this.render();
    }
    clearAll() {
        this.selectedOption = '';
        this.selectedChartData = null;
        this.graph = null;
        this.elements.graphElem.empty();
        this.optionsElem.value = '';
    }
    generateSectionTitle(idx) {
        return `Question ${idx}`;
    }
    render() {
        const currentQuestion = RandomizedQuestions[this.currentIndex];
        this.sectionTitle.html(this.generateSectionTitle(this.currentIndex));
        this.questionTitle.html(currentQuestion.question);

        this.graph = GroupTypeUtils.isLinear(this.data.Type) ?
            new LinearSlider(this.elements.graphElem) : new ParabolicSlider(this.elements.graphElem);
        this.elements.graphElem.append(this.graph);
    }

    canProceed() {
        const selectedOption = this.optionsElem.value;
        const chartData = this.graph.getValues();
        if ((GroupTypeUtils.isGroupType(selectedOption)) || chartData === null) {
            super.addErrorMessage('Please enter valid response');
            return false;
        }
        this.selectedOption = selectedOption;
        this.selectedChartData = chartData;
        super.hideErrorMessage();
        return true;
    }

    record() {
        const question = RandomizedQuestions[this.currentIndex];
        this.data.Responses.push(
            new Response(question.id, question.answer, this.selectedOption, this.selectedChartData)
        );
    }

    nextElement() {
        if (this.currentIndex === len(RandomizedQuestions) -1 ) {
            super.clearPage();
            return new EndPage(this.elements, this.data);
        } else if ((this.currentIndex + 1) % Config.breakInterval === 0) {
            super.clearPage();
            return new BankPage(this.elements, this.data, this.currentIndex);
        } else {
            this.currentIndex += 1;
            this.clearAll();
            this.render();
            return this;
        }
    }
}