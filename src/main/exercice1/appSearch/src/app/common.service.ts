import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http :HttpClient) { }


getSpell(spellName){
  return this.http.post<any>('http://localhost:3000/api/getSpell',spellName);
}

getSpellsbyKeyWords(mots){
  return this.http.post<any>('http://localhost:3000/api/Search',mots);
}
}
