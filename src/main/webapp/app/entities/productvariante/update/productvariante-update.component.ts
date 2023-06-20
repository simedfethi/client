import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ProductvarianteFormService, ProductvarianteFormGroup } from './productvariante-form.service';
import { IProductvariante } from '../productvariante.model';
import { ProductvarianteService } from '../service/productvariante.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-productvariante-update',
  templateUrl: './productvariante-update.component.html',
})
export class ProductvarianteUpdateComponent implements OnInit {
  isSaving = false;
  productvariante: IProductvariante | null = null;

  editForm: ProductvarianteFormGroup = this.productvarianteFormService.createProductvarianteFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected productvarianteService: ProductvarianteService,
    protected productvarianteFormService: ProductvarianteFormService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productvariante }) => {
      this.productvariante = productvariante;
      if (productvariante) {
        this.updateForm(productvariante);
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productvariante = this.productvarianteFormService.getProductvariante(this.editForm);
    if (productvariante.id !== null) {
      this.subscribeToSaveResponse(this.productvarianteService.update(productvariante));
    } else {
      this.subscribeToSaveResponse(this.productvarianteService.create(productvariante));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductvariante>>): void {
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

  protected updateForm(productvariante: IProductvariante): void {
    this.productvariante = productvariante;
    this.productvarianteFormService.resetForm(this.editForm, productvariante);
  }
}
