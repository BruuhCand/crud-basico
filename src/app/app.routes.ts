import { Routes } from '@angular/router';
import { CadastroPrincipalComponent } from './components/cadastro-principal/cadastro-principal.component';
import { ListagemUserComponent } from './components/listagem-user/listagem-user.component';

export const routes: Routes = [
    {path: '', component: CadastroPrincipalComponent, children:[
        {path: 'lista', component: ListagemUserComponent},
    ]},
];
