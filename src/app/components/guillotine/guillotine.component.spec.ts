import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuillotineComponent } from './guillotine.component';

describe('GuillotineComponent', () => {
  let component: GuillotineComponent;
  let fixture: ComponentFixture<GuillotineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuillotineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuillotineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
