import { Component, OnInit } from '@angular/core';
import { PlaidService } from '../../services/plaid.service';
import { Router } from '@angular/router';
import { LinkTokenDataEntry } from '../../interfaces/LinkTokenDataEntry';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { PlaidOnEventArgs, PlaidOnExitArgs, PlaidOnSuccessArgs } from 'ngx-plaid-link';
import { CommonModule } from '@angular/common';
import { AccessTokenDataEntry } from '../../interfaces/AccessTokenDataEntry';
import { ShareDataService } from '../../services/share-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxPlaidLinkModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  linkToken: string = '';
  tokenFetched: boolean = false;
  plaidAuthData: LinkTokenDataEntry;
  plaidAuthPublicToken!: AccessTokenDataEntry;

  constructor(private plaidService: PlaidService, private shareDataService: ShareDataService , private router: Router) {
    this.plaidAuthData = {
      user_id: '1',
    };
  }

  ngOnInit(): void {}

  authPlaid(): void {
    // Paso 1: Obtener el link_token
    this.plaidService.getLinkToken(this.plaidAuthData).subscribe(
      (response) => {
        console.log(response);
        this.linkToken = response.link_token; // Asumiendo que la respuesta contiene el link_token
        this.tokenFetched = true;

        
      },
      (error) => {
        console.error('Error fetching link token', error);
      }
    );
  }

  onSuccess(event: PlaidOnSuccessArgs) {
    console.log({ success: event });
    
    this.plaidAuthPublicToken = {
      public_token: event.metadata.public_token,
    };

    this.shareDataService.setSuccessEvent(event);

    this.plaidService.getAccessToken(this.plaidAuthPublicToken).subscribe(
      (response) => {
        const accessToken = response.access_token;
        console.log(response);
        // Save access_token in localStorage
        localStorage.setItem('plaid_access_token', accessToken);
        console.log('Access Token almacenado en localStorage:', accessToken);

        this.router.navigate(['/transactionsForm']);
      },
      (error) => {
        console.error('Error al obtener el access token', error);
      }
    );
  }

  onEvent(event: PlaidOnEventArgs) {
    console.log({ event });
    // Maneja eventos de Plaid Link aquí
  }

  onExit(event: PlaidOnExitArgs) {
    console.log({ error: event });
    // Maneja la lógica cuando el usuario sale del enlace
  }

  onLoad(event: any) {
    console.log({ load: event });
    // Paso 2: Una vez que se obtiene el link_token, abre Plaid Link
    const plaidLinkButton = document.getElementById('plaidLinkButton');
    if (plaidLinkButton) {
      plaidLinkButton.click(); 
    }
  }

  onClick(event: any) {
    console.log({ click: event });
    // Maneja la lógica cuando el botón es clicado
  }
}
