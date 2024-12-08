import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() list: any[] = [];

  @Input() columns: any[] = [];

  @Output() onDelete = new EventEmitter();

  @Input() action: boolean = false;

  trackByFn(idx: number, item: any) {
    return idx;
  }

  delete(idx: number) {
    this.onDelete.emit(idx);
  }
}
