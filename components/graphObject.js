import * as d3 from "d3";
import $ from "jquery";
import 'jquery-ui/ui/widgets/slider';

import '../node_modules/jquery-ui/themes/base/slider.css';

export class BaseSlider {
    constructor() {}
    getSlider() {}
    getValues() {}
}

export class ParabolicSlider extends BaseSlider {
    constructor(parentElem) {
        super();
        this.parentElem = parentElem;
        this.slider = null;
        this.circle_x = -1;
        this.circle_y = -1;

        this.initializeSlider()
    }
    gaussian(x) {
        return (-1) * x * x; // Function for line/curve
    }
    generateData() {
        const data = [];
        for (let i = 0; i < 50; i++) {
            const el = {
                "q": i,
                "p": this.gaussian(i)
            };
            data.push(el)
        }
        // need to sort for plotting
        data.sort((x, y) => {
            return x.q - y.q;
        });
        return data;
    }
    initializeSlider() {
        const that = this;
        const margin = {top: 20, right: 20, bottom: 30, left: 50};
        const width = 200 - margin.left - margin.right;
        const height = 440 - margin.top - margin.bottom;
        let clicked = false;
        const handle1 = [{x: 0, y: 0}];
        const data = this.generateData();

        this.parentElem.append($('<div>', {id: 'parabolic'}));
        const svgBaseElem = d3.select("#parabolic")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        this.slider = svgBaseElem;

        const transformedBackground = svgBaseElem
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const container = transformedBackground.append("g");
        // create axes
        const x = d3.scale.linear().range([0, width]);//can adjust axis range
        const y = d3.scale.linear().range([height, 0]);

        const xAxis = d3.svg.axis().scale(x).orient("top").tickValues([]);
        const yAxis = d3.svg.axis().scale(y).orient("left").tickValues([]);

        x.domain(d3.extent(data, d => d.q));
        y.domain(d3.extent(data, d => d.p));

        transformedBackground.append("g").attr("class", "x axis").call(xAxis);
        transformedBackground.append("g").attr("class", "y axis").call(yAxis);

        //label of axis (text is styled with css)
        const padding = 2;
        transformedBackground.append("text")
            .attr("text-anchor", "middle")
            .attr("x", "-180")
            .attr("y", "-10")
            .attr("transform", "translate(" + (padding / 2) + "," + (height / 2) + ")rotate(-90)")
            .text("3 points");
        transformedBackground.append("text")
            .attr("text-anchor", "middle")
            .attr("x", "0")
            .attr("y", "-10")
            .attr("transform", "translate(" + (padding / 2) + "," + (height / 2) + ")rotate(-90)")
            .text("Loss if incorrect");
        transformedBackground.append("text")
            .attr("text-anchor", "middle")
            .attr("x", "50")
            .attr("y", "-10")
            .attr("transform", "translate(" + (width / 2) + "," + (0) + ")")  // centre below axis
            .text("1 point");
        transformedBackground.append("text")
            .attr("text-anchor", "middle")
            .attr("x", "0")
            .attr("y", "-10")
            .attr("transform", "translate(" + (width / 2) + "," + (0) + ")")  // centre below axis
            .text("Gain if correct");

        //create horizontal color bar
        const horizontal_bar = container.append("rect")
            .attr("id", "hor")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", 10)
            .attr("fill", "green")
            .attr("id", "horizontal")
            .attr("opacity", 0.3);

        //create vertical color bar
        const vertical_bar = container.append("rect")
            .attr("id", "ver")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 0)
            .attr("fill", "red")
            .attr("id", "vertical")
            .attr("opacity", 0.3);

        container.append("use")
            .attr("id", 'use')
            .attr("xlink:href", '#lineId');


        // function plot
        const line = d3.svg.line()
            .x(d => x(d.q))
            .y(d => y(d.p));
        container.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("id", "lineId")
            .attr("d", line);

        // create handle
        const drag = d3.behavior.drag()
            .origin(d => d)
            .on("drag", function dragged() {
                const coordinates = d3.mouse(this);
                const cx = Math.min(Math.max(coordinates[0], 0), 140);
                const cy = Math.min(Math.max(0.023 * cx * cx, 0), 440);

                that.circle_x = Math.min(cx, 130);
                that.circle_y = Math.min(cy, 390);
                d3.select('g.dot circle')
                    .attr("cx", that.circle_x)
                    .attr("cy", that.circle_y);
                horizontal_bar.attr("width", Math.min(cx, width));
                vertical_bar.attr("height", Math.min(cy, height));
                clicked = false;
            });

        container.append("g")
            .attr("id", "handle_circle")
            .attr("class", "dot")
            .attr("style", "display:none")
            .selectAll('circle')
            .data(handle1)
            .enter().append("circle")
            .attr("r", 3)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .call(drag);

        svgBaseElem.on("mousemove", function findTheMouse () {
                return d3.mouse(this);
            });

        //mouse click
        svgBaseElem.on("click", function click_on_canvas() {
                const coords = d3.mouse(this);
                const cx = Math.min(Math.max(coords[0] - 50, 0), 140);
                const cy = Math.min(Math.max(0.023 * cx * cx, 0), 440);
                container.select("g.dot").attr("style", "display:block");

                that.circle_x = Math.min(cx, 130);
                that.circle_y = Math.min(cy, 390);
                if (!clicked) {
                    d3.select('g.dot circle')
                        .attr("cx", that.circle_x)
                        .attr("cy", that.circle_y);
                    transformedBackground.select("rect[id='horizontal']")
                        .attr("width", Math.min(cx, width));
                    transformedBackground.select("rect[id='vertical']")
                        .attr("height", Math.min(cy, height));
                    clicked = true;
                }
            });
    }

    getSlider() {
        return this.slider;
    }
    getValues() {
        if (this.circle_x < 0 || this.circle_y < 0) {
            return null;
        }
        return {
            x: this.circle_x,
            y: this.circle_y
        }
    }
}

export class LinearSlider extends BaseSlider {
    constructor(parentElem) {
        super();
        this.parentElem = parentElem;
        this.slider = null;
        this.linear_position = -1;

        this.initializeSlider();
    }
    initializeSlider() {
        const that = this;
        const $slider = $('<div>', {'id': 'slider'});
        this.parentElem.append($slider);
        this.slider = $slider;
        const $handle = $('<div>', {'class': 'ui-slider-handle'});
        $slider.append($handle);
        $slider.slider({
            range: "min",
            value: 50,
            min: 50,
            max: 100,
            step: 1,
            animate: true,
            create() {
                const value = $slider.slider("value");
                $handle.html(value);
                that.linear_position = value;
            },
            slide(event, ui) {
                $handle.html(ui.value);
                that.linear_position = ui.value;
            },
            start() {
                $handle.show();
            }
        });
    }
    getSlider() {
        return this.slider;
    }
    getValues() {
        if (this.linear_position < 0) {
            return null;
        }
        return this.linear_position;
    }
}