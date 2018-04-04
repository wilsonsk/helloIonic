import { Component } from '@angular/core';
import { reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {
  items = ["TestItem1", "TestItem2", "TestItem3"];

  reorderItems(indexes) {
    this.items = reorderArray(this.items, indexes);
  }

}
