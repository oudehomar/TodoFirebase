import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  email: string;
  password: string;
  isLogedIn = false;
  userId: any;
  constructor(public fAuth: AngularFireAuth, private router: Router) {
    if (sessionStorage.getItem('uid')) {
      console.log('there is a user From Login');
      this.router.navigate(['/todo']);
    } else {
      console.log('there is NOOOO user');
    }

  }

  ngOnInit(): void { }



  login() {
    this.fAuth.signInWithEmailAndPassword(this.email, this.password).catch(error => {
      this.error = error.message;
      console.log(error.code, ': ', error.message);
    });

    setTimeout(() => 3000);
    this.fAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        console.log('1111111');

        sessionStorage.setItem('uid', user.uid);
        // sessionStorage.setItem('name', user.displayName);

        console.log('222222');

        this.router.navigate(['/todo']);
      } else {
        this.router.navigate(['/login']);
      }
    });
    const useration: any | null = auth().currentUser;


    // auth().currentUser.updateProfile({ displayName: 'Omar' })


    if (useration) {
      console.log('yaaaaa man');
    }
    else {
      console.log('noooooo maaaan');

    }
  }
  logout() {
    console.log('1');
    this.fAuth.signOut().catch(error => console.log(error));
    console.log('2');

  }


  check(): void {
    // الحصول على الا id
    if (auth().currentUser) {
      console.log(auth().currentUser['uid']);
    }
    const useration: any | null = auth().currentUser;


    // auth().currentUser.updateProfile({ displayName: 'Omar' })


    if (useration) {
      console.log('yaaaaa man');
    }
    else {
      console.log('noooooo maaaan');

    }






  }
}
