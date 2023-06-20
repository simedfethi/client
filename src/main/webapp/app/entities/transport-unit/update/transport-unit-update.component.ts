import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TransportUnitFormService, TransportUnitFormGroup } from './transport-unit-form.service';
import { ITransportUnit } from '../transport-unit.model';
import { TransportUnitService } from '../service/transport-unit.service';

@Component({
  selector: 'jhi-transport-unit-update',
  templateUrl: './transport-unit-update.component.html',
})
export class TransportUnitUpdateComponent implements OnInit {
  isSaving = false;
  transportUnit: ITransportUnit | null = null;

  editForm: TransportUnitFormGroup = this.transportUnitFormService.createTransportUnitFormGroup();

  constructor(
    protected transportUnitService: TransportUnitService,
    protected transportUnitFormService: TransportUnitFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transportUnit }) => {
      this.transportUnit = transportUnit;
      if (transportUnit) {
        this.updateForm(transportUnit);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transportUnit = this.transportUnitFormService.getTransportUnit(this.editForm);
    if (transportUnit.id !== null) {
      this.subscribeToSaveResponse(this.transportUnitService.update(transportUnit));
    } else {
      this.subscribeToSaveResponse(this.transportUnitService.create(transportUnit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransportUnit>>): void {
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

  protected updateForm(transportUnit: ITransportUnit): void {
    this.transportUnit = transportUnit;
    this.transportUnitFormService.resetForm(this.editForm, transportUnit);
  }
}
