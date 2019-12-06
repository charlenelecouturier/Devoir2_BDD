import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontBarComponent } from './front-bar.component';

describe('FrontBarComponent', () => {
  let component: FrontBarComponent;
  let fixture: ComponentFixture<FrontBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
