import { Component, OnInit } from '@angular/core';
import { PlaidService } from '../../services/plaid.service';
import { Router } from '@angular/router';
import { LinkTokenDataEntry } from '../../interfaces/LinkTokenDataEntry';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { PlaidOnEventArgs, PlaidOnExitArgs, PlaidOnSuccessArgs } from 'ngx-plaid-link';
import { CommonModule } from '@angular/common';
import { AccessTokenDataEntry } from '../../interfaces/AccessTokenDataEntry';

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

  constructor(private plaidService: PlaidService, private router: Router) {
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

        // Paso 2: Una vez que se obtiene el link_token, abre Plaid Link
        const plaidLinkButton = document.getElementById('plaidLinkButton');
        if (plaidLinkButton) {
          plaidLinkButton.click(); // Simula el clic para abrir Plaid Link
        }
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

    // Paso 3: Llamar a PlaidService para intercambiar el public_token por el access_token
    this.plaidService.getAccessToken(this.plaidAuthPublicToken).subscribe(
      (response) => {
        const accessToken = response.access_token;

        // Guardar el access_token en localStorage
        localStorage.setItem('plaid_access_token', accessToken);
        console.log('Access Token almacenado en localStorage:', accessToken);

        // Opcional: puedes redirigir al usuario a otra página o realizar alguna acción
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
    // Maneja la lógica cuando se carga Plaid Link
  }

  onClick(event: any) {
    console.log({ click: event });
    // Maneja la lógica cuando el botón es clicado
  }
}
