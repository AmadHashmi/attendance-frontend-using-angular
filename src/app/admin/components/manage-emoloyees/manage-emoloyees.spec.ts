import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmoloyees } from './manage-emoloyees';

describe('ManageEmoloyees', () => {
  let component: ManageEmoloyees;
  let fixture: ComponentFixture<ManageEmoloyees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmoloyees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmoloyees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
