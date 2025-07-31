import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVenue } from './delete-venue';

describe('DeleteVenue', () => {
  let component: DeleteVenue;
  let fixture: ComponentFixture<DeleteVenue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteVenue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVenue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
