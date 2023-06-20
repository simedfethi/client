import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmDocumentLineFormService } from './crm-document-line-form.service';
import { CrmDocumentLineService } from '../service/crm-document-line.service';
import { ICrmDocumentLine } from '../crm-document-line.model';
import { IUniteMesure } from 'app/entities/unite-mesure/unite-mesure.model';
import { UniteMesureService } from 'app/entities/unite-mesure/service/unite-mesure.service';
import { ICrmConcurrent } from 'app/entities/crm-concurrent/crm-concurrent.model';
import { CrmConcurrentService } from 'app/entities/crm-concurrent/service/crm-concurrent.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { ICrmDocument } from 'app/entities/crm-document/crm-document.model';
import { CrmDocumentService } from 'app/entities/crm-document/service/crm-document.service';

import { CrmDocumentLineUpdateComponent } from './crm-document-line-update.component';

describe('CrmDocumentLine Management Update Component', () => {
  let comp: CrmDocumentLineUpdateComponent;
  let fixture: ComponentFixture<CrmDocumentLineUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmDocumentLineFormService: CrmDocumentLineFormService;
  let crmDocumentLineService: CrmDocumentLineService;
  let uniteMesureService: UniteMesureService;
  let crmConcurrentService: CrmConcurrentService;
  let productService: ProductService;
  let crmDocumentService: CrmDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmDocumentLineUpdateComponent],
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
      .overrideTemplate(CrmDocumentLineUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmDocumentLineUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmDocumentLineFormService = TestBed.inject(CrmDocumentLineFormService);
    crmDocumentLineService = TestBed.inject(CrmDocumentLineService);
    uniteMesureService = TestBed.inject(UniteMesureService);
    crmConcurrentService = TestBed.inject(CrmConcurrentService);
    productService = TestBed.inject(ProductService);
    crmDocumentService = TestBed.inject(CrmDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call UniteMesure query and add missing value', () => {
      const crmDocumentLine: ICrmDocumentLine = { id: 456 };
      const unite: IUniteMesure = { id: 51110 };
      crmDocumentLine.unite = unite;

      const uniteMesureCollection: IUniteMesure[] = [{ id: 16995 }];
      jest.spyOn(uniteMesureService, 'query').mockReturnValue(of(new HttpResponse({ body: uniteMesureCollection })));
      const additionalUniteMesures = [unite];
      const expectedCollection: IUniteMesure[] = [...additionalUniteMesures, ...uniteMesureCollection];
      jest.spyOn(uniteMesureService, 'addUniteMesureToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocumentLine });
      comp.ngOnInit();

      expect(uniteMesureService.query).toHaveBeenCalled();
      expect(uniteMesureService.addUniteMesureToCollectionIfMissing).toHaveBeenCalledWith(
        uniteMesureCollection,
        ...additionalUniteMesures.map(expect.objectContaining)
      );
      expect(comp.uniteMesuresSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CrmConcurrent query and add missing value', () => {
      const crmDocumentLine: ICrmDocumentLine = { id: 456 };
      const sourceAprov: ICrmConcurrent = { id: 77547 };
      crmDocumentLine.sourceAprov = sourceAprov;

      const crmConcurrentCollection: ICrmConcurrent[] = [{ id: 9853 }];
      jest.spyOn(crmConcurrentService, 'query').mockReturnValue(of(new HttpResponse({ body: crmConcurrentCollection })));
      const additionalCrmConcurrents = [sourceAprov];
      const expectedCollection: ICrmConcurrent[] = [...additionalCrmConcurrents, ...crmConcurrentCollection];
      jest.spyOn(crmConcurrentService, 'addCrmConcurrentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocumentLine });
      comp.ngOnInit();

      expect(crmConcurrentService.query).toHaveBeenCalled();
      expect(crmConcurrentService.addCrmConcurrentToCollectionIfMissing).toHaveBeenCalledWith(
        crmConcurrentCollection,
        ...additionalCrmConcurrents.map(expect.objectContaining)
      );
      expect(comp.crmConcurrentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Product query and add missing value', () => {
      const crmDocumentLine: ICrmDocumentLine = { id: 456 };
      const produit: IProduct = { id: 56184 };
      crmDocumentLine.produit = produit;

      const productCollection: IProduct[] = [{ id: 41724 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [produit];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocumentLine });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining)
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CrmDocument query and add missing value', () => {
      const crmDocumentLine: ICrmDocumentLine = { id: 456 };
      const crmDocument: ICrmDocument = { id: 87714 };
      crmDocumentLine.crmDocument = crmDocument;

      const crmDocumentCollection: ICrmDocument[] = [{ id: 77999 }];
      jest.spyOn(crmDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: crmDocumentCollection })));
      const additionalCrmDocuments = [crmDocument];
      const expectedCollection: ICrmDocument[] = [...additionalCrmDocuments, ...crmDocumentCollection];
      jest.spyOn(crmDocumentService, 'addCrmDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmDocumentLine });
      comp.ngOnInit();

      expect(crmDocumentService.query).toHaveBeenCalled();
      expect(crmDocumentService.addCrmDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        crmDocumentCollection,
        ...additionalCrmDocuments.map(expect.objectContaining)
      );
      expect(comp.crmDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const crmDocumentLine: ICrmDocumentLine = { id: 456 };
      const unite: IUniteMesure = { id: 86452 };
      crmDocumentLine.unite = unite;
      const sourceAprov: ICrmConcurrent = { id: 38284 };
      crmDocumentLine.sourceAprov = sourceAprov;
      const produit: IProduct = { id: 59930 };
      crmDocumentLine.produit = produit;
      const crmDocument: ICrmDocument = { id: 33470 };
      crmDocumentLine.crmDocument = crmDocument;

      activatedRoute.data = of({ crmDocumentLine });
      comp.ngOnInit();

      expect(comp.uniteMesuresSharedCollection).toContain(unite);
      expect(comp.crmConcurrentsSharedCollection).toContain(sourceAprov);
      expect(comp.productsSharedCollection).toContain(produit);
      expect(comp.crmDocumentsSharedCollection).toContain(crmDocument);
      expect(comp.crmDocumentLine).toEqual(crmDocumentLine);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDocumentLine>>();
      const crmDocumentLine = { id: 123 };
      jest.spyOn(crmDocumentLineFormService, 'getCrmDocumentLine').mockReturnValue(crmDocumentLine);
      jest.spyOn(crmDocumentLineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDocumentLine });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmDocumentLine }));
      saveSubject.complete();

      // THEN
      expect(crmDocumentLineFormService.getCrmDocumentLine).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmDocumentLineService.update).toHaveBeenCalledWith(expect.objectContaining(crmDocumentLine));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDocumentLine>>();
      const crmDocumentLine = { id: 123 };
      jest.spyOn(crmDocumentLineFormService, 'getCrmDocumentLine').mockReturnValue({ id: null });
      jest.spyOn(crmDocumentLineService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDocumentLine: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmDocumentLine }));
      saveSubject.complete();

      // THEN
      expect(crmDocumentLineFormService.getCrmDocumentLine).toHaveBeenCalled();
      expect(crmDocumentLineService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDocumentLine>>();
      const crmDocumentLine = { id: 123 };
      jest.spyOn(crmDocumentLineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDocumentLine });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmDocumentLineService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUniteMesure', () => {
      it('Should forward to uniteMesureService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(uniteMesureService, 'compareUniteMesure');
        comp.compareUniteMesure(entity, entity2);
        expect(uniteMesureService.compareUniteMesure).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCrmConcurrent', () => {
      it('Should forward to crmConcurrentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmConcurrentService, 'compareCrmConcurrent');
        comp.compareCrmConcurrent(entity, entity2);
        expect(crmConcurrentService.compareCrmConcurrent).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProduct', () => {
      it('Should forward to productService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCrmDocument', () => {
      it('Should forward to crmDocumentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmDocumentService, 'compareCrmDocument');
        comp.compareCrmDocument(entity, entity2);
        expect(crmDocumentService.compareCrmDocument).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
