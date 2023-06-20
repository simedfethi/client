import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SupplierCategoryFormService } from './supplier-category-form.service';
import { SupplierCategoryService } from '../service/supplier-category.service';
import { ISupplierCategory } from '../supplier-category.model';

import { SupplierCategoryUpdateComponent } from './supplier-category-update.component';

describe('SupplierCategory Management Update Component', () => {
  let comp: SupplierCategoryUpdateComponent;
  let fixture: ComponentFixture<SupplierCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let supplierCategoryFormService: SupplierCategoryFormService;
  let supplierCategoryService: SupplierCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SupplierCategoryUpdateComponent],
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
      .overrideTemplate(SupplierCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SupplierCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    supplierCategoryFormService = TestBed.inject(SupplierCategoryFormService);
    supplierCategoryService = TestBed.inject(SupplierCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const supplierCategory: ISupplierCategory = { id: 456 };

      activatedRoute.data = of({ supplierCategory });
      comp.ngOnInit();

      expect(comp.supplierCategory).toEqual(supplierCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplierCategory>>();
      const supplierCategory = { id: 123 };
      jest.spyOn(supplierCategoryFormService, 'getSupplierCategory').mockReturnValue(supplierCategory);
      jest.spyOn(supplierCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplierCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: supplierCategory }));
      saveSubject.complete();

      // THEN
      expect(supplierCategoryFormService.getSupplierCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(supplierCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(supplierCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplierCategory>>();
      const supplierCategory = { id: 123 };
      jest.spyOn(supplierCategoryFormService, 'getSupplierCategory').mockReturnValue({ id: null });
      jest.spyOn(supplierCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplierCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: supplierCategory }));
      saveSubject.complete();

      // THEN
      expect(supplierCategoryFormService.getSupplierCategory).toHaveBeenCalled();
      expect(supplierCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplierCategory>>();
      const supplierCategory = { id: 123 };
      jest.spyOn(supplierCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplierCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(supplierCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
