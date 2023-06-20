import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ProjectStatusFormService, ProjectStatusFormGroup } from './project-status-form.service';
import { IProjectStatus } from '../project-status.model';
import { ProjectStatusService } from '../service/project-status.service';

@Component({
  selector: 'jhi-project-status-update',
  templateUrl: './project-status-update.component.html',
})
export class ProjectStatusUpdateComponent implements OnInit {
  isSaving = false;
  projectStatus: IProjectStatus | null = null;

  editForm: ProjectStatusFormGroup = this.projectStatusFormService.createProjectStatusFormGroup();

  constructor(
    protected projectStatusService: ProjectStatusService,
    protected projectStatusFormService: ProjectStatusFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projectStatus }) => {
      this.projectStatus = projectStatus;
      if (projectStatus) {
        this.updateForm(projectStatus);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const projectStatus = this.projectStatusFormService.getProjectStatus(this.editForm);
    if (projectStatus.id !== null) {
      this.subscribeToSaveResponse(this.projectStatusService.update(projectStatus));
    } else {
      this.subscribeToSaveResponse(this.projectStatusService.create(projectStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjectStatus>>): void {
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

  protected updateForm(projectStatus: IProjectStatus): void {
    this.projectStatus = projectStatus;
    this.projectStatusFormService.resetForm(this.editForm, projectStatus);
  }
}
