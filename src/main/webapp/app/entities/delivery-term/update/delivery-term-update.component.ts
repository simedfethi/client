import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DeliveryTermFormService, DeliveryTermFormGroup } from './delivery-term-form.service';
import { IDeliveryTerm } from '../delivery-term.model';
import { DeliveryTermService } from '../service/delivery-term.service';

@Component({
  selector: 'jhi-delivery-term-update',
  templateUrl: './delivery-term-update.component.html',
})
export class DeliveryTermUpdateComponent implements OnInit {
  isSaving = false;
  deliveryTerm: IDeliveryTerm | null = null;

  editForm: DeliveryTermFormGroup = this.deliveryTermFormService.createDeliveryTermFormGroup();

  constructor(
    protected deliveryTermService: DeliveryTermService,
    protected deliveryTermFormService: DeliveryTermFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryTerm }) => {
      this.deliveryTerm = deliveryTerm;
      if (deliveryTerm) {
        this.updateForm(deliveryTerm);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryTerm = this.deliveryTermFormService.getDeliveryTerm(this.editForm);
    if (deliveryTerm.id !== null) {
      this.subscribeToSaveResponse(this.deliveryTermService.update(deliveryTerm));
    } else {
      this.subscribeToSaveResponse(this.deliveryTermService.create(deliveryTerm));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryTerm>>): void {
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

  protected updateForm(deliveryTerm: IDeliveryTerm): void {
    this.deliveryTerm = deliveryTerm;
    this.deliveryTermFormService.resetForm(this.editForm, deliveryTerm);
  }
}
