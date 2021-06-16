import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public user;

  constructor(public afAuth:AngularFireAuth) { }

  async login(email:string, password:string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email,password);
      this.user =result.user;
      return result.user;
    }
    catch(err){
      throw err;
    }
  }

  async register(email:string,password:string){
      const result = await this.afAuth.createUserWithEmailAndPassword(email,password).catch(err=> {throw err});
      this.enviarMailRegistro();
      this.user =result.user;
      return result;
  }

  async logout(){
    try{
      await this.afAuth.signOut();
      this.user = null;
    }
    catch(err){
      console.log(err);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  public enviarMailRegistro(){
    this.afAuth.currentUser.then( resp => {
      resp.sendEmailVerification({
        handleCodeInApp: true,
        url: 'http://localhost:4200/login'
      });
    });
  }
}
