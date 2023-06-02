import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ria_lab';
  public isSlideOverOpen = false;

  openSlideOver() {
    this.isSlideOverOpen = true;
  }

  closeSlideOver() {
    this.isSlideOverOpen = false;
  }
}
