import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CustomerCategoryFormService, CustomerCategoryFormGroup } from './customer-category-form.service';
import { ICustomerCategory } from '../customer-category.model';
import { CustomerCategoryService } from '../service/customer-category.service';

@Component({
  selector: 'jhi-customer-category-update',
  templateUrl: './customer-category-update.component.html',
})
export class CustomerCategoryUpdateComponent implements OnInit {
  isSaving = false;
  customerCategory: ICustomerCategory | null = null;

  editForm: CustomerCategoryFormGroup = this.customerCategoryFormService.createCustomerCategoryFormGroup();

  constructor(
    protected customerCategoryService: CustomerCategoryService,
    protected customerCategoryFormService: CustomerCategoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerCategory }) => {
      this.customerCategory = customerCategory;
      if (customerCategory) {
        this.updateForm(customerCategory);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerCategory = this.customerCategoryFormService.getCustomerCategory(this.editForm);
    if (customerCategory.id !== null) {
      this.subscribeToSaveResponse(this.customerCategoryService.update(customerCategory));
    } else {
      this.subscribeToSaveResponse(this.customerCategoryService.create(customerCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerCategory>>): void {
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

  protected updateForm(customerCategory: ICustomerCategory): void {
    this.customerCategory = customerCategory;
    this.customerCategoryFormService.resetForm(this.editForm, customerCategory);
  }
}
