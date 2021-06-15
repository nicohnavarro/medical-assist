import { IUser } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';

@Component({  
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user:IUser; 
  menuOptions:menuOption[];
  constructor() {
    this.menuOptions = [];
    this.buildMenu("sad");
  }

  ngOnInit(): void {
  }

  buildMenu(role:string){
    let home:menuOption = {
      icon:"home",
      title:"home",
      router:"home"
    }

    let profile:menuOption = {
      icon:"build",
      title:"profile",
      router:"profile"
    }

    let lists:menuOption = {
      icon:"group",
      title:"lists",
      router:"lists"
    }

    let addUser:menuOption = {
      icon:"add",
      title:"addUser",
      router:"addUser"
    }


    let addShift:menuOption = {
      icon:"date_range",
      title:"addShift",
      router:"addShift"
    }

    let shiftsLists:menuOption = {
      icon:"list_alt",
      title:"shifts",
      router:"shiftsList"
    }

    let surveys:menuOption = {
      icon:"assignment_late",
      title:"surveys",
      router:"surveys"
    }

    let schedules:menuOption = {
      icon:"access_time",
      title:"schedules",
      router:"schedules"
    }

    let reviews:menuOption = {
      icon:"assignment",
      title:"reviews",
      router:"reviews"
    }

    let charts:menuOption = {
      icon:"insert_chart",
      title:"charts",
      router:"charts"
    }



    this.menuOptions.push(home,profile,lists,addUser,shiftsLists,surveys,schedules,reviews,charts,addShift);

  }
}


interface menuOption {
  icon:string,
  title:string,
  router:string
}


