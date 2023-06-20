import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DeliveryTermFormService } from './delivery-term-form.service';
import { DeliveryTermService } from '../service/delivery-term.service';
import { IDeliveryTerm } from '../delivery-term.model';

import { DeliveryTermUpdateComponent } from './delivery-term-update.component';

describe('DeliveryTerm Management Update Component', () => {
  let comp: DeliveryTermUpdateComponent;
  let fixture: ComponentFixture<DeliveryTermUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let deliveryTermFormService: DeliveryTermFormService;
  let deliveryTermService: DeliveryTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DeliveryTermUpdateComponent],
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
      .overrideTemplate(DeliveryTermUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeliveryTermUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    deliveryTermFormService = TestBed.inject(DeliveryTermFormService);
    deliveryTermService = TestBed.inject(DeliveryTermService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const deliveryTerm: IDeliveryTerm = { id: 456 };

      activatedRoute.data = of({ deliveryTerm });
      comp.ngOnInit();

      expect(comp.deliveryTerm).toEqual(deliveryTerm);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryTerm>>();
      const deliveryTerm = { id: 123 };
      jest.spyOn(deliveryTermFormService, 'getDeliveryTerm').mockReturnValue(deliveryTerm);
      jest.spyOn(deliveryTermService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryTerm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryTerm }));
      saveSubject.complete();

      // THEN
      expect(deliveryTermFormService.getDeliveryTerm).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(deliveryTermService.update).toHaveBeenCalledWith(expect.objectContaining(deliveryTerm));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryTerm>>();
      const deliveryTerm = { id: 123 };
      jest.spyOn(deliveryTermFormService, 'getDeliveryTerm').mockReturnValue({ id: null });
      jest.spyOn(deliveryTermService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryTerm: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryTerm }));
      saveSubject.complete();

      // THEN
      expect(deliveryTermFormService.getDeliveryTerm).toHaveBeenCalled();
      expect(deliveryTermService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryTerm>>();
      const deliveryTerm = { id: 123 };
      jest.spyOn(deliveryTermService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryTerm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(deliveryTermService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
