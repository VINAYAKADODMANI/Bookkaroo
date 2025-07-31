import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingService, SlotData } from '../services/booking.service';
import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent implements OnInit {
  bookingForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  venuePhoto = 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=800';

  minFromDate: string = '';
  minToDate: string = '';

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {
    this.route.paramMap.subscribe(params => {
      const vid = params.get('venueid');
      //alert('from booking'+vid)
     this.venueIdFromRoute = vid ;
    });
    this.bookingForm = this.createForm();
  }

  venueIdFromRoute: string | null = null;
  ngOnInit(): void {

    

console.log('Venue ID from route:', this.venueIdFromRoute);
    const tomorrow = this.getTomorrow();
    this.minFromDate = tomorrow;
    this.minToDate = tomorrow;
  
    this.bookingForm.patchValue({
      slotdate: tomorrow,
      toDate: tomorrow  // same as fromDate
    });
  
    //  Update minToDate when fromDate changes
    this.bookingForm.get('slotdate')?.valueChanges.subscribe((value: string) => {
      if (value) {
        this.minToDate = value; // ToDate can't be before fromDate
        const currentToDate = this.bookingForm.get('toDate')?.value;
        if (new Date(currentToDate) < new Date(value)) {
          this.bookingForm.patchValue({ toDate: value });
        }
      }
    });
  }
  
  private getTomorrow(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  }

  private getNextDay(dateStr: string): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }

  private createForm(): FormGroup {
    const fromDate = this.getTomorrow();
  
    return this.fb.group({
      //venueid: [1, [Validators.required]],
      slotdate: [fromDate, [Validators.required]],
      toDate: [fromDate], // 
      starttime: ['09:00:00', [Validators.required]],
      endtime: ['17:00:00', [Validators.required]],
      rate: [0, [Validators.required]],
      duration: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
    }, {
      validators: [this.dateTimeValidator, this.timeValidator]
    });
  }
  

  private dateTimeValidator(group: FormGroup) {
    const fromDate = group.get('slotdate')?.value;
    const toDate = group.get('toDate')?.value;
    const fromTime = group.get('starttime')?.value;
    const toTime = group.get('endtime')?.value;

    if (!fromDate || !toDate || !fromTime || !toTime) return null;

    const fromDateTime = new Date(`${fromDate}T${fromTime}`);
    const toDateTime = new Date(`${toDate}T${toTime}`);

    if (fromDateTime >= toDateTime) {
      return { invalidDateTimeRange: true };
    }

    return null;
  }

  private timeValidator(group: FormGroup) {
    const fromTime = group.get('starttime')?.value;
    const toTime = group.get('endtime')?.value;
    const fromDate = group.get('slotdate')?.value;
    const toDate = group.get('toDate')?.value;

    if (!fromTime || !toTime || !fromDate || !toDate) return null;

    if (fromDate === toDate && fromTime >= toTime) {
      return { invalidTimeRange: true };
    }

    return null;
  }

  getFieldError(fieldName: string): string {
    const field = this.bookingForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    const errors = field.errors;

    if (errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
    if (errors['min']) return `${this.getFieldLabel(fieldName)} must be greater than ${errors['min'].min}`;
    if (errors['max']) return `${this.getFieldLabel(fieldName)} cannot exceed ${errors['max'].max}`;

    return '';
  }

  getFormError(): string {
    const formErrors = this.bookingForm.errors;
    if (!formErrors) return '';

    if (formErrors['invalidDateTimeRange']) {
      return 'End date and time must be after start date and time';
    }
    if (formErrors['invalidTimeRange']) {
      return 'End time must be after start time';
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      slotdate: 'From Date',
      toDate: 'To Date',
      starttime: 'From Time',
      endtime: 'To Time',
      rate: 'Price',
      duration: 'Duration',
      venueid: 'Venue ID'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bookingForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  onSubmit(): void {
    if (this.bookingForm.invalid || this.venueIdFromRoute === null) {
      this.markAllFieldsAsTouched();
      if (this.venueIdFromRoute === null) {
        this.submitError = 'Venue ID not specified!';
      }
      return;
    }
    this.isSubmitting = true;
    this.submitError = '';
  
    const formValue = this.bookingForm.value;
  
    const slotData: SlotData = {
      venueId: this.venueIdFromRoute,
      slotdate: formValue.slotdate,
      toDate: formValue.toDate,
      starttime: formValue.starttime,
      endtime: formValue.endtime,
      rate: formValue.rate != null ? parseFloat(formValue.rate) : 0,
      duration: formValue.duration != null ? parseInt(formValue.duration, 10) : 1
    };
  
    this.bookingService.checkDuplicateSlot(
      slotData.venueId!,
      slotData.slotdate,
      slotData.starttime
    ).subscribe({
      next: (response) => {
        console.log('Duplicate check response:', response.exists);
        if (response.exists) {
         this.toastr.warning('A slot already exists for this date and time.', 'Duplicate Slot');
          this.isSubmitting = false;
         return; // <<< STOP processing here if duplicate exists
        }
  
        // No duplicate found: proceed to create slot
       
          this.bookingService.createSlot(slotData).subscribe({
            next: () => {
              this.submitSuccess = true;
              this.isSubmitting = false;
             this.toastr.success('Slot created successfully!', 'Success');
              setTimeout(() => this.router.navigate(['/show-venues']), 1000);
            },
            error: (error) => {
              this.isSubmitting = false;
             this.toastr.error('Failed to create slot. Please try again.', 'Error');
              console.error('Error creating slot:', error);
            }
          });
        
      },
      error: (err) => {
        this.isSubmitting = false;
        this.toastr.error('Could not check for duplicate slots.', 'Error');
        console.error('Error checking for duplicate:', err);
      }
    });
  }
  
  
  
  // deleteHandler(): void {
  //   const formValue = this.bookingForm.value;

  //   this.bookingService.deleteSlot(formValue.venueid).subscribe({
  //     next: () => {
  //       this.toastr.warning('Slot deleted successfully!', 'Deleted');
  //       this.submitSuccess = false;
  //       this.submitError = '';
  //       setTimeout(() => this.router.navigate(['/owner-dashboard']), 1500);
  //     },
  //     error: () => {
  //       this.toastr.error('Please try again .', 'Not Found');
  //       this.isSubmitting = false;
  //     }
  //   });
  // }


  // delete on the slottemp and slot table

  deleteHandler(): void {
    if (this.venueIdFromRoute === null) {
     this.toastr.error('Navigating to Dashboard!');
      setTimeout(() => this.router.navigate(['/venues']), 1500);
     // this.router.navigate(['/venues'])
      return;
    }
    const formValue = this.bookingForm.value;
  
    const venueid = this.venueIdFromRoute;
    console.log("venueid", venueid);
    const slotdate = formValue.slotdate; // format: 'YYYY-MM-DD'
    const starttime = formValue.starttime; // format: 'HH:mm:ss'
  
    this.isSubmitting = true;
  
    // Delete from main Slot table
    this.bookingService.deleteSlot(venueid).subscribe({
      next: () => {
       this.toastr.warning('Slot deleted ', 'Deleted');
  
        // Now delete from SlotTemp
        this.bookingService.deleteSlotTemp(venueid, slotdate, starttime).subscribe({
          next: () => {
            this.toastr.success('Slot also deleted from SlotTemp.', 'Deleted');
            this.submitSuccess = false;
            this.submitError = '';
            this.isSubmitting = false;
            setTimeout(() => this.router.navigate(['/venues']), 1500);
          },
          error: () => {
           this.toastr.error('Failed to delete .', 'Error');
            this.isSubmitting = false;
          }
        });
      },
      error: () => {
       this.toastr.error('Failed to delete from Slot table.', 'Error');
        this.isSubmitting = false;
      }
    });
  }
  


  resetForm(): void {
    const tomorrow = this.getTomorrow();
    const nextDay = this.getNextDay(tomorrow);

    this.bookingForm.reset();
    this.bookingForm.patchValue({
      slotdate: tomorrow,
      toDate: nextDay,
      starttime: '09:00:00',
      endtime: '17:00:00',
      rate: 0,
      venueid: 1,
      duration: 1
    });
    this.minFromDate = tomorrow;
    this.minToDate = nextDay;

    this.toastr.info('Form reset successfully', 'Reset');
    this.submitSuccess = false;
    this.submitError = '';
  }

  goBack(): void {
    this.router.navigate(['/venues']);
  }

  paymentHandler(): void {
    const rateValue = this.bookingForm.get('rate')?.value;

    if (rateValue != null && rateValue > 0) {
      this.router.navigate(['/payment', rateValue]);
    } else {
     this.toastr.error('Please enter a valid rate before proceeding with payment.', 'Error');
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.bookingForm.controls).forEach(key => {
      this.bookingForm.get(key)?.markAsTouched();
    });
  }


  viewSlotHandler(){
    this.router.navigate(['/slot-view']);
  }
}
