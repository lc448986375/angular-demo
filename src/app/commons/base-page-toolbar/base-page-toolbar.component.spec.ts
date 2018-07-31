import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePageToolbarComponent } from './base-page-toolbar.component';

describe('BasePageToolbarComponent', () => {
  let component: BasePageToolbarComponent;
  let fixture: ComponentFixture<BasePageToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasePageToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePageToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
