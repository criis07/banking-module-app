import { Component, OnInit } from '@angular/core';
import { PlaidOnSuccessArgs } from 'ngx-plaid-link';
import { ShareDataService } from '../../services/share-data.service';
import { PlaidService } from '../../services/plaid.service';
import { TransactionDBService } from '../../services/transaction-db.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionResponseDB } from '../../interfaces/TransactionResponseDB';
import { MatTableModule } from '@angular/material/table';
import { TransactionPlaidResponse } from '../../interfaces/TransactionPlaidResponse';
import Swal from 'sweetalert2';

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
  transactions: TransactionResponseDB[] = [];
  transactionsPlaid!: TransactionPlaidResponse | null;
  startDate: string = '';
  endDate: string = '';
  selectedCount: number = 100;

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
  }

  getTransactions(): void {
    const accessToken = localStorage.getItem('plaid_access_token');
    if (accessToken) {
      console.log("hola desde get transaccions");
      this.plaidService.getTransactions(this.startDate, this.endDate, this.selectedCount, accessToken)
        .subscribe({
          next: (data: TransactionPlaidResponse) => {
            this.transactionsPlaid = data;
            console.log('Transacciones recibidas de plaid:', this.transactionsPlaid);

            if (this.transactionsPlaid && this.transactionsPlaid.total_transactions) {
              Swal.fire({
                title: 'Información',
                text: `Total de transacciones recibidas: ${this.transactionsPlaid.total_transactions}`,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Reconciliar',
                cancelButtonText: 'Cerrar'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.transactionDBService.CreateTransactionReconciliation(this.transactionsPlaid)
                    .subscribe({
                      next: (response) => {
                        Swal.fire('Éxito', `La reconciliación de transacciones se completó correctamente. Descargas con éxito: ${response.downloaded_transactions}`, 'success');
                      },
                      error: (error) => {
                        console.error('Error en la reconciliación de transacciones:', error);
                        Swal.fire('Error', 'Hubo un problema en la reconciliación de transacciones.', 'error');
                      }
                    });
                }
              });
            }
          },
          error: (error) => {
            console.error('Error al obtener las transacciones de plaid:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al obtener las transacciones.',
              icon: 'error',
              confirmButtonText: 'Intentar de nuevo'
            });
          }
        });
    } else {
      console.warn('No se ha seleccionado ninguna cuenta o no hay token de acceso disponible.');
      Swal.fire({
        title: 'Advertencia',
        text: 'No se ha seleccionado ninguna cuenta o no hay token de acceso disponible.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
    }
  }

  getTransactionsFromDataBase(): void {
    if (this.selectedAccount) {
      this.transactionDBService.getTransactionByAccountId(this.selectedAccount)
        .subscribe({
          next: (data: TransactionResponseDB[]) => {
            this.transactions = Array.isArray(data) ? data : [];
            console.log('Transacciones recibidas desde la base de datos:', this.transactions);
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
