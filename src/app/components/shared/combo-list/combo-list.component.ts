import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-combo-list',
  templateUrl: './combo-list.component.html',
  styleUrls: ['./combo-list.component.scss']
})
export class ComboListComponent implements OnInit {
  @Input() lastSelection:boolean; 
  @Input() fieldName:string; 
  @Input() itemName:string; 
  @Input() myList:any[];
  @Output() selectedItem:EventEmitter<string> = new EventEmitter<string>();
  @Input() elementToShow:any;

  constructor() { }

  ngOnInit(): void {
  }


  onOptionsSelected(id:string){
    this.selectedItem.emit(id);
  }

}
