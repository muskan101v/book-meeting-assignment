import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  meetings: any[] = JSON.parse(sessionStorage.getItem('meetingList') || '[]');
  userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
  constructor(private http: HttpClient, private _router: Router) {}

  login({ username, password }: { username: string; password: string }) {
    return this.http
      .post<any>(`/users/authenticate`, { username, password })
      .pipe(
        map(
          (user) => {
            if (user && user.token) {
              this.userdetails = user;
            }

            return user;
          },
          catchError((err) => this.handleError(err))
        )
      );
  }

  handleError(err: any) {
    console.log(err);
    return err;
  }

  get meetingList() {
    return this.meetings;
  }

  set meetingList(list: any[]) {
    this.meetings = list;
    sessionStorage.setItem('meetingList', JSON.stringify(list));
  }

  get userdetails() {
    return this.userDetails;
  }

  set userdetails(user: any) {
    this.userDetails = user;
    sessionStorage.setItem('userDetails', JSON.stringify(user));
  }

  meetingByRoomId(roomId: string) {
    return this.meetings.filter((meeting) => meeting.room === roomId);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._router.navigateByUrl('/login');
  }
}
