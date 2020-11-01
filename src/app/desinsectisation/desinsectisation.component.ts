import { Component, OnInit  , NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { DesinsectisationService } from '../services/desinsectisation.service';
import {desinsectisation} from './desinsectisation';
import {ProduitService} from '../services/produit.service';
import {LocauxService} from '../services/locaux.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService, ToasterConfig, Toast, ClickHandler, OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-desinsectisation',
  templateUrl: './desinsectisation.component.html',
  styleUrls: ['./desinsectisation.component.css']
})
export class DesinsectisationComponent implements OnInit {
 /**
   * Success toaster title of members teams component
   */
  successToasterTitle: string;
  /**
   * Success toaster body of members teams component
   */
  successToasterBody: string;
  /**
   * Erreur toaster body of members teams component
   */
  erreurToasterBody: string;


  public selecteclass  = null;
  Desinsectisation: desinsectisation;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private zone:NgZone,
              private companyService: CompanyService,
              private desinsectisationService: DesinsectisationService,
              private produitService: ProduitService,
              private locauxService: LocauxService,
              public ngxSmartModalService: NgxSmartModalService,
              private translateService: TranslateService,
              private toasterService: ToasterService,

  )
  {

    const keys = [
      'DISINESCTION.DERATIZATIONSUCCESSTITLE',
       'DISINESCTION.DERATIZATIONSUCCESSBODY',
       'DISINESCTION.DERATIZATIONERREURBODY'
    ];
     this.translateService.get(keys).subscribe(
     results => {
         this.successToasterTitle = results[keys[0]];
        this.successToasterBody = results[keys[1]];
        this.erreurToasterBody = results[keys[2]];

       }
    );
   }

  gcs: any=null;
  niveaus: any=null;
  produits: any=null;
  fi : any =null ;
  g: any = {};

  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  delgc : any = {};

  gg : any = {};

  form: any = {};


  public selectedproduit = null;
  public selectedlocaux = null;

  ngOnInit() {
    this.loadData();
  }


  loadData(){
    this.route.params.subscribe(params => {
      const id = params['fichid'];
      this.fi = id ;
      const comid = params['companyid'];
      this.desinsectisationService.get(id).subscribe(data => {
        this.gcs = data;
        console.log( this.gcs);

      });
      this.locauxService.get(comid).subscribe(data => {
        this.niveaus = data;
        console.log( this.niveaus);

      });
    });
    this.produitService.getAll().subscribe(data => {
      this.produits = data;
      console.log(this.produits);
    });
  }



  onSubmit() {
    if(this.form.quantite==0){
      this.form.acceder = false
    }else{
      this.form.acceder=true
    }

    this.Desinsectisation = new desinsectisation(this.form.acceder,
      this.form.quantite);

    this.desinsectisationService.save(this.Desinsectisation,this.fi,this.selectedlocaux,this.selectedproduit).subscribe(
      data => {
        this.toasterService.pop('success', this.successToasterTitle, this.successToasterBody);
        this.ngOnInit();
        this.ngOnInit();
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.toasterService.pop('error', this.erreurToasterBody);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }






  remove(form: NgForm) {
    this.desinsectisationService.remove(form).subscribe(result => {
      this.loadData();
    }, error => console.error(error));
  }



}
