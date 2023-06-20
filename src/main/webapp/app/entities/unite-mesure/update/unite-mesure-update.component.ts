import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UniteMesureFormService, UniteMesureFormGroup } from './unite-mesure-form.service';
import { IUniteMesure } from '../unite-mesure.model';
import { UniteMesureService } from '../service/unite-mesure.service';

@Component({
  selector: 'jhi-unite-mesure-update',
  templateUrl: './unite-mesure-update.component.html',
})
export class UniteMesureUpdateComponent implements OnInit {
  isSaving = false;
  uniteMesure: IUniteMesure | null = null;

  editForm: UniteMesureFormGroup = this.uniteMesureFormService.createUniteMesureFormGroup();

  constructor(
    protected uniteMesureService: UniteMesureService,
    protected uniteMesureFormService: UniteMesureFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uniteMesure }) => {
      this.uniteMesure = uniteMesure;
      if (uniteMesure) {
        this.updateForm(uniteMesure);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const uniteMesure = this.uniteMesureFormService.getUniteMesure(this.editForm);
    if (uniteMesure.id !== null) {
      this.subscribeToSaveResponse(this.uniteMesureService.update(uniteMesure));
    } else {
      this.subscribeToSaveResponse(this.uniteMesureService.create(uniteMesure));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUniteMesure>>): void {
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

  protected updateForm(uniteMesure: IUniteMesure): void {
    this.uniteMesure = uniteMesure;
    this.uniteMesureFormService.resetForm(this.editForm, uniteMesure);
  }
}
