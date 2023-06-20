import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SupplierFormService, SupplierFormGroup } from './supplier-form.service';
import { ISupplier } from '../supplier.model';
import { SupplierService } from '../service/supplier.service';
import { ISupplierCategory } from 'app/entities/supplier-category/supplier-category.model';
import { SupplierCategoryService } from 'app/entities/supplier-category/service/supplier-category.service';

@Component({
  selector: 'jhi-supplier-update',
  templateUrl: './supplier-update.component.html',
})
export class SupplierUpdateComponent implements OnInit {
  isSaving = false;
  supplier: ISupplier | null = null;

  supplierCategoriesSharedCollection: ISupplierCategory[] = [];

  editForm: SupplierFormGroup = this.supplierFormService.createSupplierFormGroup();

  constructor(
    protected supplierService: SupplierService,
    protected supplierFormService: SupplierFormService,
    protected supplierCategoryService: SupplierCategoryService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSupplierCategory = (o1: ISupplierCategory | null, o2: ISupplierCategory | null): boolean =>
    this.supplierCategoryService.compareSupplierCategory(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplier }) => {
      this.supplier = supplier;
      if (supplier) {
        this.updateForm(supplier);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supplier = this.supplierFormService.getSupplier(this.editForm);
    if (supplier.id !== null) {
      this.subscribeToSaveResponse(this.supplierService.update(supplier));
    } else {
      this.subscribeToSaveResponse(this.supplierService.create(supplier));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplier>>): void {
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

  protected updateForm(supplier: ISupplier): void {
    this.supplier = supplier;
    this.supplierFormService.resetForm(this.editForm, supplier);

    this.supplierCategoriesSharedCollection = this.supplierCategoryService.addSupplierCategoryToCollectionIfMissing<ISupplierCategory>(
      this.supplierCategoriesSharedCollection,
      supplier.categorie
    );
  }

  protected loadRelationshipsOptions(): void {
    this.supplierCategoryService
      .query()
      .pipe(map((res: HttpResponse<ISupplierCategory[]>) => res.body ?? []))
      .pipe(
        map((supplierCategories: ISupplierCategory[]) =>
          this.supplierCategoryService.addSupplierCategoryToCollectionIfMissing<ISupplierCategory>(
            supplierCategories,
            this.supplier?.categorie
          )
        )
      )
      .subscribe((supplierCategories: ISupplierCategory[]) => (this.supplierCategoriesSharedCollection = supplierCategories));
  }
}
