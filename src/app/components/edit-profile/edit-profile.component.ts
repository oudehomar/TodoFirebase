import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, storage } from 'firebase/app';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  uid: string;
  useration: any;
  newName: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  profileUrl: Observable<string | null>;


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  imgURL2: string;
  constructor(private fAuth: AngularFireAuth, private route: ActivatedRoute, private store: AngularFireStorage, private router: Router) {
  }

  ngOnInit(): void {

    this.uid = this.route.snapshot.paramMap.get('uid');
    this.fAuth.onAuthStateChanged(user => {
      if (user) {
        this.useration = user;
        console.log('From Here:' + user.photoURL);
      } else {
        console.log('Something went wrong!');
        this.router.navigate(['/login']);

      }
    });

  }

  update() {
    setTimeout(() => 20000);

    if (this.imgURL2 != null || undefined) {
      auth().currentUser.updateProfile({
        displayName: this.newName,
        photoURL: this.imgURL2
      }).catch(error => console.log(error)
      );

    }

    else {
      auth().currentUser.updateProfile({
        displayName: this.newName,
      }).catch(error => console.log(error));
    }

  }

  upload(event) {
    const id = Math.random().toString(36);
    this.ref = this.store.ref(this.uid + '/profilePicture/' + id);
    this.task = this.ref.put(event.target.files[0]);
    console.log('uploaded?');

    this.uploadPercent = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.ref.getDownloadURL()))
      .subscribe();
    this.downloadURL.subscribe(u => this.imgURL2 = u);

  }



  print() {
    this.downloadURL.subscribe(u => this.imgURL2 = u);
    console.log('URL: ' + this.imgURL2);

  }
}

