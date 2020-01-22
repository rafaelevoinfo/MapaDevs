import { Component, OnInit, Input } from '@angular/core';
import { Dev } from '../shared/dev.model';

@Component({
  selector: 'app-dev-item',
  templateUrl: './dev-item.component.html',
  styleUrls: ['./dev-item.component.scss']
})
export class DevItemComponent implements OnInit {

  @Input() dev: Dev;
  constructor() { 
    
  }

  ngOnInit() {
    
  }

}
