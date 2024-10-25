import { Routes } from '@angular/router';
import { TransactionsGridFormComponent } from './components/transactions-grid-form/transactions-grid-form.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: 'transactionsForm', component: TransactionsGridFormComponent},
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
