import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VelosComponent} from "./velos/velos.component";
import {AjoutVeloComponent} from "./ajout-velo/ajout-velo.component";
import {MajVeloComponent} from "./maj-velo/maj-velo.component";
import {LoginComponent} from "./login/login.component";
import {VeloGuard} from "./velo.guard";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {RechercheParTypeComponent} from "./recherche-par-type/recherche-par-type.component";
import {RechercheParNomComponent} from "./recherche-par-nom/recherche-par-nom.component";
import {ListeTypesComponent} from "./liste-types/liste-types.component";
import {RegisterComponent} from "./register/register.component";
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  {path: "velos", component: VelosComponent},
  {path: "ajout-velo", component: AjoutVeloComponent, canActivate: [VeloGuard]},
  {path: "maj-velo/:id", component: MajVeloComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "rechercheParType", component: RechercheParTypeComponent},
  {path: "rechercheParNom", component: RechercheParNomComponent},
  {path: "listeTypes", component: ListeTypesComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
