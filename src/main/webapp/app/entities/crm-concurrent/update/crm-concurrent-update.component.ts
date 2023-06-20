import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CrmConcurrentFormService, CrmConcurrentFormGroup } from './crm-concurrent-form.service';
import { ICrmConcurrent } from '../crm-concurrent.model';
import { CrmConcurrentService } from '../service/crm-concurrent.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { CustomerType } from 'app/entities/enumerations/customer-type.model';

@Component({
  selector: 'jhi-crm-concurrent-update',
  templateUrl: './crm-concurrent-update.component.html',
})
export class CrmConcurrentUpdateComponent implements OnInit {
  isSaving = false;
  crmConcurrent: ICrmConcurrent | null = null;
  customerTypeValues = Object.keys(CustomerType);

  editForm: CrmConcurrentFormGroup = this.crmConcurrentFormService.createCrmConcurrentFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected crmConcurrentService: CrmConcurrentService,
    protected crmConcurrentFormService: CrmConcurrentFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmConcurrent }) => {
      this.crmConcurrent = crmConcurrent;
      if (crmConcurrent) {
        this.updateForm(crmConcurrent);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('scibscrmApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmConcurrent = this.crmConcurrentFormService.getCrmConcurrent(this.editForm);
    if (crmConcurrent.id !== null) {
      this.subscribeToSaveResponse(this.crmConcurrentService.update(crmConcurrent));
    } else {
      this.subscribeToSaveResponse(this.crmConcurrentService.create(crmConcurrent));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmConcurrent>>): void {
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

  protected updateForm(crmConcurrent: ICrmConcurrent): void {
    this.crmConcurrent = crmConcurrent;
    this.crmConcurrentFormService.resetForm(this.editForm, crmConcurrent);
  }
}
