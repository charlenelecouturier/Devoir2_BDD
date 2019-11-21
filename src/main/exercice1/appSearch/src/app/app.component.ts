import { Component , OnInit, OnDestroy} from '@angular/core';
import { CommonService } from './common.service';
import {NgForm} from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'appSearch';
  
Repdata;
champMot;
  constructor(private newService :CommonService){

  }
 ngOnInit(){

  this.newService.GetMonsters()
  .subscribe(
    res=>this.Repdata=res,
    err =>console.log(err)

  )
 }
 onFormSubmit(form: NgForm) {
   this.champMot=form.value;
  console.log(form.value);
}
 ngOnDestroy(){
  
  }

}


