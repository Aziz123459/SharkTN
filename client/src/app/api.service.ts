import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './user';
import { Startup } from './startup';
import { Investor } from './investor';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl='http://localhost:5000/api'
  constructor(private http:HttpClient) {}
  
  getstartups(): Observable<any>{
    return this.http.get(`${this.baseUrl}/startup`)
  }

  getinvestors(): Observable<any>{
    return this.http.get(`${this.baseUrl}/investor`)
  }

  getusers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/user`)
  }

  createUser(data:User): Observable<any>{
    return this.http.post(`${this.baseUrl}/register`,data).pipe(  
      catchError(this.handleError)
  )
  }
  login(data:User): Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,data).pipe(  
      catchError(this.handleloginerror)
  )
  }

  creatStartup(data:Startup): Observable<any>{
    return this.http.post(`${this.baseUrl}/register/startup`,data).pipe(  
      catchError(this.handleError)
  )
  }

  creatInvestor(data:Investor): Observable<any>{
    return this.http.post(`${this.baseUrl}/register/investor`,data).pipe(  
      catchError(this.handleError)
  )
  }

  private handleError(err: any): Observable<any> {
    console.error('an error occurred!', err)
    return throwError(()=>err.error.errors)
  }

  private handleloginerror(err: any): Observable<any> {
    console.error('an error occurred!', err)
    return throwError(()=>err.error)
  }
}
