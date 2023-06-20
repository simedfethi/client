import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmCountryFormService } from './crm-country-form.service';
import { CrmCountryService } from '../service/crm-country.service';
import { ICrmCountry } from '../crm-country.model';

import { CrmCountryUpdateComponent } from './crm-country-update.component';

describe('CrmCountry Management Update Component', () => {
  let comp: CrmCountryUpdateComponent;
  let fixture: ComponentFixture<CrmCountryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmCountryFormService: CrmCountryFormService;
  let crmCountryService: CrmCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmCountryUpdateComponent],
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
      .overrideTemplate(CrmCountryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmCountryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmCountryFormService = TestBed.inject(CrmCountryFormService);
    crmCountryService = TestBed.inject(CrmCountryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crmCountry: ICrmCountry = { id: 456 };

      activatedRoute.data = of({ crmCountry });
      comp.ngOnInit();

      expect(comp.crmCountry).toEqual(crmCountry);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmCountry>>();
      const crmCountry = { id: 123 };
      jest.spyOn(crmCountryFormService, 'getCrmCountry').mockReturnValue(crmCountry);
      jest.spyOn(crmCountryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmCountry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmCountry }));
      saveSubject.complete();

      // THEN
      expect(crmCountryFormService.getCrmCountry).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmCountryService.update).toHaveBeenCalledWith(expect.objectContaining(crmCountry));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmCountry>>();
      const crmCountry = { id: 123 };
      jest.spyOn(crmCountryFormService, 'getCrmCountry').mockReturnValue({ id: null });
      jest.spyOn(crmCountryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmCountry: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmCountry }));
      saveSubject.complete();

      // THEN
      expect(crmCountryFormService.getCrmCountry).toHaveBeenCalled();
      expect(crmCountryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmCountry>>();
      const crmCountry = { id: 123 };
      jest.spyOn(crmCountryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmCountry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmCountryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
