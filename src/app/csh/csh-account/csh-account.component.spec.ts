import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CshAccountComponent } from './csh-account.component';

describe('CshAccountComponent', () => {
  let component: CshAccountComponent;
  let fixture: ComponentFixture<CshAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CshAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CshAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
