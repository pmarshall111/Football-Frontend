import React from "react";
import * as d3 from "d3";

import "./PieChart.css"

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

let money = [
    {val: "win", count: 0},
    {val: "loss", count: 0}
];
let betsWon = [
    {val: "win", count: 0},
    {val: "loss", count: 0}
];
let resultsBetOn = [
    {val: "home", count: 0},
    {val: "draw", count: 0},
    {val: "away", count: 0}
];
betHistory.forEach(bet => {
    if (bet.betOn == bet.result) {
        money[0].count += bet.stake * bet.odds[bet.betOn];
        betsWon[0].count++;
    } else {
        money[2].count += bet.stake;
        betsWon[2].count++;
    }
    resultsBetOn[bet.betOn].count++;
})

class PieChart extends React.Component {
    private svg: any;
    private pieGroup: any;
    private legendGroup: any;
    private tooltip: any;
    private pie: any;
    private arc: any;
    private _current: any;
    private colours: any;
    private width: any;
    private height: any;



    componentDidMount(): void {
        const margin = {top: 0, right: 0, bottom: 0, left: 0};

        this.width = 500 - margin.left - margin.right;
        this.height = 300 - margin.top - margin.bottom;

        const pieWidth = this.width*2/3;
        const legendWidth = this.width-pieWidth;

        const radius = Math.min(pieWidth, this.height) / 2;

        //creating chart
        this.svg = d3.select("#d3-pie-chart")
            .append("svg")
            .attr("width", this.width + margin.left + margin.right)
            .attr("height", this.height + margin.top + margin.bottom);

        this.pieGroup = this.svg.append("g")
            .attr("transform",
                "translate(" + pieWidth/2 + "," + this.height/2 + ")");

        this.legendGroup = this.svg.append("g")
            .attr("transform",
                "translate(" + legendWidth + "," + this.height/2 + ")");

        this.tooltip = d3.select("#d3-pie-chart")
                            .append("div").classed("d3-pie-tooltip", true);
        this.tooltip.append("p");

        this.colours = d3.scaleOrdinal(["#66c2a5","#fc8d62","#8da0cb",
            "#e78ac3","#a6d854","#ffd92f"]);

        this.pie = d3.pie()
            .value((d: any) => d.count)
            .sort(null);

        this.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        this.componentDidUpdate();
    }

    componentDidUpdate(): void {
            // Join new data
            const path = this.pieGroup.selectAll("path")
                .data(this.pie(resultsBetOn));

            // Update existing arcs
            path.transition().duration(200).attrTween("d", this.arcTween);

            // Enter new arcs
            path.enter().append("path")
                .attr("fill", (d: any, i: number) => this.colours(i))
                .attr("d", this.arc)
                .attr("stroke", "white")
                .attr("stroke-width", "6px")
                .each((d: any) => this._current = d)
                .on("mousemove", (d:any) => {
                    this.tooltip
                        .style("transform", "translate(" + d3.event.pageX + "px, " + d3.event.pageY + "px)")
                        .style("opacity", 1)
                        .select("p")
                        .text(d.data.val);
                }).on("mouseout", (d:any) => {
                    this.tooltip.style("opacity", 0);
            });

            const squareSize = 30;
            const totalLegendHeight = (squareSize+5)*resultsBetOn.length;

            this.legendGroup.selectAll("rect")
                .data(resultsBetOn)
                .enter()
                .append("rect")
                .attr("x", 0)
                .attr("y", (d:any, i:number) => 0+i*(squareSize+5))
                .attr("fill", (d:any, i:number) => this.colours(i))
                .attr("width", squareSize)
                .attr("height", squareSize);

        this.legendGroup.selectAll("text")
            .data(resultsBetOn)
            .enter()
            .append("text")
            .attr("x", 0+squareSize+10)
            .attr("y", (d:any, i:number) => 0+i*(squareSize+5) + 3*squareSize/4)
            .text((d: any) => d.val)
            .attr("text-anchor", "left");

        this.legendGroup.attr("transform",
            "translate(" + (this.width*2/3 + 20) + "," + (this.height/2 - totalLegendHeight/2)  + ")")


            console.log(totalLegendHeight)
            console.log(resultsBetOn)
    }

    arcTween(a: any) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return (t: any) => this.arc(i(t));
    }

    render() {
        return (
            <div id={"d3-pie-chart"}></div>
        );
    }


}

export default PieChart;
