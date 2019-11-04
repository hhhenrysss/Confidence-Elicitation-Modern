import {BasePage} from "./baseObject";
import {createOption, createQuestionTitle, createSectionTitle} from "./miscObjects";
import {GroupTypeUtils, Response} from "../storage/store";
import {LinearSlider, ParabolicSlider} from "./graphObject";
import {Questions} from "../assets/questions/decryptQuestions";
import {Config} from "../configurations";
import {Time} from "../utils";

export class QuestionPage extends BasePage {
    constructor(elements, data, currentIndex = 0) {
        super(elements);

        this.graph = null;
        this.sectionTitle = createSectionTitle('');
        this.questionTitle = createQuestionTitle('');
        this.optionsElem = createOption();

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
        const currentQuestion = Questions[this.currentIndex];
        this.sectionTitle.html(this.generateSectionTitle(this.currentIndex + 1));
        this.questionTitle.html(currentQuestion.question);

        this.graph = GroupTypeUtils.isLinear(this.data.Type) ?
            new LinearSlider(this.elements.graphElem) : new ParabolicSlider(this.elements.graphElem);
        this.elements.graphElem.append(this.graph);
        Time.setTime();
    }

    canProceed() {
        const selectedOption = this.optionsElem.value;
        const chartData = this.graph.getValues();
        if (selectedOption == null || chartData == null) {
            super.addErrorMessage('Please enter valid response');
            return false;
        }
        this.selectedOption = selectedOption;
        this.selectedChartData = chartData;
        super.hideErrorMessage();
        return true;
    }

    record() {
        const question = Questions[this.currentIndex];
        const currentTime = Time.currentTime();
        const response = new Response(
            question.index,
            question.answer,
            this.selectedOption,
            this.selectedChartData,
            currentTime - Time.storedTime
        );
        Time.storedTime = currentTime;
        this.data.Responses.push(response);
        this.data.RoundRewardsHistory.push({
            questionNumber: this.currentIndex + 1,
            amount: response.calculateMoney()
        });
    }

    nextElement() {
        if (this.currentIndex === Questions.length - 1) {
            super.clearPage();
            // import {EndPage} from "./endPage";
            // return new EndPage(this.elements, this.data);
            return import(/* webpackChunkName: "EndPage" */ "./EndPage").then(c => new c.EndPage(this.elements, this.data));
        } else if ((this.currentIndex + 1) % Config.breakInterval === 0) {
            super.clearPage();
            // import {BankPage} from "./bankPage";
            // return new BankPage(this.elements, this.data, this.currentIndex);
            return import(/* webpackChunkName: "BankPage" */ "./bankPage").then(c => new c.BankPage(this.elements, this.data, this.currentIndex));
        } else {
            this.currentIndex += 1;
            this.clearAll();
            this.render();
            return this;
        }
    }
}