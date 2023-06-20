import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerCategory } from '../customer-category.model';

@Component({
  selector: 'jhi-customer-category-detail',
  templateUrl: './customer-category-detail.component.html',
})
export class CustomerCategoryDetailComponent implements OnInit {
  customerCategory: ICustomerCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerCategory }) => {
      this.customerCategory = customerCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
