import React, {useEffect} from 'react';
// @ts-ignore
import * as d3 from "d3";

const betHistory = [
    {
        date: new Date(2019,7,1),
        teams: ["Liverpool", "Man City"],
        odds: [2.45,3.2,4.7],
        betOn: 0,
        result: 0,
        stake: 5
    },
    {
        date: new Date(2019,8,30),
        teams: ["Southampton", "Leicester"],
        odds: [5.1,4.1,2.2],
        betOn: 0,
        result: 0,
        stake: 15.5
    },
    {
        date: new Date(2019,9,3),
        teams: ["Man United", "Burnley"],
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2019,10,13),
        teams: ["Anzhi", "CSKA Moscow"],
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2019,11,22),
        teams: ["Barcelona", "Atletico Madrid"],
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,0,5),
        teams: ["PSG", "OSC Lille"],
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,1,23),
        teams: ["Dortmund", "Hertha Berlin"],
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,2,30),
        teams: ["Juventus", "Inter"],
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,3,17),
        teams: ["Birmingham", "Swansea"],
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    },
    {
        date: new Date(2020,4,20),
        teams: ["Leganes", "Eibar"],
        odds: [1.45,3.8,8.7],
        betOn: 2,
        result: 2,
        stake: 3.5
    }
];
let profit = 0;
const series = betHistory.map(x => {
    const {result, betOn, stake, odds} = x;
    if (result == betOn) {
        profit += stake*odds[betOn];
    } else {
        profit -= stake;
    }
    return {"x": x.date, "y": profit};
});

class LineChart extends React.Component {
    //TODO: add shading under line.

    private svg: any;
    private xAxis: any;
    private xScale: any;
    private yAxis: any;
    private yScale: any;
    private line: any;
    private rect: any;
    private tooltipXLine: any;
    private tooltipYLine: any;


    componentDidMount(): void {
        const margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        //creating chart
        this.svg = d3.select("#d3-line-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //axes
        this.xScale = d3.scaleTime()
            .domain([series[0].x, new Date()])
            .range([0, width])

        this.xAxis = this.svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.xScale));

        this.yScale = d3.scaleLinear()
            .domain([0,series[series.length-1].y])
            .range([height, 0]);

        this.yAxis = this.svg.append("g")
            .call(d3.axisLeft(this.yScale));

        //tooltip lines
        this.tooltipXLine = this.svg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5,5");

        this.tooltipYLine = this.svg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", height)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5,5");

        //creating the step graph
        let stepPath = `M 0 ${height} `;
        series.forEach(s => {
            stepPath += "H " + this.xScale(s.x) + " ";
            stepPath += "V " + this.yScale(s.y) + " ";
        })

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
            .attr('width', width)
            .attr('height', height);

        this.rect.on('mousemove', onMouseMove(this));

        function onMouseMove(classThis: any) {
            return function () {
                // @ts-ignore
                let [x, y] = d3.mouse(this);
                let mouseDate = classThis.xScale.invert(x);
                let closestPoint = series[0];
                for (let i = 0; i < series.length - 1; i++) {
                    if (series[i].x < mouseDate && series[i + 1].x >= mouseDate) {
                        let distBefore = Math.abs(series[i].x.getTime() - mouseDate.getTime());
                        let distAfter = Math.abs(series[i + 1].x.getTime() - mouseDate.getTime());
                        closestPoint = distBefore <= distAfter ? series[i] : series[i + 1];
                        break;
                    }
                }

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
    }

    render() {
        return (
            <div id={"d3-line-chart"}></div>
        );
    }


}

export default LineChart;
