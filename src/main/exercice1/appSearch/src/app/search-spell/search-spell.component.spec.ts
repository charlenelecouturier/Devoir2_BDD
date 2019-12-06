import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpellComponent } from './search-spell.component';

describe('SearchSpellComponent', () => {
  let component: SearchSpellComponent;
  let fixture: ComponentFixture<SearchSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
