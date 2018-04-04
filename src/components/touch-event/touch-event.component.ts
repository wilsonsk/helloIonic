import { Component } from '@angular/core';

@Component({
  selector: 'app-touch-event',
  templateUrl: 'touch-event.component.html'
})
export class TouchEventComponent {
  onClick() {
    console.log('clicked/touched');
  }

  onTap() {
    console.log('tapped');
  }

  onPress() {
    console.log('pressed');
  }
}
