import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { TransactionResponseDB } from '../interfaces/TransactionResponseDB';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIPlaidResponse } from '../interfaces/APIPlaidResponse';
import { CreateTransactionsDBResponse } from '../interfaces/CreateTransactionsDBResponse';

@Injectable({
  providedIn: 'root'
})
export class TransactionDBService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTransactionByAccountId(entryData: any): Observable<TransactionResponseDB[]> {
    return this.http
      .get<APIPlaidResponse<TransactionResponseDB[]>>(`${this.apiUrl}/api/v1/account/${entryData}/transactions`)
      .pipe(
        map((response: APIPlaidResponse<TransactionResponseDB[]>) => {
          if (response.success) {
            return response.data as TransactionResponseDB[]; // Devolvemos data como array de transacciones
          } else {
            throw new Error(response.error?.error_message || 'An unknown error occurred');
          }
        })
      );
  }

  CreateTransactionReconciliation(entryData: any): Observable<CreateTransactionsDBResponse> {
    return this.http
      .post<CreateTransactionsDBResponse>(`${this.apiUrl}/api/v1/transaction-reconciliation`, entryData)
      .pipe(
        map((response: CreateTransactionsDBResponse) => {
          if (response.success) {
            return response as CreateTransactionsDBResponse;
          } else {
            throw new Error('An unknown error occurred');
          }
        })
      );
  }
}
