import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from "angular-6-datatable";
import { DatePipe } from '@angular/common';
import { DatePickerModule} from '@syncfusion/ej2-angular-calendars';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ToasterModule,ToasterService } from 'angular2-toaster';

import {ScheduleModule} from '@syncfusion/ej2-angular-schedule';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';
import { CompanyComponent } from './company/company.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FicheComponent } from './fiche/fiche.component';
import { ProduitComponent } from './produit/produit.component';
import { LocauxComponent } from './locaux/locaux.component';
import { DeratisationComponent } from './deratisation/deratisation.component';
import { DesinsectisationComponent } from './desinsectisation/desinsectisation.component';
import { AficheComponent } from './afiche/afiche.component';
import { FichesDetailsComponent } from './fiches-details/fiches-details.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { HeaderComponent } from './header/header.component';
import { TemplateComponent } from './template/template.component';

import {CompanyService} from './services/company.service';
import {FicheService} from './services/fiche.service';
import { FicheEntrepriseComponent } from './fiche-entreprise/fiche-entreprise.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "/assets/internationalization/", ".json");
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    CompanyComponent,
    CalendarComponent,
    FicheComponent,
    ProduitComponent,
    LocauxComponent,
    DeratisationComponent,
    DesinsectisationComponent,
    AficheComponent,
    FichesDetailsComponent,
    LeftNavComponent,
    HeaderComponent,
    TemplateComponent,
    FicheEntrepriseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ScheduleModule,
    DatePickerModule,
    DataTableModule,
    ToasterModule,
    BrowserAnimationsModule,
    NgxSmartModalModule.forRoot() ,
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),


  ],
  providers: [httpInterceptorProviders,CompanyService,ToasterService,FicheService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
