import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmWilayaFormService } from './crm-wilaya-form.service';
import { CrmWilayaService } from '../service/crm-wilaya.service';
import { ICrmWilaya } from '../crm-wilaya.model';
import { ICrmCountry } from 'app/entities/crm-country/crm-country.model';
import { CrmCountryService } from 'app/entities/crm-country/service/crm-country.service';

import { CrmWilayaUpdateComponent } from './crm-wilaya-update.component';

describe('CrmWilaya Management Update Component', () => {
  let comp: CrmWilayaUpdateComponent;
  let fixture: ComponentFixture<CrmWilayaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmWilayaFormService: CrmWilayaFormService;
  let crmWilayaService: CrmWilayaService;
  let crmCountryService: CrmCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmWilayaUpdateComponent],
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
      .overrideTemplate(CrmWilayaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmWilayaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmWilayaFormService = TestBed.inject(CrmWilayaFormService);
    crmWilayaService = TestBed.inject(CrmWilayaService);
    crmCountryService = TestBed.inject(CrmCountryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CrmCountry query and add missing value', () => {
      const crmWilaya: ICrmWilaya = { id: 456 };
      const crmCountry: ICrmCountry = { id: 49104 };
      crmWilaya.crmCountry = crmCountry;

      const crmCountryCollection: ICrmCountry[] = [{ id: 32775 }];
      jest.spyOn(crmCountryService, 'query').mockReturnValue(of(new HttpResponse({ body: crmCountryCollection })));
      const additionalCrmCountries = [crmCountry];
      const expectedCollection: ICrmCountry[] = [...additionalCrmCountries, ...crmCountryCollection];
      jest.spyOn(crmCountryService, 'addCrmCountryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ crmWilaya });
      comp.ngOnInit();

      expect(crmCountryService.query).toHaveBeenCalled();
      expect(crmCountryService.addCrmCountryToCollectionIfMissing).toHaveBeenCalledWith(
        crmCountryCollection,
        ...additionalCrmCountries.map(expect.objectContaining)
      );
      expect(comp.crmCountriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const crmWilaya: ICrmWilaya = { id: 456 };
      const crmCountry: ICrmCountry = { id: 13578 };
      crmWilaya.crmCountry = crmCountry;

      activatedRoute.data = of({ crmWilaya });
      comp.ngOnInit();

      expect(comp.crmCountriesSharedCollection).toContain(crmCountry);
      expect(comp.crmWilaya).toEqual(crmWilaya);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmWilaya>>();
      const crmWilaya = { id: 123 };
      jest.spyOn(crmWilayaFormService, 'getCrmWilaya').mockReturnValue(crmWilaya);
      jest.spyOn(crmWilayaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmWilaya });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmWilaya }));
      saveSubject.complete();

      // THEN
      expect(crmWilayaFormService.getCrmWilaya).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmWilayaService.update).toHaveBeenCalledWith(expect.objectContaining(crmWilaya));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmWilaya>>();
      const crmWilaya = { id: 123 };
      jest.spyOn(crmWilayaFormService, 'getCrmWilaya').mockReturnValue({ id: null });
      jest.spyOn(crmWilayaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmWilaya: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmWilaya }));
      saveSubject.complete();

      // THEN
      expect(crmWilayaFormService.getCrmWilaya).toHaveBeenCalled();
      expect(crmWilayaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmWilaya>>();
      const crmWilaya = { id: 123 };
      jest.spyOn(crmWilayaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmWilaya });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmWilayaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCrmCountry', () => {
      it('Should forward to crmCountryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(crmCountryService, 'compareCrmCountry');
        comp.compareCrmCountry(entity, entity2);
        expect(crmCountryService.compareCrmCountry).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
