import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { LinkToken } from '../interfaces/LinkToken';

@Injectable({
  providedIn: 'root'
})
export class PlaidService {

  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl ;


  getLinkToken(entryData: any): Observable<LinkToken> {
    return this.http.post<LinkToken>(`${this.apiUrl}/api/v1/link-token-auth`, entryData);
  }
}
