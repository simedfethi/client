import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SupplierFormService } from './supplier-form.service';
import { SupplierService } from '../service/supplier.service';
import { ISupplier } from '../supplier.model';
import { ISupplierCategory } from 'app/entities/supplier-category/supplier-category.model';
import { SupplierCategoryService } from 'app/entities/supplier-category/service/supplier-category.service';

import { SupplierUpdateComponent } from './supplier-update.component';

describe('Supplier Management Update Component', () => {
  let comp: SupplierUpdateComponent;
  let fixture: ComponentFixture<SupplierUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let supplierFormService: SupplierFormService;
  let supplierService: SupplierService;
  let supplierCategoryService: SupplierCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SupplierUpdateComponent],
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
      .overrideTemplate(SupplierUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SupplierUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    supplierFormService = TestBed.inject(SupplierFormService);
    supplierService = TestBed.inject(SupplierService);
    supplierCategoryService = TestBed.inject(SupplierCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SupplierCategory query and add missing value', () => {
      const supplier: ISupplier = { id: 456 };
      const categorie: ISupplierCategory = { id: 5730 };
      supplier.categorie = categorie;

      const supplierCategoryCollection: ISupplierCategory[] = [{ id: 78460 }];
      jest.spyOn(supplierCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: supplierCategoryCollection })));
      const additionalSupplierCategories = [categorie];
      const expectedCollection: ISupplierCategory[] = [...additionalSupplierCategories, ...supplierCategoryCollection];
      jest.spyOn(supplierCategoryService, 'addSupplierCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ supplier });
      comp.ngOnInit();

      expect(supplierCategoryService.query).toHaveBeenCalled();
      expect(supplierCategoryService.addSupplierCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        supplierCategoryCollection,
        ...additionalSupplierCategories.map(expect.objectContaining)
      );
      expect(comp.supplierCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const supplier: ISupplier = { id: 456 };
      const categorie: ISupplierCategory = { id: 44346 };
      supplier.categorie = categorie;

      activatedRoute.data = of({ supplier });
      comp.ngOnInit();

      expect(comp.supplierCategoriesSharedCollection).toContain(categorie);
      expect(comp.supplier).toEqual(supplier);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplier>>();
      const supplier = { id: 123 };
      jest.spyOn(supplierFormService, 'getSupplier').mockReturnValue(supplier);
      jest.spyOn(supplierService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplier });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: supplier }));
      saveSubject.complete();

      // THEN
      expect(supplierFormService.getSupplier).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(supplierService.update).toHaveBeenCalledWith(expect.objectContaining(supplier));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplier>>();
      const supplier = { id: 123 };
      jest.spyOn(supplierFormService, 'getSupplier').mockReturnValue({ id: null });
      jest.spyOn(supplierService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplier: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: supplier }));
      saveSubject.complete();

      // THEN
      expect(supplierFormService.getSupplier).toHaveBeenCalled();
      expect(supplierService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplier>>();
      const supplier = { id: 123 };
      jest.spyOn(supplierService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplier });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(supplierService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSupplierCategory', () => {
      it('Should forward to supplierCategoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(supplierCategoryService, 'compareSupplierCategory');
        comp.compareSupplierCategory(entity, entity2);
        expect(supplierCategoryService.compareSupplierCategory).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
