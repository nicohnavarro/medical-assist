import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.scss']
})
export class CustomFilterComponent implements OnInit {
  @Input()filterName:string;
  @Input()items:any[];
  allComplete: boolean = true;
  @Output() filterSet: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


  updateAllComplete() {
    this.allComplete = this.items != null && this.items.every(t => t.completed);
    let itemsSelected = this.items.filter(t => t.completed);
    this.filterSet.emit(itemsSelected);
  }

  someComplete(): boolean {
    if (this.items == null) {
      return false;
    }
    return this.items.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.items == null) {
      return;
    }
    this.items.forEach(t => t.completed = completed);
    completed ? this.filterSet.emit(this.items) : this.filterSet.emit([]);

  }

}
