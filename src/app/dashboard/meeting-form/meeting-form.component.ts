import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.scss'],
})
export class MeetingFormComponent implements OnInit {
  userDetails = this._service.userdetails;
  bookMeetingForm: any;
  selectedDate: { year: number; month: number; day: number } | null = null;

  constructor(
    private _service: ServiceService,
    private modal: NgbModal,
    private _fb: FormBuilder,
    public activeModalRef: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.bookMeetingForm = this._fb.group(
      {
        username: [this.userDetails.username, Validators.required],
        date: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        room: ['', Validators.required],
        agenda: [''],
      },
      { validator: this.timeDifferenceValidator }
    );
  }

  get formattedDate() {
    if (!this.selectedDate) return '';
    const { year, month, day } = this.selectedDate;

    return moment(new Date(year, month - 1, day, 12, 0, 0)).format('L');
  }

  onDateSelect(date: any) {
    this.selectedDate = date;
  }

  timeDifferenceValidator(group: FormGroup) {
    const startTime = group.get('startTime')?.value;
    const endTime = group.get('endTime')?.value;

    if (!startTime || !endTime) return null;

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60);

    return diff >= 30 ? null : { timeInvalid: true };
  }

  areDateTimeSelected(): boolean {
    const date = this.bookMeetingForm.get('date')?.value;
    const startTime = this.bookMeetingForm.get('startTime')?.value;
    const endTime = this.bookMeetingForm.get('endTime')?.value;
    return !!date && !!startTime && !!endTime;
  }

  onSubmit() {
    if (!this.bookMeetingForm.valid) {
      return;
    }

    const payload = this.bookMeetingForm.value;
    payload.date = this.formattedDate;

    this.activeModalRef.close(this.bookMeetingForm.value);
  }
}
