import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmCpComponent } from './cpm-cp.component';

describe('CpmCpComponent', () => {
  let component: CpmCpComponent;
  let fixture: ComponentFixture<CpmCpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpmCpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpmCpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
