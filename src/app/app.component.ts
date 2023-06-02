import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';

import { Dropdown, Ripple, initTE } from 'tw-elements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'ria_lab';
  ngAfterViewInit() {
    initTE({ Dropdown, Ripple });
  }
}
