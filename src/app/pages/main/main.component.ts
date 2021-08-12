import { UserService } from './../../services/user.service';
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
  loading: boolean = false;
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

    let patients: menuOption = {
      icon: "supervised_user_circle",
      title: "patients",
      router: "patients"
    }

    let schedules: menuOption = {
      icon: "access_time",
      title: "schedules",
      router: "schedules"
    }

    let history: menuOption = {
      icon: "access_time",
      title: "History",
      router: "history"
    }

    let reviews: menuOption = {
      icon: "assignment",
      title: "reviews",
      router: "reviews"
    }

    let charts: menuOption = {
      icon: "insert_chart",
      title: "statistics",
      router: "statistics"
    }
      switch (role) {
        case 'admin':
          this.menuOptions = [];
          this.menuOptions.push(home, profile, lists, addUser, shiftsLists, surveys, schedules, reviews, charts, addShift);
          break;
        case 'patient':
          this.menuOptions = [];
          this.menuOptions.push(home, profile, shiftsLists,history, reviews, addShift);
          break;
        case 'doctor':
          this.menuOptions = [];
          this.menuOptions.push(home, profile, patients,shiftsLists, surveys, schedules, reviews);
          break;
        default:
          this.menuOptions = [];
          break;
      }
  }
}


interface menuOption {
  icon: string,
  title: string,
  router: string
}


