import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVenue } from './show-venue';

describe('ShowVenue', () => {
  let component: ShowVenue;
  let fixture: ComponentFixture<ShowVenue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowVenue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVenue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
