import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from "rxjs";
import { CloverService } from '../clover.service';

declare var getParameterByName: any;

@Component({
  selector: 'inventory-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [CloverService]
})


export class TableComponent implements OnInit {
  data: any;
  priceSortToggle: boolean;
  nameSortToggle: boolean;
  
  @Output() gotItems: EventEmitter<any> = new EventEmitter();

  constructor(private service: CloverService) { 
    this.fetchItems();
  }

  ngOnInit() {
  }

  /*
    API call to fetch all item rows
  */
  fetchItems() {
    this.service.getItems().subscribe(data => {
      this.data = data.elements;
      // emit data so that the chart changes too
      this.gotItems.emit(this.data);
      console.log('Data:', data);
    },
    err => {
      this.handleError(err);
      console.log('Error:', err);
    });
  }


  clearInputs(n: HTMLInputElement, q: HTMLInputElement) {
    if (!n || !q) {
      return;
    }

    n.value = '';
    q.value = '';
  }


  /*
    API call to create/edit item
  */
  postItem(n: HTMLInputElement, q: HTMLInputElement) {
    if (!n || !q) {
      return;
    }

    this.service.postItem(n.name, n.value, q.value).subscribe(
      (data) => {
        this.fetchItems();
      },
      (err) => this.handleError(err)
    );
    this.clearInputs(n, q);
  }


  /*
    Set the modal with the values I want to edit
  */
  editItem(n: HTMLInputElement, q: HTMLInputElement, data: any) {
    n.value = data.name;
    n.name = data.id;
    q.value = data.price;
  }


  /*
    Set the values for when the delete icon is clicked
  */
  setDeleteItemId(data: any, deleteInput: HTMLInputElement, deleteName: HTMLInputElement) {
    deleteInput.value = data.id;
    deleteName.innerHTML = data.name;
  }

  /*
    API call to delete a row item when confirmation is clicked
  */
  deleteItem(elem: HTMLInputElement) {
    this.service.deleteItem(elem.value).subscribe(
      (data) => {
        this.fetchItems();
      },
      (err) => this.handleError(err)
    );
  }

  /*
    Event handler for sortByPrice
  */
  sortByPrice() {
    this.priceSortToggle = !this.priceSortToggle;
    if (this.priceSortToggle) {
      this.data.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
      });
    }
    else {
      this.data.sort(function(a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
      });
    }
  }

  /*
    Event handler for sortByName
  */
  sortByName() {
    this.nameSortToggle = !this.nameSortToggle;
    if (this.nameSortToggle) {
      this.data.sort(function(a, b) {
        let textA = a.name[0].toUpperCase();
        let textB = b.name[0].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
    else {
      this.data.sort(function(a, b) {
        let textA = a.name[0].toUpperCase();
        let textB = b.name[0].toUpperCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      });
    }
  }

  /*
    Generic error handler for API calls
  */
  handleError(err) {
    console.log(err);
    return Observable.throw(err);
  }
}
