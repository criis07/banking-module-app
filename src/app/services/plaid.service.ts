import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { LinkToken } from '../interfaces/LinkToken';
import { AccessTokenResponse } from '../interfaces/AccessToken';
import { APIPlaidResponse } from '../interfaces/APIPlaidResponse';
import { TransactionPlaidResponse } from '../interfaces/TransactionPlaidResponse'; // Asegúrate de crear la interfaz Transaction si no existe.

@Injectable({
  providedIn: 'root'
})
export class PlaidService {

  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  getLinkToken(entryData: any): Observable<LinkToken> {
    return this.http
      .post<APIPlaidResponse<LinkToken>>(`${this.apiUrl}/api/v1/link-token-auth`, entryData)
      .pipe(
        map((response: APIPlaidResponse<LinkToken>) => {
          if (response.success) {
            return response.data as LinkToken;
          } else {
            throw new Error(response.error?.error_message || 'An unknown error occurred');
          }
        })
      );
  }

  getAccessToken(entryData: any): Observable<AccessTokenResponse> {
    return this.http
      .post<APIPlaidResponse<AccessTokenResponse>>(`${this.apiUrl}/api/v1/access-token-auth`, entryData)
      .pipe(
        map((response: APIPlaidResponse<AccessTokenResponse>) => {
          if (response.success) {
            return response.data as AccessTokenResponse;
          } else {
            throw new Error(response.error?.error_message || 'An unknown error occurred');
          }
        })
      );
  }

  getTransactions(startDate: string, endDate: string, countData: number, accessToken: string): Observable<TransactionPlaidResponse> {
    const url = `${this.apiUrl}/api/v1/transactions?start_date=${startDate}&end_date=${endDate}&count=${countData}&access_token=${accessToken}`;
    return this.http.get<APIPlaidResponse<TransactionPlaidResponse>>(url)
      .pipe(
        map((response: APIPlaidResponse<TransactionPlaidResponse>) => {
          if (response.success) {
            return response.data as TransactionPlaidResponse;
          } else {
            throw new Error(response.error?.error_message || 'An unknown error occurred');
          }
        })
      );
  }
}
