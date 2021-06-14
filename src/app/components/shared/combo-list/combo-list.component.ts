import { UserService } from './../../../services/user.service';
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
  sorry:string= 'Disculpas no pudimos encontrar tu seleccion'

  constructor(private userSvc:UserService) { }

  ngOnInit(): void {
  }


  onOptionsSelected(id:string){
    this.selectedItem.emit(id);
  }

}
