import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../user';
import { Startup } from '../startup';
import { Investor } from '../investor';
import { Favorite } from '../favorite';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl='http://localhost:5001/api'
  constructor(private http:HttpClient) {}
  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.baseUrl}/favorites`);
  }

  addFavorite(favorite: Favorite): Observable<any> {
    return this.http.post(`${this.baseUrl}/favorites`, favorite);
  }

  removeFavorite(id: String | undefined |null): Observable<any> {
    return this.http.delete(`${this.baseUrl}/favorites/${id}`);
  }
  getstartups(): Observable<any>{
    return this.http.get(`${this.baseUrl}/startup`)
  }

  getstartup(_id:String | undefined |null): Observable<any>{
    return this.http.get(`${this.baseUrl}/startup/${_id}`).pipe(  
      catchError(this.handleError)
  )
  }

  getinvestor(_id:String | undefined | null): Observable<any>{
    return this.http.get(`${this.baseUrl}/investor/${_id}`).pipe(  
      catchError(this.handleError)
  )
  }

  getinvestors(): Observable<any>{
    return this.http.get(`${this.baseUrl}/investor`)
  }

  getusers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/user`)
  }

  getuser(_id: string | undefined): Observable<any>{
    return this.http.get(`${this.baseUrl}/profile/${_id}`)
  }

  getuser2(_id: string | undefined): Observable<any>{
    return this.http.get(`${this.baseUrl}/user/${_id}`)
  }

  getstartupByUserId(_id:String | undefined |null): Observable<any>{
    return this.http.get(`${this.baseUrl}/startup/user/${_id}`).pipe(
      catchError(this.handleError)
    )
  }

  getInvestorById(_id:String | undefined |null): Observable<any>{
    return this.http.get(`${this.baseUrl}/investor/user/${_id}`).pipe(
      catchError(this.handleError)
    )
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

  uploadImage(sticker: File): Observable<any> {
    console.log(sticker);
    const data = new FormData();
    data.append('sticker', sticker, sticker.name);
    return this.http.post<any>(this.baseUrl+"/upload", data);
  }

  logoutUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`).pipe(
      catchError((err) => {
        console.error('Error during logout:', err);
        return throwError(() => err);
      })
    );
  }
  deleteUser(_id:string | undefined |null ): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${_id}`);
  }
  
  // In apiService.ts

// Fetch all investors
getAllInvestors(): Observable<any> {
  return this.http.get(`${this.baseUrl}/investors/all`);
}

// Fetch all startups
getAllStartups(): Observable<any> {
  return this.http.get(`${this.baseUrl}/startups/all`);
}

updateUser(data : User): Observable<any> {
  return this.http.patch(`${this.baseUrl}/profile/${data._id}`,data).pipe(  
    catchError(this.handleError)
  )
}
updateInvestor(data : Investor): Observable<any> {
  return this.http.patch(`${this.baseUrl}/investor/${data._id}`,data).pipe(  
    catchError(this.handleError)
  )
}
updateStartup(data : Startup): Observable<any> {
  return this.http.patch(`${this.baseUrl}/startup/${data._id}`,data).pipe(  
    catchError(this.handleError)
  )
}
getStartupByUserId(userId: string |null|undefined): Observable<Startup> {
  return this.http.get<Startup>(`${this.baseUrl}/startups/${userId}`);
}

// Fetch the related investor based on user ID
getInvestorByUserId(userId: string |null|undefined): Observable<Investor> {
  return this.http.get<Investor>(`${this.baseUrl}/investors/${userId}`);
}

// Delete user by ID
delete(userId: string | null | undefined): Observable<any> {
  return this.http.delete(`${this.baseUrl}/users/${userId}`);
}

deleteStartupById(_id: string | null | undefined):Observable<any> {
  return this.http.delete<Startup>(`${this.baseUrl}/startup/${_id}`)
}

deleteInvestorById(_id: string | null | undefined):Observable<any> {
  return this.http.delete<Investor>(`${this.baseUrl}/investor/${_id}`)
}





}

