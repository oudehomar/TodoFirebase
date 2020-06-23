import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName=sessionStorage.getItem('name')
  userId: string;
  constructor(public fAuth: AngularFireAuth, private router: Router) {

    this.fAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        // sessionStorage.setItem('name', user.displayName);
        console.log(user.displayName);

      } else {
        console.log('Something went wrong!');

      }
    });
  }

  ngOnInit(): void {

    this.delay();
    this.getUserInfo();

  }



  logout() {

    this.fAuth.signOut().catch(error => console.log(error));

    sessionStorage.removeItem('uid')
    sessionStorage.removeItem('name')
    // console.log('should be logged out');
    this.router.navigate(['/login'])

  }


  getUserInfo() {
    this.fAuth.onAuthStateChanged(user => {
      if (user) {
        this.userName = user.displayName;
        // sessionStorage.setItem('name', user.displayName);
        console.log(user.displayName);

      } else {
        console.log('Something went wrong!');

      }
    });
  }


  delay(){
    setTimeout(() => {
      }
      , 3000);
}

editProfile(){
  console.log(this.userId);

}
}
