import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './company/company.component'
import { CalendarComponent } from './calendar/calendar.component';
import { FicheComponent } from './fiche/fiche.component';
import { ProduitComponent } from './produit/produit.component';
import { LocauxComponent } from './locaux/locaux.component';
import { DesinsectisationComponent } from './desinsectisation/desinsectisation.component';
import { DeratisationComponent } from './deratisation/deratisation.component';
import { FicheEntrepriseComponent } from './fiche-entreprise/fiche-entreprise.component';
import {TemplateComponent} from './template/template.component';
import { from } from 'rxjs';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'template/home',
    pathMatch: 'full'
  },
  {
    path: 'template/auth/login',
    component: LoginComponent
  },
  {
      path: 'template',
      component: TemplateComponent,
      children: [

        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'calendar',
          component: CalendarComponent
        },
        {
          path: 'produit',
          component: ProduitComponent
        },
        {
          path:'home/template/FicheEntreprise/:calanderid',
          component: FicheEntrepriseComponent
        },
        {
          path: 'home/template/fiche/:calanderid/:companyid/:userid',
          component: FicheComponent
        }, 
        {
          path: 'company',
          component: CompanyComponent
        },
        {
          path: 'home/template/fiche/:calanderid/:companyid/:userid/template/deratisation/:fichid/:companyid',
          component: DeratisationComponent
        },
        {
          path: 'home/template/fiche/:calanderid/:companyid/:userid/template/desinsectisation/:fichid/:companyid',
          component: DesinsectisationComponent
        },
        {
          path: 'company/template/locaux/:id',
          component: LocauxComponent
        },
        {
          path: 'user',
          component: UserComponent
        },
        {
          path: 'pm',
          component: PmComponent
        },
        {
          path: 'admin',
          component: AdminComponent
        },

        {
          path: 'signup',
          component: RegisterComponent
        }

      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
