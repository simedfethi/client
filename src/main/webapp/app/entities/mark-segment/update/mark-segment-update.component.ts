import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MarkSegmentFormService, MarkSegmentFormGroup } from './mark-segment-form.service';
import { IMarkSegment } from '../mark-segment.model';
import { MarkSegmentService } from '../service/mark-segment.service';

@Component({
  selector: 'jhi-mark-segment-update',
  templateUrl: './mark-segment-update.component.html',
})
export class MarkSegmentUpdateComponent implements OnInit {
  isSaving = false;
  markSegment: IMarkSegment | null = null;

  editForm: MarkSegmentFormGroup = this.markSegmentFormService.createMarkSegmentFormGroup();

  constructor(
    protected markSegmentService: MarkSegmentService,
    protected markSegmentFormService: MarkSegmentFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ markSegment }) => {
      this.markSegment = markSegment;
      if (markSegment) {
        this.updateForm(markSegment);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const markSegment = this.markSegmentFormService.getMarkSegment(this.editForm);
    if (markSegment.id !== null) {
      this.subscribeToSaveResponse(this.markSegmentService.update(markSegment));
    } else {
      this.subscribeToSaveResponse(this.markSegmentService.create(markSegment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarkSegment>>): void {
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

  protected updateForm(markSegment: IMarkSegment): void {
    this.markSegment = markSegment;
    this.markSegmentFormService.resetForm(this.editForm, markSegment);
  }
}
