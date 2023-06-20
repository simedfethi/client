import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFilterList } from '../filter-list.model';

@Component({
  selector: 'jhi-filter-list-detail',
  templateUrl: './filter-list-detail.component.html',
})
export class FilterListDetailComponent implements OnInit {
  filterList: IFilterList | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ filterList }) => {
      this.filterList = filterList;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
