import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TransporterFormService, TransporterFormGroup } from './transporter-form.service';
import { ITransporter } from '../transporter.model';
import { TransporterService } from '../service/transporter.service';

@Component({
  selector: 'jhi-transporter-update',
  templateUrl: './transporter-update.component.html',
})
export class TransporterUpdateComponent implements OnInit {
  isSaving = false;
  transporter: ITransporter | null = null;

  editForm: TransporterFormGroup = this.transporterFormService.createTransporterFormGroup();

  constructor(
    protected transporterService: TransporterService,
    protected transporterFormService: TransporterFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transporter }) => {
      this.transporter = transporter;
      if (transporter) {
        this.updateForm(transporter);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transporter = this.transporterFormService.getTransporter(this.editForm);
    if (transporter.id !== null) {
      this.subscribeToSaveResponse(this.transporterService.update(transporter));
    } else {
      this.subscribeToSaveResponse(this.transporterService.create(transporter));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransporter>>): void {
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

  protected updateForm(transporter: ITransporter): void {
    this.transporter = transporter;
    this.transporterFormService.resetForm(this.editForm, transporter);
  }
}
