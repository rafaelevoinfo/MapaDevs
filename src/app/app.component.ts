import { Component, OnInit } from '@angular/core';
import { DevMapApiService } from './dev-map-api.service';
import { Observable, Subscription } from 'rxjs';
import { Dev } from './shared/dev.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  devSubscription:Subscription;

  constructor(private api: DevMapApiService) {

  }

  ngOnInit() {
    this.devSubscription = this.api.getDevs().subscribe(ipDevs => {
      //this.devs = ipDevs;
      this.api.devs = ipDevs;
    });    
  }

  ngOnDestroy(): void {
    if (this.devSubscription){
      this.devSubscription.unsubscribe();
    }
  }

}
