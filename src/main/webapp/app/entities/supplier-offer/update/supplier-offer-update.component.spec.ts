import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SupplierOfferFormService } from './supplier-offer-form.service';
import { SupplierOfferService } from '../service/supplier-offer.service';
import { ISupplierOffer } from '../supplier-offer.model';
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

import { SupplierOfferUpdateComponent } from './supplier-offer-update.component';

describe('SupplierOffer Management Update Component', () => {
  let comp: SupplierOfferUpdateComponent;
  let fixture: ComponentFixture<SupplierOfferUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let supplierOfferFormService: SupplierOfferFormService;
  let supplierOfferService: SupplierOfferService;
  let productService: ProductService;
  let uniteMesureService: UniteMesureService;
  let supplierService: SupplierService;
  let transactionCRMService: TransactionCRMService;
  let deliveryTermService: DeliveryTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SupplierOfferUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(SupplierOfferUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SupplierOfferUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    supplierOfferFormService = TestBed.inject(SupplierOfferFormService);
    supplierOfferService = TestBed.inject(SupplierOfferService);
    productService = TestBed.inject(ProductService);
    uniteMesureService = TestBed.inject(UniteMesureService);
    supplierService = TestBed.inject(SupplierService);
    transactionCRMService = TestBed.inject(TransactionCRMService);
    deliveryTermService = TestBed.inject(DeliveryTermService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Product query and add missing value', () => {
      const supplierOffer: ISupplierOffer = { id: 456 };
      const product: IProduct = { id: 92740 };
      supplierOffer.product = product;

      const productCollection: IProduct[] = [{ id: 3599 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ supplierOffer });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining)
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UniteMesure query and add missing value', () => {
      const supplierOffer: ISupplierOffer = { id: 456 };
      const uniteMesure: IUniteMesure = { id: 47487 };
      supplierOffer.uniteMesure = uniteMesure;

      const uniteMesureCollection: IUniteMesure[] = [{ id: 82596 }];
      jest.spyOn(uniteMesureService, 'query').mockReturnValue(of(new HttpResponse({ body: uniteMesureCollection })));
      const additionalUniteMesures = [uniteMesure];
      const expectedCollection: IUniteMesure[] = [...additionalUniteMesures, ...uniteMesureCollection];
      jest.spyOn(uniteMesureService, 'addUniteMesureToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ supplierOffer });
      comp.ngOnInit();

      expect(uniteMesureService.query).toHaveBeenCalled();
      expect(uniteMesureService.addUniteMesureToCollectionIfMissing).toHaveBeenCalledWith(
        uniteMesureCollection,
        ...additionalUniteMesures.map(expect.objectContaining)
      );
      expect(comp.uniteMesuresSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Supplier query and add missing value', () => {
      const supplierOffer: ISupplierOffer = { id: 456 };
      const supplier: ISupplier = { id: 88566 };
      supplierOffer.supplier = supplier;

      const supplierCollection: ISupplier[] = [{ id: 30641 }];
      jest.spyOn(supplierService, 'query').mockReturnValue(of(new HttpResponse({ body: supplierCollection })));
      const additionalSuppliers = [supplier];
      const expectedCollection: ISupplier[] = [...additionalSuppliers, ...supplierCollection];
      jest.spyOn(supplierService, 'addSupplierToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ supplierOffer });
      comp.ngOnInit();

      expect(supplierService.query).toHaveBeenCalled();
      expect(supplierService.addSupplierToCollectionIfMissing).toHaveBeenCalledWith(
        supplierCollection,
        ...additionalSuppliers.map(expect.objectContaining)
      );
      expect(comp.suppliersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TransactionCRM query and add missing value', () => {
      const supplierOffer: ISupplierOffer = { id: 456 };
      const transactionCRM: ITransactionCRM = { id: 42007 };
      supplierOffer.transactionCRM = transactionCRM;

      const transactionCRMCollection: ITransactionCRM[] = [{ id: 50154 }];
      jest.spyOn(transactionCRMService, 'query').mockReturnValue(of(new HttpResponse({ body: transactionCRMCollection })));
      const additionalTransactionCRMS = [transactionCRM];
      const expectedCollection: ITransactionCRM[] = [...additionalTransactionCRMS, ...transactionCRMCollection];
      jest.spyOn(transactionCRMService, 'addTransactionCRMToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ supplierOffer });
      comp.ngOnInit();

      expect(transactionCRMService.query).toHaveBeenCalled();
      expect(transactionCRMService.addTransactionCRMToCollectionIfMissing).toHaveBeenCalledWith(
        transactionCRMCollection,
        ...additionalTransactionCRMS.map(expect.objectContaining)
      );
      expect(comp.transactionCRMSSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DeliveryTerm query and add missing value', () => {
      const supplierOffer: ISupplierOffer = { id: 456 };
      const deliveryTerm: IDeliveryTerm = { id: 60834 };
      supplierOffer.deliveryTerm = deliveryTerm;

      const deliveryTermCollection: IDeliveryTerm[] = [{ id: 79615 }];
      jest.spyOn(deliveryTermService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryTermCollection })));
      const additionalDeliveryTerms = [deliveryTerm];
      const expectedCollection: IDeliveryTerm[] = [...additionalDeliveryTerms, ...deliveryTermCollection];
      jest.spyOn(deliveryTermService, 'addDeliveryTermToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ supplierOffer });
      comp.ngOnInit();

      expect(deliveryTermService.query).toHaveBeenCalled();
      expect(deliveryTermService.addDeliveryTermToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryTermCollection,
        ...additionalDeliveryTerms.map(expect.objectContaining)
      );
      expect(comp.deliveryTermsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const supplierOffer: ISupplierOffer = { id: 456 };
      const product: IProduct = { id: 24697 };
      supplierOffer.product = product;
      const uniteMesure: IUniteMesure = { id: 71809 };
      supplierOffer.uniteMesure = uniteMesure;
      const supplier: ISupplier = { id: 69554 };
      supplierOffer.supplier = supplier;
      const transactionCRM: ITransactionCRM = { id: 18072 };
      supplierOffer.transactionCRM = transactionCRM;
      const deliveryTerm: IDeliveryTerm = { id: 51983 };
      supplierOffer.deliveryTerm = deliveryTerm;

      activatedRoute.data = of({ supplierOffer });
      comp.ngOnInit();

      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.uniteMesuresSharedCollection).toContain(uniteMesure);
      expect(comp.suppliersSharedCollection).toContain(supplier);
      expect(comp.transactionCRMSSharedCollection).toContain(transactionCRM);
      expect(comp.deliveryTermsSharedCollection).toContain(deliveryTerm);
      expect(comp.supplierOffer).toEqual(supplierOffer);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplierOffer>>();
      const supplierOffer = { id: 123 };
      jest.spyOn(supplierOfferFormService, 'getSupplierOffer').mockReturnValue(supplierOffer);
      jest.spyOn(supplierOfferService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplierOffer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: supplierOffer }));
      saveSubject.complete();

      // THEN
      expect(supplierOfferFormService.getSupplierOffer).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(supplierOfferService.update).toHaveBeenCalledWith(expect.objectContaining(supplierOffer));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplierOffer>>();
      const supplierOffer = { id: 123 };
      jest.spyOn(supplierOfferFormService, 'getSupplierOffer').mockReturnValue({ id: null });
      jest.spyOn(supplierOfferService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplierOffer: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: supplierOffer }));
      saveSubject.complete();

      // THEN
      expect(supplierOfferFormService.getSupplierOffer).toHaveBeenCalled();
      expect(supplierOfferService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplierOffer>>();
      const supplierOffer = { id: 123 };
      jest.spyOn(supplierOfferService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplierOffer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(supplierOfferService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProduct', () => {
      it('Should forward to productService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUniteMesure', () => {
      it('Should forward to uniteMesureService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(uniteMesureService, 'compareUniteMesure');
        comp.compareUniteMesure(entity, entity2);
        expect(uniteMesureService.compareUniteMesure).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSupplier', () => {
      it('Should forward to supplierService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(supplierService, 'compareSupplier');
        comp.compareSupplier(entity, entity2);
        expect(supplierService.compareSupplier).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTransactionCRM', () => {
      it('Should forward to transactionCRMService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(transactionCRMService, 'compareTransactionCRM');
        comp.compareTransactionCRM(entity, entity2);
        expect(transactionCRMService.compareTransactionCRM).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDeliveryTerm', () => {
      it('Should forward to deliveryTermService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(deliveryTermService, 'compareDeliveryTerm');
        comp.compareDeliveryTerm(entity, entity2);
        expect(deliveryTermService.compareDeliveryTerm).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
