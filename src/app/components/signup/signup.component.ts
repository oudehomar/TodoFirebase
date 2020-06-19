import { Component, OnInit } from '@angular/core';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  email: string;
  password: string;
  name: string;
  error: string;

  // auth().currentUser.updateProfile({ displayName: 'Omar' })

  constructor(public fAuth: AngularFireAuth, private router: Router) {
    if (sessionStorage.getItem('uid') !== null) {
      // console.log('there is a user');
      this.router.navigate(['/todo']);

    } else {
      // console.log('there is NOOOO user');
    }
  }

  ngOnInit(): void { }




  signup() {

    this.fAuth.createUserWithEmailAndPassword(this.email, this.password).catch(error => {
      this.error = error.message;
      console.log(error.code, error.message);
      sessionStorage.removeItem('name');
      this.name = undefined;
    }).then(()=>{
      this.router.navigate(['/signup'])
    });
    sessionStorage.setItem('name', this.name);
    // console.log('user created?');

    auth().onAuthStateChanged(user => {
      user.updateProfile({ displayName: this.name }).catch(err => console.log(err));
    });
    // setTimeout(() => 2000);
    // this.go_next();
  }


  go_next() {
    setTimeout(() => {
      this.router.navigate(['todo'])
    }
      , 2000);
  }
}
