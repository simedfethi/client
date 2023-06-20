import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMarkCompaign } from '../mark-compaign.model';

@Component({
  selector: 'jhi-mark-compaign-detail',
  templateUrl: './mark-compaign-detail.component.html',
})
export class MarkCompaignDetailComponent implements OnInit {
  markCompaign: IMarkCompaign | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ markCompaign }) => {
      this.markCompaign = markCompaign;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
