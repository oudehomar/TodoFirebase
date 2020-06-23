import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  uid: string;
  useration: any;
  constructor(private fAuth: AngularFireAuth, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.fAuth.onAuthStateChanged(user => {
      if (user) {
        this.useration = user;


      } else {
        console.log('Something went wrong!');

      }
    });



  }

}
