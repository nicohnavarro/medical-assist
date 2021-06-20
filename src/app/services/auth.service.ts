import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user;

  constructor(public afAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.user = result.user;
      return result.user;
    }
    catch (err) {
      throw err;
    }
  }

  async register(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password).catch(err => { throw err });
    this.sendResgistrationMail();
    this.user = result.user;
    return result;
  }

  async logOut() {
    try {
      await this.afAuth.signOut();
      this.user = null;
    }
    catch (err) {
      throw err;
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  public sendResgistrationMail() {
    this.afAuth.currentUser.then(resp => {
      resp.sendEmailVerification({
        handleCodeInApp: true,
        url: 'http://localhost:4200/login'
      });
    });
  }
}
