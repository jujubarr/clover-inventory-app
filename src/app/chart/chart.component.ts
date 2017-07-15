import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
	data: any;

  constructor(private service: CloverService) {
  	this.fetchItems();
  }

  ngOnInit() {
  	this.renderBars();
  }

  renderBars() {
		d3.select('#bar-chart')
		  .selectAll('div')
		  .data([4, 8, 15, 16, 23, 42])
		  .enter()
		  .append('div')
		  .classed('bar', true)
		  .style("height", (d)=> d + "px");
  }

  renderLabels() {
  	d3.select('#bar-chart')
		  .selectAll('div')
		  .data([4, 8, 15, 16, 23, 42])
		  .enter()
		  .append('div')
		  .classed('label', true)
		  .style("height", (d)=> d + "px");
  }

  renderAxis() {
  	d3.select('#bar-chart')
		  .selectAll('div')
		  .data([4, 8, 15, 16, 23, 42])
		  .enter()
		  .append('div')
		  .classed('bar', true)
		  .style("height", (d)=> d + "px");
  }

  fetchItems() {
    this.service.getItems().subscribe(data => {
      this.data = data.elements;
      console.log('Data:', data);
    },
    err => {
      console.log('Error:', err);
    });
  }
}
