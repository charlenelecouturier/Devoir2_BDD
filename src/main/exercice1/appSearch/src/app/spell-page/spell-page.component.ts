import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../common.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-spell-page',
  templateUrl: './spell-page.component.html',
  styleUrls: ['./spell-page.component.css']
})
export class SpellPageComponent implements OnInit {

  result=[];

  constructor(private newService :CommonService,  
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    let spellName = this.route.snapshot.paramMap.get('spellName');
    console.log(spellName);
    var body = {spellName:spellName};
    this.newService.getSpell(body).subscribe(
      res=> {
        console.log(res)
         this.result = res;
         
       }
     );
  }
}
