import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTabMenusComponent } from './app-tab-menus.component';

describe('AppTabMenusComponent', () => {
  let component: AppTabMenusComponent;
  let fixture: ComponentFixture<AppTabMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTabMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTabMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
