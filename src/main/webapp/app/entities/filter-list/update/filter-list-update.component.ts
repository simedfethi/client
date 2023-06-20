import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FilterListFormService, FilterListFormGroup } from './filter-list-form.service';
import { IFilterList } from '../filter-list.model';
import { FilterListService } from '../service/filter-list.service';

@Component({
  selector: 'jhi-filter-list-update',
  templateUrl: './filter-list-update.component.html',
})
export class FilterListUpdateComponent implements OnInit {
  isSaving = false;
  filterList: IFilterList | null = null;

  editForm: FilterListFormGroup = this.filterListFormService.createFilterListFormGroup();

  constructor(
    protected filterListService: FilterListService,
    protected filterListFormService: FilterListFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ filterList }) => {
      this.filterList = filterList;
      if (filterList) {
        this.updateForm(filterList);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const filterList = this.filterListFormService.getFilterList(this.editForm);
    if (filterList.id !== null) {
      this.subscribeToSaveResponse(this.filterListService.update(filterList));
    } else {
      this.subscribeToSaveResponse(this.filterListService.create(filterList));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFilterList>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(filterList: IFilterList): void {
    this.filterList = filterList;
    this.filterListFormService.resetForm(this.editForm, filterList);
  }
}
