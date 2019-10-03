import * as d3 from 'd3';
import $ from "jquery";
import {Timer} from 'easytimer.js';
import {BasePage} from "./baseObject";
import {Config} from "../configurations";
import {RandomizedQuestions} from "../assets/questions/shuffleQuestions";
import {EndPage} from "./endPage";
import {QuestionPage} from "./questionPage";
import {GroupTypeUtils} from "../storage/store";

function generateCountDownText(num) {
    return `After ${num} seconds, you may continue`;
}

export class BankPage extends BasePage {
    constructor(elements, data, lastIndex) {
        super(elements);

        this.elements = elements;
        this.data = data;
        this.lastIndex = lastIndex;

        this.elements.buttonElem.hide();

        if (GroupTypeUtils.isShowBank(this.data.Type)) {
            this.renderBank();
        }
        this.renderTimeCountDown();
    }
    renderBank() {
        this.elements.graphElem.append($(`<div id="bank-vis"></div>`));
        const history = this.data.RoundRewardsHistory;
        const width = window.innerWidth/4;
        const height = window.innerHeight/2;
        const x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
        x.domain(history.map(d => d.questionNumber));
        const y = d3.scale.linear().range([height, 0]);
        y.domain(history.map(d => d.amount)).nice();
        const xScale = d3.scale.linear().domain(
            [history[0].questionNumber, history[history.length - 1].questionNumber]
        ).range([0, width]);
        const yScale = d3.scale.linear().domain([-0.75, 0.25]).range([height, 0]);
        const xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.format('d'));
        const yAxis = d3.svg.axis().scale(yScale).orient('left');

        const svg = d3.select("#bank-vis").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g");
        svg.selectAll('.bars').data(history).enter()
            .append('rect')
            .attr('class', d => d.amount < 0 ? 'bar-chart-negative' : 'bar-chart-positive')
            .attr('y', d => d.amount < 0 ? y(d.amount) : y(0))
            .attr('x', d => x(d.questionNumber))
            .attr('width', x.rangeBand())
            .attr("height", d => Math.abs(y(d.amount) - y(0)));
        svg.append('g').attr('class', 'bar-chart-x-axis').attr('transform', `translate(0, ${height})`).call(xAxis);
        svg.append('g')
            .attr('class', 'bar-chart-x-axis')
            .append("line")
            .attr("y1", y(0))
            .attr("y2", y(0))
            .attr("x2", width);
        svg.append('g').attr('class', 'bar-chart-y-axis').call(yAxis);
        svg.append('g')
            .attr('class', "bar-chart-y-axis")
            .append("text")
            .text("$")
            .attr("transform", "translate(15, 40), rotate(-90)");
    }
    renderTimeCountDown() {
        const countDownElem = $('<div class="timer-indicator"><div class="loading"></div></div>');
        const countDownBanner = $('<div class="timer-countdown"></div>');
        countDownBanner.html(generateCountDownText(Config.breakDuration));
        const wrapper = $('<div class="timer-wrapper"></div>');
        wrapper.append(countDownElem).append(countDownBanner);
        this.elements.graphElem.append(wrapper);

        const timer = new Timer();
        timer.start({countdown: true, startValues: {seconds: Config.breakDuration}});
        timer.addEventListener('secondsUpdated', () => {
            countDownBanner.html(generateCountDownText(timer.getTimeValues().toString()));
        });
        timer.addEventListener('targetAchieved', () => {
            wrapper.remove();
            this.elements.buttonElem.show();
        });
    }

    canProceed() {
        return true;
    }

    record() {
        this.data.TotalBankBalance += this.data.RoundRewardsHistory.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        this.data.RoundRewardsHistory = [];
    }

    nextElement() {
        super.clearPage();
        if (this.lastIndex === RandomizedQuestions.length - 1) {
            return new EndPage(this.elements, this.data);
        } else {
            return new QuestionPage(this.elements, this.data, this.lastIndex + 1);
        }
    }
}