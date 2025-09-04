import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { enviroments } from 'src/app/enviroments/enviroments';
import { map, Observable } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/product/response/GetAllProductsResponse';
import { DeleteProductResponse } from 'src/app/models/interfaces/product/response/DeleteProductResponse';
import { CreateProductRequest } from 'src/app/models/interfaces/product/request/CreateProductRequest';
import { CreateProductResponse } from 'src/app/models/interfaces/product/response/CreateProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = enviroments.apiUrl;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  }

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.httpClient.get<Array<GetAllProductsResponse>>(
      `${this.API_URL}/products`,
      this.httpOptions
    )
    .pipe(
      map((product) => product.filter((data) => data.amount > 0))
    );
  }

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.httpClient.delete<DeleteProductResponse>(
      `${this.API_URL}/product/delete`,
      {
        ...this.httpOptions,
        params:{
          product_id: product_id
        }
      }
    )
  }

  createProduct(requestDatas: CreateProductRequest): Observable<CreateProductResponse>{
    return this.httpClient.post<CreateProductResponse>(
      `${this.API_URL}/product`, requestDatas, this.httpOptions);
  }
}
