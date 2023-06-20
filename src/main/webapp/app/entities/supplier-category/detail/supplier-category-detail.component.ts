import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupplierCategory } from '../supplier-category.model';

@Component({
  selector: 'jhi-supplier-category-detail',
  templateUrl: './supplier-category-detail.component.html',
})
export class SupplierCategoryDetailComponent implements OnInit {
  supplierCategory: ISupplierCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplierCategory }) => {
      this.supplierCategory = supplierCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
