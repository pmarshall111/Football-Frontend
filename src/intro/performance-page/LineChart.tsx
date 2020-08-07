import React, {useEffect} from 'react';
// @ts-ignore
import * as d3 from "d3";

interface ILineChartProps {
    data: {
        x: Date,
        y: number
    }[],
    updateMatch?: object,
    currMatch: {idx: number, from: string}
}

class LineChart extends React.Component<ILineChartProps> {
    //TODO: add shading under line.

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

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        const margin = {top: 10, right: 30, bottom: 30, left: 60};

        this.width = 460 - margin.left - margin.right;
        this.height = 400 - margin.top - margin.bottom;

        const {data, currMatch} = this.props;

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
            .domain([data[0].x, new Date()])
            .range([0, this.width])

        this.xAxis = this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.xScale));

        this.yScale = d3.scaleLinear()
            .domain([0,data[data.length-1].y])
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
        let xPoint = this.xScale(data[currMatch.idx].x);
        let yPoint = this.yScale(data[currMatch.idx].y);

        this.tooltipYLine
            .attr("x1", xPoint)
            .attr("x2", xPoint);

        this.tooltipXLine
            .attr("y1", yPoint)
            .attr("y2", yPoint);

        //creating the step graph
        let stepPath = `M 0 ${this.height} `;
        data.forEach(s => {
            stepPath += "H " + this.xScale(s.x) + " ";
            stepPath += "V " + this.yScale(s.y) + " ";
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

        function onMouseMove(classThis: any) {
            return function () {
                const {data} = classThis.props;
                // @ts-ignore
                let [x, y] = d3.mouse(this);
                let mouseDate = classThis.xScale.invert(x);
                let closestIndex = 0;
                for (let i = 0; i < data.length - 1; i++) {
                    if (data[i].x < mouseDate && data[i + 1].x >= mouseDate) {
                        let distBefore = Math.abs(data[i].x.getTime() - mouseDate.getTime());
                        let distAfter = Math.abs(data[i + 1].x.getTime() - mouseDate.getTime());
                        closestIndex = distBefore <= distAfter ? i : i+1;
                        break;
                    }
                }

                if (classThis.props.updateMatch) {
                    classThis.props.updateMatch({idx: closestIndex, from: "line"});
                }

                let closestPoint = data[closestIndex];

                let xPoint = classThis.xScale(closestPoint.x);
                let yPoint = classThis.yScale(closestPoint.y);

                classThis.tooltipYLine
                    .attr("x1", xPoint)
                    .attr("x2", xPoint);

                classThis.tooltipXLine
                    .attr("y1", yPoint)
                    .attr("y2", yPoint);
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        //need to get rid of old line. later can add in some nice animation
        //then add new line.
        const {data, currMatch} = this.props;

        let xPoint = this.xScale(data[currMatch.idx].x);
        let yPoint = this.yScale(data[currMatch.idx].y);

        this.tooltipYLine
            .attr("x1", xPoint)
            .attr("x2", xPoint);

        this.tooltipXLine
            .attr("y1", yPoint)
            .attr("y2", yPoint);

        //updating the step graph
        let stepPath = `M 0 ${this.height} `;
        data.forEach(s => {
            stepPath += "H " + this.xScale(s.x) + " ";
            stepPath += "V " + this.yScale(s.y) + " ";
        })
        stepPath+="H " + this.width;
        this.line.attr("d", stepPath);
    }

    render() {
        return (
            <div id={"d3-line-chart"}></div>
        );
    }


}

export default LineChart;
