import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { enviroments } from 'src/app/enviroments/enviroments';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private API_URL = enviroments.apiUrl;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  createNewCategory(requestDatas: {
    name: string;
  }): Observable<Array<GetCategoriesResponse>> {
    return this.httpClient.post<Array<GetCategoriesResponse>>(
      `${this.API_URL}/category`,
      requestDatas,
      this.httpOptions
    );
  }

  getAllCategories(): Observable<Array<GetCategoriesResponse>> {
    return this.httpClient.get<Array<GetCategoriesResponse>>(
      `${this.API_URL}/categories`,
      this.httpOptions
    );
  }

  deleteCategory(requestDatas: { category_id: string }): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/category/delete`, {
      ...this.httpOptions,
      params: {
        category_id: requestDatas.category_id,
      },
    });
  }

  editCategory(requestDatas: {
    name: string;
    category_id: string;
  }): Observable<void> {
    return this.httpClient.put<void>(
      `${this.API_URL}/category/edit`,
      { name: requestDatas?.name },
      {
        ...this.httpOptions,
        params: {
          category_id: requestDatas?.category_id,
        },
      }
    );
  }
}
