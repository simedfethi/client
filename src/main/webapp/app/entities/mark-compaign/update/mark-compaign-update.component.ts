import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MarkCompaignFormService, MarkCompaignFormGroup } from './mark-compaign-form.service';
import { IMarkCompaign } from '../mark-compaign.model';
import { MarkCompaignService } from '../service/mark-compaign.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { IMarkSegment } from 'app/entities/mark-segment/mark-segment.model';
import { MarkSegmentService } from 'app/entities/mark-segment/service/mark-segment.service';
import { CompaignType } from 'app/entities/enumerations/compaign-type.model';
import { Compaignpriority } from 'app/entities/enumerations/compaignpriority.model';
import { CompaignAction } from 'app/entities/enumerations/compaign-action.model';
import { UnlayerComponent } from '../../../shared/unlayer/unlayer.component';

@Component({
  selector: 'jhi-mark-compaign-update',
  templateUrl: './mark-compaign-update.component.html',
})
export class MarkCompaignUpdateComponent implements OnInit {
  isSaving = false;
  markCompaign: IMarkCompaign | null = null;
  compaignTypeValues = Object.keys(CompaignType);
  compaignpriorityValues = Object.keys(Compaignpriority);
  compaignActionValues = Object.keys(CompaignAction);

  employeesSharedCollection: IEmployee[] = [];
  markSegmentsSharedCollection: IMarkSegment[] = [];

  editForm: MarkCompaignFormGroup = this.markCompaignFormService.createMarkCompaignFormGroup();
  @ViewChild(UnlayerComponent, { static: false }) private unlayercomponent?: UnlayerComponent;
  constructor(
    protected markCompaignService: MarkCompaignService,
    protected markCompaignFormService: MarkCompaignFormService,
    protected employeeService: EmployeeService,
    protected markSegmentService: MarkSegmentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareMarkSegment = (o1: IMarkSegment | null, o2: IMarkSegment | null): boolean => this.markSegmentService.compareMarkSegment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ markCompaign }) => {
      this.markCompaign = markCompaign;
      if (markCompaign) {
        this.updateForm(markCompaign);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  startCompaign(): void {
    if (this.markCompaign === null) {
      return;
    }
    this.markCompaignService.start(this.markCompaign).subscribe();
  }
  save(): void {
    this.isSaving = true;
    const markCompaign = this.markCompaignFormService.getMarkCompaign(this.editForm);

    markCompaign.templateContent = JSON.stringify(this.unlayercomponent?.json);
    markCompaign.htmlContent = this.unlayercomponent?.html;
    if (markCompaign.id !== null) {
      this.subscribeToSaveResponse(this.markCompaignService.update(markCompaign));
    } else {
      this.subscribeToSaveResponse(this.markCompaignService.create(markCompaign));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarkCompaign>>): void {
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

  protected updateForm(markCompaign: IMarkCompaign): void {
    this.markCompaign = markCompaign;
    this.markCompaignFormService.resetForm(this.editForm, markCompaign);

    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      markCompaign.sender
    );
    this.markSegmentsSharedCollection = this.markSegmentService.addMarkSegmentToCollectionIfMissing<IMarkSegment>(
      this.markSegmentsSharedCollection,
      ...(markCompaign.markSegments ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.markCompaign?.sender)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.markSegmentService
      .query()
      .pipe(map((res: HttpResponse<IMarkSegment[]>) => res.body ?? []))
      .pipe(
        map((markSegments: IMarkSegment[]) =>
          this.markSegmentService.addMarkSegmentToCollectionIfMissing<IMarkSegment>(
            markSegments,
            ...(this.markCompaign?.markSegments ?? [])
          )
        )
      )
      .subscribe((markSegments: IMarkSegment[]) => (this.markSegmentsSharedCollection = markSegments));
  }
}
