import React, {useEffect} from 'react';
// @ts-ignore
import * as d3 from "d3";
import {start} from "repl";

interface ILineChartProps {
    data: {
        date: Date,
        winLoss: number
    }[],
    currDates: {startDate: Date, endDate: Date},
    updateMatch?: object,
    currMatch: {idx: number, from: string}
}

class LineChart extends React.Component<ILineChartProps> {
    private svg: any;
    private height: any;
    private width: any;
    private xAxis: any;
    private xScale: any;
    private yAxis: any;
    private yScale: any;
    private line: any;
    private rect: any;
    private tooltipXLine: any;
    private tooltipYLine: any;
    private mouseMoveInterval?: number;

    constructor(props: any) {
        super(props);
        this.state = {enableMouseMove: true}
    }

    componentWillUnmount() {
        if (this.mouseMoveInterval) {
            clearInterval(this.mouseMoveInterval);
        }
    }

    componentDidMount(): void {
        //used to speed up the site to reduce the times mousemove can fire. is disabled in mousemove func.
        this.mouseMoveInterval = window.setInterval(() => {
            this.setState({enableMouseMove: true})
        }, 50)
        console.log(this.props.data)
        const margin = {top: 10, right: 30, bottom: 30, left: 60};

        this.width = 460 - margin.left - margin.right;
        this.height = 400 - margin.top - margin.bottom;

        const {data, currMatch, currDates} = this.props;

        //creating chart
        this.svg = d3.select("#d3-line-chart")
            .append("svg")
            .attr("width", this.width + margin.left + margin.right)
            .attr("height", this.height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
            .attr("viewBox", "0 0 100 100");

        //axes
        this.xScale = d3.scaleTime()
            .domain([currDates.startDate, currDates.endDate])
            .range([0, this.width])

        this.xAxis = this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.xScale).ticks(5));

        let yAxisMin, yAxisMax;
        if (data.length > 0) {
            //min will either be 0 or the lowest val -10
            let {min,max} = this.getMinAndMaxProfitsOverTime(data);
            yAxisMin = min-10; //add some space around the line
            yAxisMax = max+10;
            console.log({min,max})
        } else {
            yAxisMin = -20;
            yAxisMax = 20;
        }
        this.yScale = d3.scaleLinear()
            .domain([yAxisMin,yAxisMax])
            .range([this.height, 0]);

        this.yAxis = this.svg.append("g")
            .call(d3.axisLeft(this.yScale));

        //tooltip lines
        this.tooltipXLine = this.svg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", this.width)
            .attr("y2", 0)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5,5");

        this.tooltipYLine = this.svg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", this.height)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5,5");

        //setting tooltip to the current point in the series
        if (data.length > 0) {
            let xPoint = this.xScale(data[currMatch.idx].date);
            let profitAtCurrIdx = this.getCurrentProfitForIndex(data, currMatch.idx);
            let yPoint = this.yScale(profitAtCurrIdx);

            this.tooltipYLine
                .attr("x1", xPoint)
                .attr("x2", xPoint);

            this.tooltipXLine
                .attr("y1", yPoint)
                .attr("y2", yPoint);

        }

        //creating the step graph
        let startYPoint = this.yScale(0);
        let stepPath = `M 0 ${startYPoint} `;
        let runningTotal = 0;
        data.forEach(s => {
            runningTotal += s.winLoss;
            stepPath += "H " + this.xScale(s.date) + " ";
            stepPath += "V " + this.yScale(runningTotal) + " ";
        })
        stepPath+="H " + this.width;

        this.line = this.svg.append("path")
            .attr("d", stepPath)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 1.5);

        //adding invisible rectangle over the top to move tooltips
        this.rect = this.svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', this.width)
            .attr('height', this.height);

        this.rect.on('mousemove', onMouseMove(this));

        function onMouseMove(classThis: any) { //passing the this from the class in to access the event this and also the class this.
            return function () {
                const {data} = classThis.props;
                if (classThis.state.enableMouseMove && data.length > 0) { //if there's no data in the line graph we don't need to update the tooltip.
                    // @ts-ignore
                    let [x, y] = d3.mouse(this);
                    let mouseDate = classThis.xScale.invert(x);
                    console.log(mouseDate)
                    let closestIndex = 0;
                    for (let i = 0; i < data.length - 1; i++) {
                        if (data[i].date < mouseDate && data[i + 1].date >= mouseDate) {
                            let distBefore = Math.abs(data[i].date.getTime() - mouseDate.getTime());
                            let distAfter = Math.abs(data[i + 1].date.getTime() - mouseDate.getTime());
                            closestIndex = distBefore <= distAfter ? i : i + 1;
                            break;
                        }
                    }

                    if (classThis.props.updateMatch) {
                        classThis.props.updateMatch({idx: closestIndex, from: "line"});
                    }

                    let closestPoint = data[closestIndex];

                    let xPoint = classThis.xScale(closestPoint.date);
                    let profitAtCurrIdx = classThis.getCurrentProfitForIndex(data, closestIndex);
                    let yPoint = classThis.yScale(profitAtCurrIdx);

                    classThis.tooltipYLine
                        .attr("x1", xPoint)
                        .attr("x2", xPoint);

                    classThis.tooltipXLine
                        .attr("y1", yPoint)
                        .attr("y2", yPoint);

                }
                classThis.setState({enableMouseMove: false})
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        //need to get rid of old line. later can add in some nice animation
        //then add new line.
        const {data, currMatch, currDates} = this.props;

        //need to also update the axes here, and then also the scale.
        //axes
        this.xScale.domain([currDates.startDate, currDates.endDate])
            .range([0, this.width])

        this.xAxis.call(d3.axisBottom(this.xScale).ticks(5));

        let yAxisMin, yAxisMax;
        if (data.length > 0) {
            //min will either be 0 or the lowest val -10
            let {min,max} = this.getMinAndMaxProfitsOverTime(data);
            // console.log({min,max})
            yAxisMin = min-10; //add some space around the line
            yAxisMax = max+10;
        } else {
            yAxisMin = -20;
            yAxisMax = 20;
        }
        this.yScale.domain([yAxisMin,yAxisMax])
            .range([this.height, 0]);


        this.yAxis.call(d3.axisLeft(this.yScale));


        let toolTipX,toolTipY;
        if (data.length > 0) {
            toolTipX = this.xScale(data[currMatch.idx].date);
            let profitAtCurrIdx = this.getCurrentProfitForIndex(data, currMatch.idx);
            toolTipY = this.yScale(profitAtCurrIdx);
        } else { //placing tooltip on the axes if there is no data present
            toolTipX = 0;
            toolTipY = this.height;
        }

        this.tooltipYLine
            .attr("x1", toolTipX)
            .attr("x2", toolTipX);

        this.tooltipXLine
            .attr("y1", toolTipY)
            .attr("y2", toolTipY);

        //updating the step graph
        let startYPoint = this.yScale(0);
        let stepPath = `M 0 ${startYPoint} `;
        let runningTotal = 0;
        data.forEach(s => {
            runningTotal += s.winLoss;
            stepPath += "H " + this.xScale(s.date) + " ";
            stepPath += "V " + this.yScale(runningTotal) + " ";
        })
        stepPath+="H " + this.width;
        this.line.attr("d", stepPath);
    }

    render() {
        return (
            <div id={"d3-line-chart"}></div>
        );
    }

    getMinAndMaxProfitsOverTime(data: {date: Date, winLoss: number}[]): {min: number, max: number} {
        let runningTotal = 0;
        let min = 0, max = 0;

        data.forEach((d: {date: Date, winLoss: number}) => {
            runningTotal += d.winLoss;
            if (runningTotal < min) {
                min = runningTotal
            }
            if (runningTotal > max) {
                max = runningTotal;
            }
        });
        return {min, max};
    }

    getCurrentProfitForIndex(data: {date: Date, winLoss: number}[], idx: number) {
        let totalProfit = 0;
        for (let i = 0; i<=idx; i++) {
            totalProfit += data[i].winLoss;
        }
        return totalProfit;
    }

}

export default LineChart;
