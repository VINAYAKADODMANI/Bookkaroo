import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVenue } from './new-venue';

describe('NewVenue', () => {
  let component: NewVenue;
  let fixture: ComponentFixture<NewVenue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVenue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVenue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
