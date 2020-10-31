import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, ClickHandler, OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
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

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private toasterService: ToasterService,
    ) { 

      const keys = [
        'MEMBER.MEMBERSUCCESSTITLE',
         'MEMBER.MEMBERSUCCESSBODY',
         'MEMBER.MEMBERERREURBODY'
      ];
       this.translateService.get(keys).subscribe(
       results => {
           this.successToasterTitle = results[keys[0]];
          this.successToasterBody = results[keys[1]];
          this.erreurToasterBody = results[keys[2]];
  
         }
      );


    }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.address);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.toasterService.pop('success', this.successToasterTitle, this.successToasterBody);

        console.log(data);
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
}
