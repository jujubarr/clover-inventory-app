
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CloverService {
	baseUrl: string;
	token: string;
	merchant: string;
	param: string;

	constructor(private http: Http) {
		this.token = "4bb4f312-66c4-d413-c84c-1e7b6d513db0";
		this.merchant = "7BSQ5A90DXV4P";
		this.baseUrl = "https://sandbox.dev.clover.com/v3/merchants/" + this.merchant;
		this.param = "?access_token=" + this.token;

  }

	getItems(): Observable<any> {
    return this.http.get(this.baseUrl + '/items' + this.param).map(data => data.json());
  }

  postItem(id, name, price): Observable<any> {
  	let itemId = id ? id : "";
  	let payload = {
  		"id": id,
			"name": name,
			"price": price
		};

    return this.http.post(this.baseUrl + '/items/' + itemId + this.param, payload);
  }

  deleteItem(id): Observable<any> {
  	return this.http.delete(this.baseUrl + '/items/' + id + this.param);
  }
}


/*

this.http.post(url, element.value, options)
                .subscribe(
                    (data) => handleSuccess(),
                    (err) => this.handleError(err)
                );

*/