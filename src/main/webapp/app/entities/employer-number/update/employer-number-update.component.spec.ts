import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmployerNumberFormService } from './employer-number-form.service';
import { EmployerNumberService } from '../service/employer-number.service';
import { IEmployerNumber } from '../employer-number.model';

import { EmployerNumberUpdateComponent } from './employer-number-update.component';

describe('EmployerNumber Management Update Component', () => {
  let comp: EmployerNumberUpdateComponent;
  let fixture: ComponentFixture<EmployerNumberUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employerNumberFormService: EmployerNumberFormService;
  let employerNumberService: EmployerNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmployerNumberUpdateComponent],
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
      .overrideTemplate(EmployerNumberUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployerNumberUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employerNumberFormService = TestBed.inject(EmployerNumberFormService);
    employerNumberService = TestBed.inject(EmployerNumberService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const employerNumber: IEmployerNumber = { id: 456 };

      activatedRoute.data = of({ employerNumber });
      comp.ngOnInit();

      expect(comp.employerNumber).toEqual(employerNumber);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployerNumber>>();
      const employerNumber = { id: 123 };
      jest.spyOn(employerNumberFormService, 'getEmployerNumber').mockReturnValue(employerNumber);
      jest.spyOn(employerNumberService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employerNumber });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employerNumber }));
      saveSubject.complete();

      // THEN
      expect(employerNumberFormService.getEmployerNumber).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(employerNumberService.update).toHaveBeenCalledWith(expect.objectContaining(employerNumber));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployerNumber>>();
      const employerNumber = { id: 123 };
      jest.spyOn(employerNumberFormService, 'getEmployerNumber').mockReturnValue({ id: null });
      jest.spyOn(employerNumberService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employerNumber: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employerNumber }));
      saveSubject.complete();

      // THEN
      expect(employerNumberFormService.getEmployerNumber).toHaveBeenCalled();
      expect(employerNumberService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployerNumber>>();
      const employerNumber = { id: 123 };
      jest.spyOn(employerNumberService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employerNumber });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employerNumberService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
