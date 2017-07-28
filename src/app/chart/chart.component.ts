import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from "rxjs";
import { CloverService } from '../clover.service';
import * as d3 from 'd3';

@Component({
  selector: 'inventory-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [CloverService]
})
export class ChartComponent implements OnInit {
	// data: any;
	svg: any;
	row: number;
	labelHeight: number;
  @Input() data: any;

  constructor(private service: CloverService) {
  	// this.fetchItems();
  	this.row = 1;
  	this.labelHeight = 40;
  }

  ngOnInit() {
  	this.svg = d3.select('#bar-chart svg');
  	this.renderColumns();
  }

  /*
    When data has changed, re-render bars and their labels
  */
  ngOnChanges(changes: any) {
    this.renderColumns();
  }


  /*
    Renders the bars in the chart and sets their height
  */
  renderColumns() {
  	if (!this.data) {
  		return;
  	}
  	
  	let barWidth = 30;
  	let svg = this.svg;
  	let svgBBox = this.getBBox();

		let columns = svg.append('g').classed('bars', true).selectAll('g')
		  .data(this.data)
		  .enter()
		  .append('g')
		  .classed('entry', true)
		  .attr('transform', function(d, i) {
				return 'translate(' + barWidth * i + ', 0)';
	    });

  	columns.append('rect')
  		.classed('bar', true)
  		.attr("transform", (d) => {
  			return "translate(-" + barWidth/2 + ", 0)";
  		})
			.attr("x", (d, i) => {
				return (i+0.5) * svgBBox.width / (this.data.length+1);
			})
			.attr("y", (d: any) => {
				return svgBBox.height - this.labelHeight - this.getBarHeightPx(d.price);
			})
      .attr("height", (d: any) => {
      	return this.getBarHeightPx(d.price) + "px";
      })
      .attr('width', barWidth + 'px')
      .style('fill', (d) => {
      	return this.getColor();
      })
      .style('stroke-width', 0);


    this.renderLabels(columns, barWidth, svgBBox);
  }

  /*
    Render the labels on the bottom and the bar values
  */
  renderLabels(columns, barWidth, svgBBox) {

  	// label names
	  columns.append('g').append('text')
	  	.style("text-anchor", "middle")
	    .attr('dx', (d, i) => {
	    	return (i+0.5) * svgBBox.width / (this.data.length+1);
	    })
		  .attr('dy', function(d){
	        return svgBBox.height - 15;
	    })
	    .text(function(d: any){
	        return d.name;
	    });

    // numbers
    columns.append('text')
	    .text(function(d: any){
	        return d.price;
	    })
	  	.style("text-anchor", "middle")
	    .attr('dx', (d, i) => {
	    	return (i+0.5) * svgBBox.width / (this.data.length+1);
	    })
		  .attr('dy', (d) => {
	        return svgBBox.height - this.labelHeight - this.getBarHeightPx(d.price);
	    })
  }

  getBarHeightPx(price: number) {
  	let svgBBox = this.getBBox();

  	let h = price / this.row;
  	return h < svgBBox.height ? h : svgBBox.height;
  }

  getBBox() {
  	let svgBBox = {
  		height: parseInt(this.svg.style('height')),
  		width: parseInt(this.svg.style('width'))
  	};

  	return svgBBox;
  }

  /*
    Generate random HEX color code
  */
  getColor() {
	  var letters = '0123456789ABCDEF';
	  var color = '#';
	  for (var i = 0; i < 6; i++) {
	    color += letters[Math.floor(Math.random() * 16)];
	  }
	  return color;
  }

  /*
    API call to fetch all items in my inventory
  */ 
  fetchItems() {
    this.service.getItems().subscribe(data => {
      this.data = data.elements;
      this.renderColumns();
      console.log('Data:', data);
    },
    err => {
      console.log('Error:', err);
    });
  }
}
