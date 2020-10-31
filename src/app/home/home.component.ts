import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

import {CalendarService} from '../services/calendar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  info: any;
    constructor(private token: TokenStorageService,
      private datepipe: DatePipe,
      private calendarService:CalendarService,
      private router: Router
      ) { }
 
      niveaus: Array<any>;
  ngOnInit() {
   let myDate = new Date() 
   let k =this.datepipe.transform(myDate, 'yyyy-MM-dd');
   let newdDate =new Date( k+' 01:00:00');

    this.calendarService.gettest(1,newdDate).subscribe(data => {
      this.niveaus = data;
      console.log(this.niveaus);
    });

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if(!this.info.token){
      console.log('a')
      this.router.navigate(['template/auth/login']);

  }
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
