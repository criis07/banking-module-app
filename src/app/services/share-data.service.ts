import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaidOnSuccessArgs } from 'ngx-plaid-link';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private successEventSubject = new BehaviorSubject<PlaidOnSuccessArgs | null>(null);
  successEvent$ = this.successEventSubject.asObservable();

  // Método para actualizar el success event
  setSuccessEvent(event: PlaidOnSuccessArgs): void {
    this.successEventSubject.next(event);
  }

  // Método para obtener el success event actual
  getSuccessEvent(): PlaidOnSuccessArgs | null {
    return this.successEventSubject.getValue();
  }
}
