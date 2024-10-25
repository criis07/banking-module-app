import { Component, OnInit } from '@angular/core';
import { PlaidService } from '../../services/plaid.service';
import { Router } from '@angular/router';
import { LinkTokenDataEntry } from '../../interfaces/LinkTokenDataEntry';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  plaidAuthData: LinkTokenDataEntry;

constructor(private plaidService : PlaidService, private router: Router){
  this.plaidAuthData = {
    user_id: "1"
  };
}

 ngOnInit(): void {

}
  authPlaid() : void {
    this.plaidService.getLinkToken(this.plaidAuthData).subscribe(response => {
      console.log(response)
    });
  }

}

