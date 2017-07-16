import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inventory App';
  data: any;

  setData(data: any) {
  	this.data = data;
  	console.log('Got data!');
  }
}
