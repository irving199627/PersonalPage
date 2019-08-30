import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  email: String = '';
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router) {
      this.cargarStorage();
    }

  login(email, pass) {
    console.log('object');
    this.afAuth.auth.signInWithEmailAndPassword(email, pass).then((user: any) => {
      this.router.navigate(['/portafolio']);
      this.guardarStorage(user.user.email);
    });
  }

  guardarStorage(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.email = usuario;
  }

  estaLogeado() {
    return (this.email.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.email = localStorage.getItem('usuario');
    } else {
      this.email = '';
    }
  }

  logout() {
    this.email = '';
    localStorage.removeItem('usuario');
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/signup']));
  }

}
