import * as d3 from 'd3';
import $ from "jquery";
import {Timer} from 'easytimer.js';
import {BasePage} from "./baseObject";
import {Config} from "../configurations";
import {RandomizedQuestions} from "../assets/questions/shuffleQuestions";
import {EndPage} from "./endPage";
import {QuestionPage} from "./questionPage";
import {GroupTypeUtils} from "../storage/store";
import {createExplanation, createQuestionTitle, createSectionTitle} from "./miscObjects";

function generateCountDownText(num) {
    return `After ${num} seconds, the page will automatically jump to the next section`;
}


// Modified from https://gist.github.com/llad/3766585
class Chart {
    constructor() {
        this._margin = {top: 12, right: 100, bottom: 30, left: 50};
        this._width = 420;
        this._height = 420;
        this._xRoundBands = 0.5;
        this._xValue = d => d[0];
        this._yValue = d => d[1];
        this._xScale = d3.scale.ordinal();
        this._yScale = d3.scale.linear();
        this._yAxis = d3.svg.axis().scale(this._yScale).orient("left");
        this._xAxis = d3.svg.axis().scale(this._xScale);
    }
    init(selection) {
        const that = this;
        selection.each(function(data) {
            // Convert data to standard representation greedily;
            // this is needed for non-deterministic accessors.
            const xTicks = data.map(pair => pair[0]);
            const yTicks = ['', -0.75, -0.5, -0.25, 0, 0.25, ''];
            data = data.map((d, i) => [that._xValue.call(data, d, i), that._yValue.call(data, d, i)]);
            // Update the x-scale.
            that._xScale.domain(data.map(d => d[0]))
                .rangeRoundBands([0, that._width - that._margin.left - that._margin.right], that._xRoundBands);
            // Update the y-scale.
            that._yScale.domain([-0.75, 0.25])
                .range([that._height - that._margin.top - that._margin.bottom, 0])
                .nice();
            // Select the svg element, if it exists.
            const svg = d3.select(this).selectAll("svg").data([data]);
            // Otherwise, create the skeletal chart.
            const gEnter = svg.enter().append("svg").append("g");
            gEnter.append("g").attr("class", "bars");
            gEnter.append("g").attr("class", "y axis");
            gEnter.append("g").attr("class", "x axis");
            // Update the outer dimensions.
            svg.attr("width", that._width).attr("height", that._height);
            // Update the bars.
            const bar = svg.select(".bars").selectAll(".bar").data(data);
            bar.enter().append("rect");
            bar.exit().remove();
            bar.attr("class", d => d[1] < 0 ? "bar negative" : "bar positive")
                .attr("x", d => that.X(d))
                .attr("y", d => d[1] < 0 ? that.Y0() : that.Y(d))
                .attr("width", that._xScale.rangeBand())
                .attr("height", d => Math.abs(that.Y(d) - that.Y0()));
            // add labels to each bar
            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(d => `$ ${d[1].toFixed(2)}`)
                .attr("x", d => that.X(d) + that._margin.left)
                .attr("y", d => {
                    const base = Math.abs(that.Y(d) - that.Y0());
                    if (d[1] === 0) {
                        return that.Y(d);
                    } else if (d[1] < 0) {
                        return base + that.Y0() + 30;
                    } else {
                        return that.Y(d);
                    }
                })
                .style("font-size","8px");

            const g = svg.select("g")
                .attr("transform", "translate(" + that._margin.left + "," + that._margin.top + ")");
            const xAxisElem = g.select(".x.axis")
                .attr("transform", "translate(0," + that.Y0() + ")")
                .call(that._xAxis.tickValues(xTicks).tickFormat(d => d).tickSize(6).outerTickSize(0));
            xAxisElem.selectAll("text").style("font-size","12px").style("opacity", "0.7");
            // Update the y-axis.
            const yAxisElem = g.select(".y.axis")
                .call(that._yAxis.tickValues(yTicks).tickFormat(d => `${d}`).tickSize(6).outerTickSize(0));
            yAxisElem.selectAll("text").style("font-size","12px").style("opacity", "0.7");

            // add labels
            gEnter.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("transform", `translate(${that._width - that._margin.right + 30}, ${that.Y0() + 2})`)
                .style("font-size","10px")
                .text("Question Number");
            gEnter.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "begin")
                .attr("transform", `translate(2, ${that._height - that._margin.top - that._margin.bottom + 20})`)
                .style("font-size","10px")
                .text("Earning per question");
        });
    }

    // The x-accessor for the path generator; _xScale ∘ _xValue.
    X(d) {
        return this._xScale(d[0]);
    }
    Y0() {
        return this._yScale(0);
    }
    // The x-accessor for the path generator; _yScale ∘ _yValue.
    Y(d) {
        return this._yScale(d[1]);
    }
    margin(arg) {
        if (!arguments.length) return this._margin;
        this._margin = arg;
        return this;
    }
    width(arg) {
        if (!arguments.length) return this._width;
        this._width = arg;
        return this;
    }
    height(arg) {
        if (!arguments.length) return this._height;
        this._height = arg;
        return this;
    }
    x(arg) {
        if (!arguments.length) return this._xValue;
        this._xValue = arg;
        return this;
    }
    y(arg) {
        if (!arguments.length) return this._yValue;
        this._yValue = arg;
        return this;
    }
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
        this.elements.textElem.append(createSectionTitle('Bank Results'));
        const data = this.data.RoundRewardsHistory.map(obj => {
            return [obj.questionNumber, obj.amount];
        });
        this.elements.graphElem.append($(`<div id="bank-vis"></div>`));
        d3.select("#bank-vis")
            .datum(data)
            .call((args) => {
                const chart = new Chart();
                chart.width(window.innerWidth/2);
                chart.height(window.innerHeight/2);
                chart.x(d => d[0]);
                chart.y(d => d[1]);
                chart.init(args);
            });
        const currentRound = this.data.RoundRewardsHistory.reduce((acc, curr) => acc + curr.amount, 0);
        this.elements.graphElem.append(createQuestionTitle('Summary'))
            .append(createExplanation(`Net reward from this round: ${currentRound.toFixed(2)}`))
            .append(createExplanation(`Previous bank balance: ${this.data.TotalBankBalance}`))
            .append(createExplanation(`Total Reward from all completed rounds: ${(currentRound + this.data.TotalBankBalance).toFixed(2)}`))
            .append($('<hr>'));
    }
    renderTimeCountDown() {
        const countDownElem = $('<div class="timer-indicator"><div class="loading"></div></div>');
        const countDownBanner = $('<div class="timer-countdown"></div>');
        const countDownNotice = createQuestionTitle('Please do not switch to another web page or desktop application');
        countDownBanner.html(generateCountDownText(Config.breakDuration));
        const wrapper = $('<div class="timer-wrapper"></div>');
        wrapper.append(countDownBanner).append(countDownElem);
        this.elements.graphElem.append(countDownNotice).append(wrapper);

        const timer = new Timer();
        timer.start({countdown: true, startValues: {seconds: Config.breakDuration}});
        timer.addEventListener('secondsUpdated', () => {
            const segments = timer.getTimeValues().toString().split(':');
            const seconds = segments[segments.length - 1];
            countDownBanner.html(generateCountDownText(seconds));
        });
        timer.addEventListener('targetAchieved', () => {
            wrapper.remove();
            countDownNotice.remove();
            this.elements.buttonElem.trigger('click');
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