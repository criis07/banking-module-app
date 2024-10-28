import { Component, OnInit } from '@angular/core';
import { PlaidOnSuccessArgs } from 'ngx-plaid-link';
import { ShareDataService } from '../../services/share-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions-grid-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-grid-form.component.html',
  styleUrl: './transactions-grid-form.component.css'
})
export class TransactionsGridFormComponent implements OnInit {
  plaidSuccessEvent!: PlaidOnSuccessArgs | null;
  selectedAccount: string | null = null; 
  constructor(private shareService : ShareDataService) {}

  ngOnInit(): void {
    // Obtener el success event del servicio
    this.plaidSuccessEvent = this.shareService.getSuccessEvent();

    if (this.plaidSuccessEvent) {
      console.log('Datos del evento de éxito:', this.plaidSuccessEvent);
    } else {
      console.log('No se ha encontrado ningún evento de éxito.');
    }
  }
}