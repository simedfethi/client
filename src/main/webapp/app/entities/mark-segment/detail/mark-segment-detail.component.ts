import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMarkSegment } from '../mark-segment.model';

@Component({
  selector: 'jhi-mark-segment-detail',
  templateUrl: './mark-segment-detail.component.html',
})
export class MarkSegmentDetailComponent implements OnInit {
  markSegment: IMarkSegment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ markSegment }) => {
      this.markSegment = markSegment;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
