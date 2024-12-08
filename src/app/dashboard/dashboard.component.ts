import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userDetails: any = this._service.userdetails;
  upcomingMeetings: any[] = [];
  selectMeetingRoom = 'Meeting Room #1';

  meetingRooms = [
    'Meeting Room #1',
    'Meeting Room #2',
    'Meeting Room #3',
    'Meeting Room #4',
  ];

  columns = ['#', 'User Name', 'Agenda', 'Date', 'Time', 'Room'];

  meetingByRoomId: any[] = [];

  constructor(
    private _service: ServiceService,
    private modal: NgbModal,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.upcomingMeetings = this._service.meetingList;
    this.getMeetingByRoomId(this.selectMeetingRoom);
  }

  openModal() {
    const modalRef = this.modal.open(MeetingFormComponent, {
      centered: true,
      backdrop: 'static',
      size: 'md',
    });

    modalRef.result.then(
      (result) => {
        const meetings = this._service.meetingList;
        meetings.push(result);
        this._service.meetingList = meetings;
        this.getMeetingByRoomId(this.selectMeetingRoom);
      },
      (reason) => {
        console.log(`Dismissed ${reason}`);
      }
    );
  }

  getMeetingByRoomId(roomId: string) {
    this.meetingByRoomId = this._service.meetingByRoomId(
      this.selectMeetingRoom
    );
  }

  logout() {
    this._service.logout();
  }

  onDelete($event: number) {
    this.upcomingMeetings.splice($event, 1);
    this._service.meetingList = this.upcomingMeetings;
    this.getMeetingByRoomId(this.selectMeetingRoom);
  }
}
