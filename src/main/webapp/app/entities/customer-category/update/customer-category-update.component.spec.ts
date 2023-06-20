import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CustomerCategoryFormService } from './customer-category-form.service';
import { CustomerCategoryService } from '../service/customer-category.service';
import { ICustomerCategory } from '../customer-category.model';

import { CustomerCategoryUpdateComponent } from './customer-category-update.component';

describe('CustomerCategory Management Update Component', () => {
  let comp: CustomerCategoryUpdateComponent;
  let fixture: ComponentFixture<CustomerCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let customerCategoryFormService: CustomerCategoryFormService;
  let customerCategoryService: CustomerCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CustomerCategoryUpdateComponent],
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
      .overrideTemplate(CustomerCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customerCategoryFormService = TestBed.inject(CustomerCategoryFormService);
    customerCategoryService = TestBed.inject(CustomerCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const customerCategory: ICustomerCategory = { id: 456 };

      activatedRoute.data = of({ customerCategory });
      comp.ngOnInit();

      expect(comp.customerCategory).toEqual(customerCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerCategory>>();
      const customerCategory = { id: 123 };
      jest.spyOn(customerCategoryFormService, 'getCustomerCategory').mockReturnValue(customerCategory);
      jest.spyOn(customerCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerCategory }));
      saveSubject.complete();

      // THEN
      expect(customerCategoryFormService.getCustomerCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(customerCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(customerCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerCategory>>();
      const customerCategory = { id: 123 };
      jest.spyOn(customerCategoryFormService, 'getCustomerCategory').mockReturnValue({ id: null });
      jest.spyOn(customerCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerCategory }));
      saveSubject.complete();

      // THEN
      expect(customerCategoryFormService.getCustomerCategory).toHaveBeenCalled();
      expect(customerCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerCategory>>();
      const customerCategory = { id: 123 };
      jest.spyOn(customerCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(customerCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
