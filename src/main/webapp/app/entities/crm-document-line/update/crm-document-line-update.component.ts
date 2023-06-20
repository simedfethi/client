import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CrmDocumentLineFormService, CrmDocumentLineFormGroup } from './crm-document-line-form.service';
import { ICrmDocumentLine } from '../crm-document-line.model';
import { CrmDocumentLineService } from '../service/crm-document-line.service';
import { IUniteMesure } from 'app/entities/unite-mesure/unite-mesure.model';
import { UniteMesureService } from 'app/entities/unite-mesure/service/unite-mesure.service';
import { ICrmConcurrent } from 'app/entities/crm-concurrent/crm-concurrent.model';
import { CrmConcurrentService } from 'app/entities/crm-concurrent/service/crm-concurrent.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { ICrmDocument } from 'app/entities/crm-document/crm-document.model';
import { CrmDocumentService } from 'app/entities/crm-document/service/crm-document.service';

@Component({
  selector: 'jhi-crm-document-line-update',
  templateUrl: './crm-document-line-update.component.html',
})
export class CrmDocumentLineUpdateComponent implements OnInit {
  isSaving = false;
  crmDocumentLine: ICrmDocumentLine | null = null;

  uniteMesuresSharedCollection: IUniteMesure[] = [];
  crmConcurrentsSharedCollection: ICrmConcurrent[] = [];
  productsSharedCollection: IProduct[] = [];
  crmDocumentsSharedCollection: ICrmDocument[] = [];

  editForm: CrmDocumentLineFormGroup = this.crmDocumentLineFormService.createCrmDocumentLineFormGroup();

  constructor(
    protected crmDocumentLineService: CrmDocumentLineService,
    protected crmDocumentLineFormService: CrmDocumentLineFormService,
    protected uniteMesureService: UniteMesureService,
    protected crmConcurrentService: CrmConcurrentService,
    protected productService: ProductService,
    protected crmDocumentService: CrmDocumentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUniteMesure = (o1: IUniteMesure | null, o2: IUniteMesure | null): boolean => this.uniteMesureService.compareUniteMesure(o1, o2);

  compareCrmConcurrent = (o1: ICrmConcurrent | null, o2: ICrmConcurrent | null): boolean =>
    this.crmConcurrentService.compareCrmConcurrent(o1, o2);

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  compareCrmDocument = (o1: ICrmDocument | null, o2: ICrmDocument | null): boolean => this.crmDocumentService.compareCrmDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crmDocumentLine }) => {
      this.crmDocumentLine = crmDocumentLine;
      if (crmDocumentLine) {
        this.updateForm(crmDocumentLine);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crmDocumentLine = this.crmDocumentLineFormService.getCrmDocumentLine(this.editForm);
    if (crmDocumentLine.id !== null) {
      this.subscribeToSaveResponse(this.crmDocumentLineService.update(crmDocumentLine));
    } else {
      this.subscribeToSaveResponse(this.crmDocumentLineService.create(crmDocumentLine));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrmDocumentLine>>): void {
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

  protected updateForm(crmDocumentLine: ICrmDocumentLine): void {
    this.crmDocumentLine = crmDocumentLine;
    this.crmDocumentLineFormService.resetForm(this.editForm, crmDocumentLine);

    this.uniteMesuresSharedCollection = this.uniteMesureService.addUniteMesureToCollectionIfMissing<IUniteMesure>(
      this.uniteMesuresSharedCollection,
      crmDocumentLine.unite
    );
    this.crmConcurrentsSharedCollection = this.crmConcurrentService.addCrmConcurrentToCollectionIfMissing<ICrmConcurrent>(
      this.crmConcurrentsSharedCollection,
      crmDocumentLine.sourceAprov
    );
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing<IProduct>(
      this.productsSharedCollection,
      crmDocumentLine.produit
    );
    this.crmDocumentsSharedCollection = this.crmDocumentService.addCrmDocumentToCollectionIfMissing<ICrmDocument>(
      this.crmDocumentsSharedCollection,
      crmDocumentLine.crmDocument
    );
  }

  protected loadRelationshipsOptions(): void {
    this.uniteMesureService
      .query()
      .pipe(map((res: HttpResponse<IUniteMesure[]>) => res.body ?? []))
      .pipe(
        map((uniteMesures: IUniteMesure[]) =>
          this.uniteMesureService.addUniteMesureToCollectionIfMissing<IUniteMesure>(uniteMesures, this.crmDocumentLine?.unite)
        )
      )
      .subscribe((uniteMesures: IUniteMesure[]) => (this.uniteMesuresSharedCollection = uniteMesures));

    this.crmConcurrentService
      .query()
      .pipe(map((res: HttpResponse<ICrmConcurrent[]>) => res.body ?? []))
      .pipe(
        map((crmConcurrents: ICrmConcurrent[]) =>
          this.crmConcurrentService.addCrmConcurrentToCollectionIfMissing<ICrmConcurrent>(crmConcurrents, this.crmDocumentLine?.sourceAprov)
        )
      )
      .subscribe((crmConcurrents: ICrmConcurrent[]) => (this.crmConcurrentsSharedCollection = crmConcurrents));

    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) =>
          this.productService.addProductToCollectionIfMissing<IProduct>(products, this.crmDocumentLine?.produit)
        )
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));

    this.crmDocumentService
      .query()
      .pipe(map((res: HttpResponse<ICrmDocument[]>) => res.body ?? []))
      .pipe(
        map((crmDocuments: ICrmDocument[]) =>
          this.crmDocumentService.addCrmDocumentToCollectionIfMissing<ICrmDocument>(crmDocuments, this.crmDocumentLine?.crmDocument)
        )
      )
      .subscribe((crmDocuments: ICrmDocument[]) => (this.crmDocumentsSharedCollection = crmDocuments));
  }
}
