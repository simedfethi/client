import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProductvarianteFormService } from './productvariante-form.service';
import { ProductvarianteService } from '../service/productvariante.service';
import { IProductvariante } from '../productvariante.model';

import { ProductvarianteUpdateComponent } from './productvariante-update.component';

describe('Productvariante Management Update Component', () => {
  let comp: ProductvarianteUpdateComponent;
  let fixture: ComponentFixture<ProductvarianteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let productvarianteFormService: ProductvarianteFormService;
  let productvarianteService: ProductvarianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductvarianteUpdateComponent],
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
      .overrideTemplate(ProductvarianteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductvarianteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productvarianteFormService = TestBed.inject(ProductvarianteFormService);
    productvarianteService = TestBed.inject(ProductvarianteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const productvariante: IProductvariante = { id: 456 };

      activatedRoute.data = of({ productvariante });
      comp.ngOnInit();

      expect(comp.productvariante).toEqual(productvariante);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductvariante>>();
      const productvariante = { id: 123 };
      jest.spyOn(productvarianteFormService, 'getProductvariante').mockReturnValue(productvariante);
      jest.spyOn(productvarianteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productvariante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productvariante }));
      saveSubject.complete();

      // THEN
      expect(productvarianteFormService.getProductvariante).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(productvarianteService.update).toHaveBeenCalledWith(expect.objectContaining(productvariante));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductvariante>>();
      const productvariante = { id: 123 };
      jest.spyOn(productvarianteFormService, 'getProductvariante').mockReturnValue({ id: null });
      jest.spyOn(productvarianteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productvariante: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productvariante }));
      saveSubject.complete();

      // THEN
      expect(productvarianteFormService.getProductvariante).toHaveBeenCalled();
      expect(productvarianteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductvariante>>();
      const productvariante = { id: 123 };
      jest.spyOn(productvarianteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productvariante });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(productvarianteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
