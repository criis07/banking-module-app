import { Component, OnInit } from '@angular/core';
import { PlaidOnSuccessArgs } from 'ngx-plaid-link';
import { ShareDataService } from '../../services/share-data.service';
import { PlaidService } from '../../services/plaid.service';
import { TransactionDBService } from '../../services/transaction-db.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionResponseDB } from '../../interfaces/TransactionResponseDB';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions-grid-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './transactions-grid-form.component.html',
  styleUrls: ['./transactions-grid-form.component.css']
})
export class TransactionsGridFormComponent implements OnInit {
  plaidSuccessEvent!: PlaidOnSuccessArgs | null;
  selectedAccount: string | null = null; 
  transactions: TransactionResponseDB[] = []; // Cambiado a array para ser compatible con MatTable

  displayedColumns: string[] = [
    'transactionID',
    'date',
    'description',
    'amount',
    'currencyCode',
    'category',
    'status'
  ];

  constructor(
    private shareService: ShareDataService,
    private plaidService: PlaidService,
    private transactionDBService: TransactionDBService
  ) {}

  ngOnInit(): void {
    this.plaidSuccessEvent = this.shareService.getSuccessEvent();

    if (this.plaidSuccessEvent) {
      console.log('Datos del evento de éxito:', this.plaidSuccessEvent);
    } else {
      console.log('No se ha encontrado ningún evento de éxito.');
    }
    this.getTransactionsFromDataBase();
  }

  getTransactionsFromDataBase(): void {
    if (this.selectedAccount) {
      this.transactionDBService.getTransactionByAccountId(this.selectedAccount)
        .subscribe({
          next: (data: TransactionResponseDB[]) => { // Asegurarse de que data sea un array
            this.transactions = Array.isArray(data) ? data : []; // Asignar data solo si es array
            console.log('Transacciones recibidas:', this.transactions);
          },
          error: (error) => {
            console.error('Error al obtener las transacciones:', error);
          }
        });
    } else {
      console.warn('No se ha seleccionado ninguna cuenta.');
    }
  }
}
