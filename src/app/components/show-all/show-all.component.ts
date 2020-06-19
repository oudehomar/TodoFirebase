import { Router } from '@angular/router';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, storage } from 'firebase/app';
import { Observable, pipe } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Todo } from 'src/app/model/todo';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {

  todos: any | any[] | Observable<any> | Observable<any[]> | Observable<any> | Observable<any>;

  showAddTodo = false;

  todoFromClass: Todo = new Todo();
  userid: string;

  task: string;
  description: string;
  date: string;
  done = false;

  constructor(public firestore: AngularFirestore, public fAuth: AngularFireAuth, private router: Router) {
    // الطريقة الحالية لفحص اذا اليوزر مسجل دخول
    fAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('There is a user logged in')
        this.userid = user.uid;
        sessionStorage.setItem('uid', user.uid);
      } else {
        console.log('No User is logged in ');
        router.navigate(['/login']);
      }
    });

    this.getData();

  }
  ngOnInit(): void { }

  getData() {

    this.firestore.collection('users').doc(sessionStorage.getItem('uid')).collection('todo').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(doc => {
            return {
              id: doc.payload.doc.id,
              data: doc.payload.doc.data()
            };
          });
        })
      ).subscribe(todo => {
        this.todos = todo;
      });

  }



  addTodo() {
    this.firestore.collection('users').doc(this.userid).collection('todo').add({
      task: this.task, description: this.description, date: this.date, done: this.done
    }).catch(error => console.log(error)
    );


    console.log('check if its been added');
    this.task = undefined;
    this.description = undefined;
    this.date = undefined;
    this.done = undefined;
  }

  showForm() {
    this.showAddTodo = !this.showAddTodo;

    // const useration: any | null = auth().currentUser;

    // if (useration) {
    //   console.log('yaaaaa man');
    //   console.log(useration.uid);
    //   this.userid = useration.uid;
    // }
    // else {
    //   console.log('noooooo maaaan');
    // }
  }



}
