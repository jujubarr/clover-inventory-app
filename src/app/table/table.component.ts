import { Component, OnInit } from '@angular/core';
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
  
  constructor(private service: CloverService) { 
    this.fetchItems();
  }

  ngOnInit() {
  }

  fetchItems() {
    this.service.getItems().subscribe(data => {
      this.data = data.elements;
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

  editItem(n: HTMLInputElement, q: HTMLInputElement, data: any) {
    n.value = data.name;
    n.name = data.id;
    q.value = data.price;
  }

  setDeleteItemId(data: any, deleteInput: HTMLInputElement, deleteName: HTMLInputElement) {
    deleteInput.value = data.id;
    deleteName.innerHTML = data.name;
  }

  deleteItem(elem: HTMLInputElement) {
    this.service.deleteItem(elem.value).subscribe(
      (data) => {
        this.fetchItems();
      },
      (err) => this.handleError(err)
    );
  }

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

  handleError(err) {
    console.log(err);
    return Observable.throw(err);
  }
}
