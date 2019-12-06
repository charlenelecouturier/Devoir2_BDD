import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray,FormControl } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-search-spell',
  templateUrl: './search-spell.component.html',
  styleUrls: ['./search-spell.component.css']
})
export class SearchSpellComponent implements OnInit{
  title = 'appSearch';
  result={
   spells:[{name:""}],
    monsters:[{name:""}]
    };
form;
componentsdata;
classdata;
  constructor(private formBuilder: FormBuilder,private newService :CommonService
    ) { 
    this.componentsdata=[
      { id: 'V', name: 'Vocal' },
      { id:'S', name: 'Somatic' },
      { id: 'M', name: 'Material' },
    ];

    this.classdata=[
      { id: 'sorcerer/wizard', name: 'sorcerer/wizard' },
      { id:'ranger', name: 'ranger' },
      { id: 'summoner', name: 'summoner' },
      { id: 'inquisitor', name: 'inquisitor' },
      { id:'antipaladin', name: 'antipaladin' },
      { id: 'cleric/oracle', name: 'cleric/oracle' },
      { id: 'shaman', name: 'shaman' },
      { id:'alchemist', name: 'alchemist' },
      { id: 'witch', name: 'witch' },
      { id: 'druid', name: 'druid' },
      { id:'paladin', name: 'paladin' },
      { id: 'bard', name: 'bard' },
      { id:'magus', name: 'magus' },
      { id: 'bloodrager', name: 'bloodrager' },
    ];

    this.form = this.formBuilder.group({
      mots:'',
      level:'',
      component: new FormArray([]),
      class: new FormArray([]),
    
    
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.componentsdata.forEach((o, i) => {
      const control = new FormControl(false); // if first item set to true, else false
      (this.form.controls.component as FormArray).push(control);
    });

    this.classdata.forEach((o, i) => {
      const control = new FormControl(false); // if first item set to true, else false
      (this.form.controls.class as FormArray).push(control);
    });
  }

  onSubmit(data) {

   this.newService.getSpellsbyKeyWords(data);

    const selectedComponentsIds = data.component
    .map((v, i) =>v? this.componentsdata[i].id  : null)
    .filter(v => v !== null);
    
    const classIds = data.class
    .map((v, i) =>v? this.classdata[i].id  : null)
    .filter(v => v !== null);
    data.class=classIds;
    data.component=selectedComponentsIds;
    this.newService.getSpellsbyKeyWords(data).subscribe(
      res=> {
        console.log(res)
         this.result = res;
       }
     );;

  //alert(data.component);
  this.form.reset();
  }
  ngOnInit() {
  }

}
