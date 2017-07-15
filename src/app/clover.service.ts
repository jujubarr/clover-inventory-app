
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CloverService {
	baseUrl: string;
	token: string;
	merchant: string;

	constructor(private http: Http) {
		this.token = "";
		this.merchant = "7BSQ5A90DXV4P";
		this.baseUrl = "https://apisandbox.dev.clover.com/v3/merchants/" + this.merchant;
  }

	getItems(): Observable<any> {
		let options; //this.getHeaderOptions();
    return this.http.get(this.baseUrl + '/items?expand=itemStock').map(data => data.json());
  }

  postItem(id, name, price): Observable<any> {
  	let options; //this.getHeaderOptions();
  	let itemId = id ? id : "";
  	let payload = {
  		"id": id,
			"name": name,
			"price": price
		};

    return this.http.post(this.baseUrl + '/items/' + itemId, payload);
  }

  deleteItem(id): Observable<any> {
  	let options; //this.getHeaderOptions();
  	return this.http.delete(this.baseUrl + '/items/' + id);
  }

  getHeaderOptions() {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append("Content-Type", 'application/json');
		// headers.append('Authorization', `Bearer ${this.token}`);
		let options = new RequestOptions({ headers: headers });

		return options;
	}
}


/*

this.http.post(url, element.value, options)
                .subscribe(
                    (data) => handleSuccess(),
                    (err) => this.handleError(err)
                );

*/