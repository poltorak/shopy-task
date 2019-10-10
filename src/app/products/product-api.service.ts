import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemResponse, ListResponse, Product } from './models';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    let params = new HttpParams();
    params = params.set('per_page', '8');

    return this.http.get('https://reqres.in/api/resources', { params })
      .pipe(
        map((response: ListResponse<Product>) => response.data),
      );
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get(`https://reqres.in/api/resources/${id}`, { params: new HttpParams().set('delay', '1')})
      .pipe(
        map((response: ItemResponse<Product>) => response.data)
      );
  }

  private getData(response: ItemResponse<Product> | ListResponse<Product>): Product | Product[] {
    return response.data;
  }
}
