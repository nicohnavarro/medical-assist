import { Specialties } from './../../utils/specialties.enum';
import { MedicalSpecialty } from './../../models/MedicalSpecialty';
import { MedicalSpecialtiesService } from './../../services/medical-specialties.service';
import { EnumToArrayPipe } from './../../pipes/enum-to-array.pipe';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SpinnerModalComponent } from 'src/app/components/modals/spinner-modal/spinner-modal.component';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  file_uno: File;
  file_dos: File;
  specialties:MedicalSpecialty[];
  constructor(private authSvc: AuthService, private fileSvc: FileService, private userSvc: UserService,private medicalSpecialtiesSvc:MedicalSpecialtiesService, private _snackBar: MatSnackBar, private router: Router, public dialog: MatDialog,private enumToArray: EnumToArrayPipe) {
    this.medicalSpecialtiesSvc.getSpecialties().subscribe((specialties)=> {
      this.specialties = specialties;
    })
  }

  ngOnInit() { }

  async ObtenerUsuario(user: User) {
    this.openDialog();
    try{
      let cred = await this.Registrar(user).catch(err =>{throw err});
      if(cred){
        let task_1 = await this.fileSvc.UploadFile(this.file_uno, user.mail);
        let task_2 = await this.fileSvc.UploadFile(this.file_dos, user.mail);
        user.first_image = await task_1.ref.getDownloadURL();
        user.second_image = await task_2.ref.getDownloadURL();
        if(user.type === 'doctor'){
          await this.addDoctorToSpecialty(user.especializaciones);
        }
        this.userSvc.addUser(user,cred.user.uid).then((algo)=>{
          localStorage.setItem('uid',cred.user.uid);
          this.dialog.closeAll();
          this.router.navigate(['main/home']);
        }).catch(err => {console.log(err)});
      }
    }catch(err){
      this.dialog.closeAll();
      this.openSnackBar(err,"Uops!");
    }
  }

  async Registrar(user: User) {
    return await this.authSvc.register(user.mail, user.password).catch(err => { throw err });
  }

  GetImgDos(img: File) {
    this.file_uno = img;
  }

  GetImgUno(img: File) {
    this.file_dos = img
  }

  gotoLogin(){
    this.router.navigate(['login']);
  }

  async openDialog() {
    const dialogRef = this.dialog.open(SpinnerModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  async addDoctorToSpecialty(specialties:string[]){
    for(let i= 0; i< specialties.length; i++){
      let specialtyToUpdate = this.specialties.filter((specialty)=> specialty.name === specialties[i])[0];
      if(specialtyToUpdate.doctors){
        specialtyToUpdate.doctors = specialtyToUpdate.doctors+1
      }
      else{
        specialtyToUpdate.doctors = 1
      }
      await this.medicalSpecialtiesSvc.updateSpecialty(specialtyToUpdate,specialtyToUpdate.id);
    }
  }


  openSnackBar(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      //console.log('The snack-bar was dismissed');
    });

    snackBarRef.onAction().subscribe(() => {
      //console.log('The snack-bar action was triggered!');
      this.router.navigate(['/home']);
    });
  }
}
