import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SupplierOfferFormService, SupplierOfferFormGroup } from './supplier-offer-form.service';
import { ISupplierOffer } from '../supplier-offer.model';
import { SupplierOfferService } from '../service/supplier-offer.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { IUniteMesure } from 'app/entities/unite-mesure/unite-mesure.model';
import { UniteMesureService } from 'app/entities/unite-mesure/service/unite-mesure.service';
import { ISupplier } from 'app/entities/supplier/supplier.model';
import { SupplierService } from 'app/entities/supplier/service/supplier.service';
import { ITransactionCRM } from 'app/entities/transaction-crm/transaction-crm.model';
import { TransactionCRMService } from 'app/entities/transaction-crm/service/transaction-crm.service';
import { IDeliveryTerm } from 'app/entities/delivery-term/delivery-term.model';
import { DeliveryTermService } from 'app/entities/delivery-term/service/delivery-term.service';

@Component({
  selector: 'jhi-supplier-offer-update',
  templateUrl: './supplier-offer-update.component.html',
})
export class SupplierOfferUpdateComponent implements OnInit {
  isSaving = false;
  supplierOffer: ISupplierOffer | null = null;

  productsSharedCollection: IProduct[] = [];
  uniteMesuresSharedCollection: IUniteMesure[] = [];
  suppliersSharedCollection: ISupplier[] = [];
  transactionCRMSSharedCollection: ITransactionCRM[] = [];
  deliveryTermsSharedCollection: IDeliveryTerm[] = [];

  editForm: SupplierOfferFormGroup = this.supplierOfferFormService.createSupplierOfferFormGroup();

  constructor(
    protected supplierOfferService: SupplierOfferService,
    protected supplierOfferFormService: SupplierOfferFormService,
    protected productService: ProductService,
    protected uniteMesureService: UniteMesureService,
    protected supplierService: SupplierService,
    protected transactionCRMService: TransactionCRMService,
    protected deliveryTermService: DeliveryTermService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  compareUniteMesure = (o1: IUniteMesure | null, o2: IUniteMesure | null): boolean => this.uniteMesureService.compareUniteMesure(o1, o2);

  compareSupplier = (o1: ISupplier | null, o2: ISupplier | null): boolean => this.supplierService.compareSupplier(o1, o2);

  compareTransactionCRM = (o1: ITransactionCRM | null, o2: ITransactionCRM | null): boolean =>
    this.transactionCRMService.compareTransactionCRM(o1, o2);

  compareDeliveryTerm = (o1: IDeliveryTerm | null, o2: IDeliveryTerm | null): boolean =>
    this.deliveryTermService.compareDeliveryTerm(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplierOffer }) => {
      this.supplierOffer = supplierOffer;
      if (supplierOffer) {
        this.updateForm(supplierOffer);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supplierOffer = this.supplierOfferFormService.getSupplierOffer(this.editForm);
    if (supplierOffer.id !== null) {
      this.subscribeToSaveResponse(this.supplierOfferService.update(supplierOffer));
    } else {
      this.subscribeToSaveResponse(this.supplierOfferService.create(supplierOffer));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplierOffer>>): void {
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

  protected updateForm(supplierOffer: ISupplierOffer): void {
    this.supplierOffer = supplierOffer;
    this.supplierOfferFormService.resetForm(this.editForm, supplierOffer);

    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing<IProduct>(
      this.productsSharedCollection,
      supplierOffer.product
    );
    this.uniteMesuresSharedCollection = this.uniteMesureService.addUniteMesureToCollectionIfMissing<IUniteMesure>(
      this.uniteMesuresSharedCollection,
      supplierOffer.uniteMesure
    );
    this.suppliersSharedCollection = this.supplierService.addSupplierToCollectionIfMissing<ISupplier>(
      this.suppliersSharedCollection,
      supplierOffer.supplier
    );
    this.transactionCRMSSharedCollection = this.transactionCRMService.addTransactionCRMToCollectionIfMissing<ITransactionCRM>(
      this.transactionCRMSSharedCollection,
      supplierOffer.transactionCRM
    );
    this.deliveryTermsSharedCollection = this.deliveryTermService.addDeliveryTermToCollectionIfMissing<IDeliveryTerm>(
      this.deliveryTermsSharedCollection,
      supplierOffer.deliveryTerm
    );
  }

  protected loadRelationshipsOptions(): void {
    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) => this.productService.addProductToCollectionIfMissing<IProduct>(products, this.supplierOffer?.product))
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));

    this.uniteMesureService
      .query()
      .pipe(map((res: HttpResponse<IUniteMesure[]>) => res.body ?? []))
      .pipe(
        map((uniteMesures: IUniteMesure[]) =>
          this.uniteMesureService.addUniteMesureToCollectionIfMissing<IUniteMesure>(uniteMesures, this.supplierOffer?.uniteMesure)
        )
      )
      .subscribe((uniteMesures: IUniteMesure[]) => (this.uniteMesuresSharedCollection = uniteMesures));

    this.supplierService
      .query()
      .pipe(map((res: HttpResponse<ISupplier[]>) => res.body ?? []))
      .pipe(
        map((suppliers: ISupplier[]) =>
          this.supplierService.addSupplierToCollectionIfMissing<ISupplier>(suppliers, this.supplierOffer?.supplier)
        )
      )
      .subscribe((suppliers: ISupplier[]) => (this.suppliersSharedCollection = suppliers));

    this.transactionCRMService
      .query()
      .pipe(map((res: HttpResponse<ITransactionCRM[]>) => res.body ?? []))
      .pipe(
        map((transactionCRMS: ITransactionCRM[]) =>
          this.transactionCRMService.addTransactionCRMToCollectionIfMissing<ITransactionCRM>(
            transactionCRMS,
            this.supplierOffer?.transactionCRM
          )
        )
      )
      .subscribe((transactionCRMS: ITransactionCRM[]) => (this.transactionCRMSSharedCollection = transactionCRMS));

    this.deliveryTermService
      .query()
      .pipe(map((res: HttpResponse<IDeliveryTerm[]>) => res.body ?? []))
      .pipe(
        map((deliveryTerms: IDeliveryTerm[]) =>
          this.deliveryTermService.addDeliveryTermToCollectionIfMissing<IDeliveryTerm>(deliveryTerms, this.supplierOffer?.deliveryTerm)
        )
      )
      .subscribe((deliveryTerms: IDeliveryTerm[]) => (this.deliveryTermsSharedCollection = deliveryTerms));
  }
}
