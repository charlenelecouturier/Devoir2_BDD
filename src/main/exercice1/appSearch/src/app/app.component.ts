import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'appSearch';
  
form;

  constructor(private formBuilder: FormBuilder,private newService :CommonService
    ) { 
    

    this.form = this.formBuilder.group({
      mots:'',
    });
  }

  onSubmit(data) {
   alert(data.mots);
   this.newService.getSpellsbyKeyWords(data.mots);
    this.form.reset();
  }

  ngOnInit() {
  }

}