import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SupplierCategoryFormService, SupplierCategoryFormGroup } from './supplier-category-form.service';
import { ISupplierCategory } from '../supplier-category.model';
import { SupplierCategoryService } from '../service/supplier-category.service';

@Component({
  selector: 'jhi-supplier-category-update',
  templateUrl: './supplier-category-update.component.html',
})
export class SupplierCategoryUpdateComponent implements OnInit {
  isSaving = false;
  supplierCategory: ISupplierCategory | null = null;

  editForm: SupplierCategoryFormGroup = this.supplierCategoryFormService.createSupplierCategoryFormGroup();

  constructor(
    protected supplierCategoryService: SupplierCategoryService,
    protected supplierCategoryFormService: SupplierCategoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplierCategory }) => {
      this.supplierCategory = supplierCategory;
      if (supplierCategory) {
        this.updateForm(supplierCategory);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supplierCategory = this.supplierCategoryFormService.getSupplierCategory(this.editForm);
    if (supplierCategory.id !== null) {
      this.subscribeToSaveResponse(this.supplierCategoryService.update(supplierCategory));
    } else {
      this.subscribeToSaveResponse(this.supplierCategoryService.create(supplierCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplierCategory>>): void {
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

  protected updateForm(supplierCategory: ISupplierCategory): void {
    this.supplierCategory = supplierCategory;
    this.supplierCategoryFormService.resetForm(this.editForm, supplierCategory);
  }
}
