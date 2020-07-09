import React from "react";
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

class DateSlider extends React.Component {
    private svg: any;
    private xScale: any;
    private slider: any;
    private sliderLine: any;
    private startHandle: any;
    private endHandle: any;
    private closestHandle: any;
    private rect: any;

    componentDidMount() {
        const margin = {top:0, right:50, bottom:0, left:50},
            width = 960 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        this.svg = d3.select("#d3-date-slider")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height);

        this.xScale = d3.scaleTime()
            .domain([series[0].x, new Date()])
            .range([0, width])
            .clamp(true);

        this.slider = this.svg.append("g")
            .attr("class", "slider")
            .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

        this.sliderLine = this.slider.append("line")
            .attr("class", "track")
            .attr("x1", 0)
            .attr("x2", width);

        let radius = 10;
        this.startHandle = this.slider.append("circle")
            .attr("class", "handle")
            .attr("r", radius)
            .attr("fill", "black")
            .attr("cx", 0);

        this.endHandle = this.slider.append("circle")
            .attr("class", "handle")
            .attr("r", radius)
            .attr("fill", "black")
            .attr("cx", width);

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
        );

        function determineClosestHandle(classThis: any) {
            return function() {
                // @ts-ignore
                let [x,y] = d3.mouse(this);
                x -= margin.left;
                let diffStart = Math.abs(x - classThis.startHandle.attr("cx"));
                let diffEnd = Math.abs(x - classThis.endHandle.attr("cx"));
                classThis.closestHandle = diffStart <= diffEnd ? classThis.startHandle : classThis.endHandle;
                console.log(classThis.closestHandle);
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
                } else {
                    xOnSvg = Math.max(+classThis.startHandle.attr("cx")+20, xOnSvg);
                }
                classThis.closestHandle.attr("cx", xOnSvg);
            }
        }


        //planning to put the drag event on the slider, then would need to differentiate as to which circle is closest.
        //need to set current circle using mousedown mouseup events.
    }

    render() {
        return <div id={"d3-date-slider"} />
    }
}

export default DateSlider;
