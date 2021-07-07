import { LogsService } from './../../services/logs.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  typeOfUserFormCtrl = new FormControl('');

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  errorAccountMsg:string;
  errorMsg:string;
  errorAction:string;
  hide:boolean = true;
  loading:boolean = false;
  selected

  constructor(
    private authSvc: AuthService,
    private logSvc:LogsService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { 

    this.errorAccountMsg = localStorage.getItem('lang') == 'en' ?
    "There is an error with your credentials 🛂":
    "Hay un error con tus credenciales 🛂";

    this.errorAction = localStorage.getItem('lang') == 'en' ?
    "Go to Register ⬅️":
    "Registrarse ⬅️";

    this.errorMsg = localStorage.getItem('lang') == 'en' ?
    "There's been a problem ❌":
    "Ocurrio un problema ❌";
    }
    
  ngOnInit(): void {
  }

  onOptionsSelected() {
    switch (this.typeOfUserFormCtrl.value) {
      case 'admin':
        this.emailFormControl.setValue('admin@admin.com');
        this.passwordFormControl.setValue('123123');
        break;
      case 'patient':
        this.emailFormControl.setValue('patient@test.com');
        this.passwordFormControl.setValue('123123');
        break;
      case 'doctor':
        this.emailFormControl.setValue('doctor@test.com');
        this.passwordFormControl.setValue('123123');
        break;

      default:
        break;
    }

  }

  async logIn() {
    try {
      this.turnOnSpinner();
      const user = await this.authSvc.login(this.emailFormControl.value, this.passwordFormControl.value);
      if (!user) {
        this.openSnackBar(this.errorAccountMsg, this.errorAction);
      }
      else{
        localStorage.setItem("uid",user.uid);
        let log = { userId: user.uid, date: new Date()}
        this.logSvc.add(log).then(()=>{
          this.router.navigate(["main/home"]);
        })
      }
    }
    catch (err) {
      this.openSnackBar(this.errorMsg, this.errorAction);
    }

  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/register']);
    });
  }

  turnOnSpinner() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }

}
