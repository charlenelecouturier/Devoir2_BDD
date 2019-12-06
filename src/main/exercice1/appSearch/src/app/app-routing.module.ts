import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchSpellComponent } from './search-spell/search-spell.component';
import {SpellPageComponent} from './spell-page/spell-page.component';
const routes: Routes = [
  { path: '', component: SearchSpellComponent },
  { path: 'spell/:spellName', component: SpellPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
