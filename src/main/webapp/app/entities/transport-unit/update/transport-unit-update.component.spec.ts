import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TransportUnitFormService } from './transport-unit-form.service';
import { TransportUnitService } from '../service/transport-unit.service';
import { ITransportUnit } from '../transport-unit.model';

import { TransportUnitUpdateComponent } from './transport-unit-update.component';

describe('TransportUnit Management Update Component', () => {
  let comp: TransportUnitUpdateComponent;
  let fixture: ComponentFixture<TransportUnitUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let transportUnitFormService: TransportUnitFormService;
  let transportUnitService: TransportUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TransportUnitUpdateComponent],
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
      .overrideTemplate(TransportUnitUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TransportUnitUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    transportUnitFormService = TestBed.inject(TransportUnitFormService);
    transportUnitService = TestBed.inject(TransportUnitService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const transportUnit: ITransportUnit = { id: 456 };

      activatedRoute.data = of({ transportUnit });
      comp.ngOnInit();

      expect(comp.transportUnit).toEqual(transportUnit);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransportUnit>>();
      const transportUnit = { id: 123 };
      jest.spyOn(transportUnitFormService, 'getTransportUnit').mockReturnValue(transportUnit);
      jest.spyOn(transportUnitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transportUnit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transportUnit }));
      saveSubject.complete();

      // THEN
      expect(transportUnitFormService.getTransportUnit).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(transportUnitService.update).toHaveBeenCalledWith(expect.objectContaining(transportUnit));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransportUnit>>();
      const transportUnit = { id: 123 };
      jest.spyOn(transportUnitFormService, 'getTransportUnit').mockReturnValue({ id: null });
      jest.spyOn(transportUnitService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transportUnit: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transportUnit }));
      saveSubject.complete();

      // THEN
      expect(transportUnitFormService.getTransportUnit).toHaveBeenCalled();
      expect(transportUnitService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransportUnit>>();
      const transportUnit = { id: 123 };
      jest.spyOn(transportUnitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transportUnit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(transportUnitService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
