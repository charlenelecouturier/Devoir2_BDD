import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellPageComponent } from './spell-page.component';

describe('SpellPageComponent', () => {
  let component: SpellPageComponent;
  let fixture: ComponentFixture<SpellPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
