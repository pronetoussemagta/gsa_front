import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichesDetailsComponent } from './fiches-details.component';

describe('FichesDetailsComponent', () => {
  let component: FichesDetailsComponent;
  let fixture: ComponentFixture<FichesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
