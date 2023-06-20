import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UniteMesureFormService } from './unite-mesure-form.service';
import { UniteMesureService } from '../service/unite-mesure.service';
import { IUniteMesure } from '../unite-mesure.model';

import { UniteMesureUpdateComponent } from './unite-mesure-update.component';

describe('UniteMesure Management Update Component', () => {
  let comp: UniteMesureUpdateComponent;
  let fixture: ComponentFixture<UniteMesureUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let uniteMesureFormService: UniteMesureFormService;
  let uniteMesureService: UniteMesureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UniteMesureUpdateComponent],
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
      .overrideTemplate(UniteMesureUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UniteMesureUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    uniteMesureFormService = TestBed.inject(UniteMesureFormService);
    uniteMesureService = TestBed.inject(UniteMesureService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const uniteMesure: IUniteMesure = { id: 456 };

      activatedRoute.data = of({ uniteMesure });
      comp.ngOnInit();

      expect(comp.uniteMesure).toEqual(uniteMesure);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUniteMesure>>();
      const uniteMesure = { id: 123 };
      jest.spyOn(uniteMesureFormService, 'getUniteMesure').mockReturnValue(uniteMesure);
      jest.spyOn(uniteMesureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ uniteMesure });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: uniteMesure }));
      saveSubject.complete();

      // THEN
      expect(uniteMesureFormService.getUniteMesure).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(uniteMesureService.update).toHaveBeenCalledWith(expect.objectContaining(uniteMesure));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUniteMesure>>();
      const uniteMesure = { id: 123 };
      jest.spyOn(uniteMesureFormService, 'getUniteMesure').mockReturnValue({ id: null });
      jest.spyOn(uniteMesureService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ uniteMesure: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: uniteMesure }));
      saveSubject.complete();

      // THEN
      expect(uniteMesureFormService.getUniteMesure).toHaveBeenCalled();
      expect(uniteMesureService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUniteMesure>>();
      const uniteMesure = { id: 123 };
      jest.spyOn(uniteMesureService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ uniteMesure });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(uniteMesureService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
