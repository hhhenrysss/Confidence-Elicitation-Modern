import {BasePage} from "./baseObject";
import Questions from "../assets/questions/subjective";
import {CreateOption, CreateQuestionTitle, CreateSectionTitle} from "./miscObjects";
import {GroupType, Response} from "../storage/store";
import {LinearSlider, ParabolicSlider} from "./graphObject";
import {EndPage} from "./endPage";

export class QuestionPage extends BasePage {
    constructor(elements, data) {
        super(elements);

        this.graph = null;
        this.sectionTitle = CreateSectionTitle('');
        this.questionTitle = CreateQuestionTitle('');
        this.options = CreateOption();

        elements.textElem.append(this.sectionTitle)
            .append(this.questionTitle)
            .append(this.options);

        this.currentIndex = 0;
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
        this.optionsElem.val([]);
    }
    generateSectionTitle(idx) {
        return `Question ${idx}`;
    }
    render() {
        const currentQuestion = Questions[this.currentIndex];
        this.sectionTitle.html(this.generateSectionTitle(this.currentIndex));
        this.questionTitle.html(currentQuestion.question);

        this.graph = this.data.GroupType === GroupType.linear ?
            new LinearSlider(this.elements.graphElem) : new ParabolicSlider(this.elements.graphElem);
        this.elements.graphElem.append(this.graph);
    }

    canProceed() {
        const selectedOption = this.options.val();
        const chartData = this.graph.getValues();
        if ((selectedOption !== GroupType.linear && selectedOption !== GroupType.parabolic) || chartData === null) {
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
        this.data.Responses.push(
            new Response(question.id, question.answer, this.selectedOption, this.selectedChartData)
        );
    }

    nextElement() {
        if (this.currentIndex === len(Questions) -1 ) {
            super.clearPage();
            return new EndPage(this.elements, this.data);
        } else {
            this.currentIndex += 1;
            this.clearAll();
            this.render();
            return this;
        }
    }
}