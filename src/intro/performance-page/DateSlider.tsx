import React from "react";
// @ts-ignore
import * as d3 from "d3";

import "./DateSlider.css";

interface IDateSlider {
    dateExtremes: {startDate: Date, endDate: Date},
    updateDates: any
}

class DateSlider extends React.Component<IDateSlider> {
    private svg: any;
    private xScale: any;
    private slider: any;
    private sliderLine: any;
    private selectedLine: any;
    private startHandle: any;
    private endHandle: any;
    private closestHandle: any;
    private rect: any;
    private startDate: any;
    private endDate: any;

    componentDidMount() {
        let {dateExtremes, updateDates} = this.props;

        const margin = {top:0, right:50, bottom:0, left:50},
            width = 960 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        this.svg = d3.select("#d3-date-slider")
            .append("svg")
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height}`)
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height);

        this.xScale = d3.scaleTime()
            .domain([dateExtremes.startDate, new Date()])
            .range([0, width])
            .clamp(true);

        this.slider = this.svg.append("g")
            .attr("class", "slider")
            .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

        this.sliderLine = this.slider.append("line")
            .attr("class", "track")
            .attr("x1", 0)
            .attr("x2", width);

        //adding line between 2 circles
        this.selectedLine = this.slider.append("line")
            .attr("class", "track-selected")
            .attr("x1", 0)
            .attr("x2", width);

        let radius = 10;
        this.startHandle = this.slider.append("circle")
            .attr("class", "handle")
            .attr("r", radius)
            .attr("fill", "black")
            .attr("cx", 0);

        this.startDate = this.slider.append("text")
            .text(d3.timeFormat("%a %e %b %Y")(dateExtremes.startDate))
            .attr("x", 0)
            .attr("y", -20)
            .attr("fill", "black")
            .attr("font-size", "10px")
            .attr("text-anchor", "middle");

        this.endHandle = this.slider.append("circle")
            .attr("class", "handle")
            .attr("r", radius)
            .attr("fill", "black")
            .attr("cx", width);

        this.endDate = this.slider.append("text")
            .text(d3.timeFormat("%a %e %b %Y")(new Date()))
            .attr("x", width)
            .attr("y", 30)
            .attr("fill", "black")
            .attr("font-size", "10px")
            .attr("text-anchor", "middle");

        this.endHandle.append("text")
            .text(d3.timeFormat("%a %e %b %Y")(new Date()));

        this.rect = this.svg.append("rect")
            .attr("x", margin.left-radius)
            .attr("y", 0)
            .attr("width", width+2*radius)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all");

        this.closestHandle = this.startHandle;
        this.rect.on("mousedown", determineClosestHandle(this));
        this.rect.call(
            d3.drag()
                .on("start drag", moveClosestHandle(this))
                .on("end", () => updateDates({
                    startDate: this.getDateFromString(this.startDate.text()),
                    endDate: this.getDateFromString(this.endDate.text(), true)
                }))
        );

        function determineClosestHandle(classThis: any) {
            return function() {
                // @ts-ignore
                let [x,y] = d3.mouse(this);
                x -= margin.left;
                let diffStart = Math.abs(x - classThis.startHandle.attr("cx"));
                let diffEnd = Math.abs(x - classThis.endHandle.attr("cx"));
                classThis.closestHandle = diffStart <= diffEnd ? classThis.startHandle : classThis.endHandle;
            }
        }

        function moveClosestHandle(classThis: any) {
            return function() {
                // @ts-ignore
                let [x,y] = d3.mouse(this);
                let xOnSvg = x-margin.left;
                //logic to ensure cannot go out of bounds and does not overlap other handle.
                xOnSvg = Math.max(0, xOnSvg);
                xOnSvg = Math.min(width, xOnSvg);
                if (classThis.closestHandle === classThis.startHandle) {
                    xOnSvg = Math.min(+classThis.endHandle.attr("cx")-20, xOnSvg);
                    classThis.startDate.attr("x", xOnSvg);
                    classThis.startDate.text(d3.timeFormat("%a %e %b %Y")(classThis.xScale.invert(xOnSvg)));
                    classThis.selectedLine.attr("x1", xOnSvg);
                } else {
                    xOnSvg = Math.max(+classThis.startHandle.attr("cx")+20, xOnSvg);
                    classThis.endDate.attr("x", xOnSvg);
                    classThis.endDate.text(d3.timeFormat("%a %e %b %Y")(classThis.xScale.invert(xOnSvg)));
                    classThis.selectedLine.attr("x2", xOnSvg);
                }
                classThis.closestHandle.attr("cx", xOnSvg);
            }
        }


        //planning to put the drag event on the slider, then would need to differentiate as to which circle is closest.
        //need to set current circle using mousedown mouseup events.
    }

    //takes in "Thu 1 Aug 2019"
    getDateFromString(s: string, isEndDate: boolean = false): Date {
        let [dow, day, mon, year] = s.split(/\s+/);
        let monthNumb = 0;
        switch(mon) {
            case "Jan":
                monthNumb = 0;
                break;
            case "Feb":
                monthNumb = 1;
                break;
            case "Mar":
                monthNumb = 2;
                break;
            case "Apr":
                monthNumb = 3;
                break;
            case "May":
                monthNumb = 4;
                break;
            case "Jun":
                monthNumb = 5;
                break;
            case "Jul":
                monthNumb = 6;
                break;
            case "Aug":
                monthNumb = 7;
                break;
            case "Sep":
                monthNumb = 8;
                break;
            case "Oct":
                monthNumb = 9;
                break;
            case "Nov":
                monthNumb = 10;
                break;
            case "Dec":
                monthNumb = 11;
                break;
            default:
                throw new Error("bad date: " + mon)
        }
        return new Date(+year, monthNumb, +day, isEndDate ? 23 : 0);
    }

    render() {
        return <div id={"d3-date-slider"} />
    }
}

export default DateSlider;
