import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMarkStHistory } from '../mark-st-history.model';

@Component({
  selector: 'jhi-mark-st-history-detail',
  templateUrl: './mark-st-history-detail.component.html',
})
export class MarkStHistoryDetailComponent implements OnInit {
  markStHistory: IMarkStHistory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ markStHistory }) => {
      this.markStHistory = markStHistory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
