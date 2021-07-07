import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { User } from 'src/app/models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user: User;
  menuOptions: menuOption[];
  constructor(private userSvc: UserService) {
    this.menuOptions = [];
    if (localStorage.getItem('uid')) {
      this.userSvc.getById(localStorage.getItem('uid')).subscribe((data) => {
        this.user = data;
        this.buildMenu(data.type);
      })
    }
  }

  ngOnInit(): void {
  }

  buildMenu(role: string) {
    let home: menuOption = {
      icon: "home",
      title: "home",
      router: "home"
    }

    let profile: menuOption = {
      icon: "build",
      title: "profile",
      router: "profile"
    }

    let lists: menuOption = {
      icon: "group",
      title: "lists",
      router: "lists"
    }

    let addUser: menuOption = {
      icon: "add",
      title: "addUser",
      router: "addUser"
    }


    let addShift: menuOption = {
      icon: "date_range",
      title: "addShift",
      router: "addShift"
    }

    let shiftsLists: menuOption = {
      icon: "list_alt",
      title: "shifts",
      router: "myShifts"
    }

    let surveys: menuOption = {
      icon: "assignment_late",
      title: "surveys",
      router: "surveys"
    }

    let schedules: menuOption = {
      icon: "access_time",
      title: "schedules",
      router: "schedules"
    }

    let reviews: menuOption = {
      icon: "assignment",
      title: "reviews",
      router: "reviews"
    }

    let charts: menuOption = {
      icon: "insert_chart",
      title: "charts",
      router: "charts"
    }

    switch (role) {
      case 'Admin':
        this.menuOptions.push(home, profile, lists, addUser, shiftsLists, surveys, schedules, reviews, charts, addShift);
        break;
      case 'Patient':
        this.menuOptions.push(home, profile, shiftsLists, reviews, addShift);
        break;
      case 'Doctor':
        this.menuOptions.push(home, profile, shiftsLists, surveys, schedules, reviews, addShift);
        break;
      default:
        break;
    }


  }
}


interface menuOption {
  icon: string,
  title: string,
  router: string
}


