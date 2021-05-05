import React, {Component} from 'react';
import * as d3 from "d3";

class Graph extends Component {
    
    componentDidMount() {
        this.removeOldChart();
        this.drawChart();
      }

      removeOldChart(){
        var svg = d3.select("#"+this.props.divID);
        svg.selectAll("*").remove();
      }

      drawChart() {
        const data = this.props.data;
        const semesters = this.props.semesters;
        var margin = {top: 10, right: 100, bottom: 30, left: 30},
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        var svgout = d3.select("#"+this.props.divID)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        
        var svg = svgout.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // group the data; one line per course
        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) { return d.course;})
        .entries(data);

        // Add X axis
        var x = d3.scalePoint().domain(this.props.semesters)
        .range([ 0, width ]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
        
        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.frequency; })])
        .range([ height, 0 ]);
        
        svg.append("g")
        .call(d3.axisLeft(y));

        // color palette
        var res = sumstat.map(function(d){ return d.key }) // list of group names
        var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#bb1b1d','#206ead','#4daf4a','#bb58ca','#ff7f00','#dab513', '#02d6d6' ,'#a65628','#f781bf','#999999'])

        // Draw the line
        svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return color(d.key) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
            return d3.line()
                .x(function(d) { return x(d.semester); })
                .y(function(d) { return y(+d.frequency); })
                (d.values)
            })

        svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.semester) } )
            .attr("cy", function(d) { return y(d.frequency) } )
            .attr("r", 3)
            .attr("fill", "grey")

        var legendsvg = svgout.append("g")
        
        // Add one dot in the legend for each name.
        var size = 10
        legendsvg.selectAll("mydots")
        .data(sumstat)
        .enter()
        .append("rect")
            .attr("x", 610)
            .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size)
            .attr("height", size)
            .style("fill", function(d){ return color(d.key)})

        // Add one dot in the legend for each name.
        legendsvg.selectAll("mylabels")
        .data(sumstat)
        .enter()
        .append("text")
            .attr("x", 610 + size*1.1)
            .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return color(d.key)})
            .text(function(d){ return d.key})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        }

      render(){
        return <div id={"#" + this.props.divID}>{this.removeOldChart()}
            {this.drawChart()}</div>
      }    
}

export default Graph;