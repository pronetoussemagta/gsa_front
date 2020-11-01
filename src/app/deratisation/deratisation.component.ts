import { Component, OnInit  , NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { DeratisationService } from '../services/deratisation.service';
import {deratisation} from './deratisation';
import {ProduitService} from '../services/produit.service';
import {LocauxService} from '../services/locaux.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService, ToasterConfig, Toast, ClickHandler, OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-deratisation',
  templateUrl: './deratisation.component.html',
  styleUrls: ['./deratisation.component.css']
})
export class DeratisationComponent implements OnInit {
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
  Deratisation: deratisation;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private zone:NgZone,
              private companyService: CompanyService,
              private deratisationService: DeratisationService,
              private produitService: ProduitService,
              private locauxService: LocauxService,
              private translateService: TranslateService,
              private toasterService: ToasterService,
              public ngxSmartModalService: NgxSmartModalService
 
  )
  { const keys = [
    'DERATIZATION.DERATIZATIONSUCCESSTITLE',
     'DERATIZATION.DERATIZATIONSUCCESSBODY',
     'DERATIZATION.DERATIZATIONERREURBODY'
  ];
   this.translateService.get(keys).subscribe(
   results => {
       this.successToasterTitle = results[keys[0]];
      this.successToasterBody = results[keys[1]];
      this.erreurToasterBody = results[keys[2]];

     }
  );}

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
      this.deratisationService.get(id).subscribe(data => {
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
    this.Deratisation = new deratisation(
      this.form.acceder,
      this.form.quantite);
 

    this.deratisationService.save(this.Deratisation,this.fi,this.selectedlocaux,this.selectedproduit).subscribe(
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
    this.deratisationService.remove(form).subscribe(result => {
      this.ngOnInit();
    }, error => console.error(error));
  }



}
