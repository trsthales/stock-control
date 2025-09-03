import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { enviroments } from 'src/app/enviroments/enviroments';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { Observable } from 'rxjs';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/auth/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = enviroments.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse>{
    return this.httpClient.post<SignupUserResponse>(
      `${this.apiUrl}/user`, requestDatas);
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(
      `${this.apiUrl}/auth`, requestDatas);
  }
}
