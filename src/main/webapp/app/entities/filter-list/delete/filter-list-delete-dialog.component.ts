import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFilterList } from '../filter-list.model';
import { FilterListService } from '../service/filter-list.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './filter-list-delete-dialog.component.html',
})
export class FilterListDeleteDialogComponent {
  filterList?: IFilterList;

  constructor(protected filterListService: FilterListService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.filterListService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
