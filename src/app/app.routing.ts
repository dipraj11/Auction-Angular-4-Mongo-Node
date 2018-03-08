import { Routes, RouterModule } from '@angular/router';

//Component Declarations

import { SearchScreenComponent } from './components/search-screen/search-screen.component'
import { LoginScreenComponent } from './components/login-screen/login-screen.component'
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { OwnerPanelComponent } from './components/owner-panel/owner-panel.component';
import { RegisterScreenComponent } from './components/register-screen/register-screen.component';
//Guards
// import { AuthGuardService } from "./services/auth-guard/auth-guard.service";


const appRoutes: Routes = [
    { path: '', component: LoginScreenComponent, pathMatch: 'full' },
    { path: 'admin', component: AdminPanelComponent, pathMatch: 'full' },
    { path: 'owner', component: OwnerPanelComponent, pathMatch: 'full' },
    { path: 'search', component: SearchScreenComponent },
    { path: 'register', component: RegisterScreenComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routings = RouterModule.forRoot(appRoutes);