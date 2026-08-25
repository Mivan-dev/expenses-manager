import { Routes } from '@angular/router';
import { Auth } from './services/auth';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [Auth]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: '**',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    }
];
