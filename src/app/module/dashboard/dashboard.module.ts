import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import {
  NgbDate,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModal,
  NgbModalModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeetingFormComponent } from 'src/app/dashboard/meeting-form/meeting-form.component';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent, MeetingFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    ComponentsModule,
  ],
  exports: [RouterModule],
})
export class DashboardModule {}
