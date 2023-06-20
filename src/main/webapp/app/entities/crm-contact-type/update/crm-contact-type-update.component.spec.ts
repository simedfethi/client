import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmContactTypeFormService } from './crm-contact-type-form.service';
import { CrmContactTypeService } from '../service/crm-contact-type.service';
import { ICrmContactType } from '../crm-contact-type.model';

import { CrmContactTypeUpdateComponent } from './crm-contact-type-update.component';

describe('CrmContactType Management Update Component', () => {
  let comp: CrmContactTypeUpdateComponent;
  let fixture: ComponentFixture<CrmContactTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmContactTypeFormService: CrmContactTypeFormService;
  let crmContactTypeService: CrmContactTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmContactTypeUpdateComponent],
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
      .overrideTemplate(CrmContactTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmContactTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmContactTypeFormService = TestBed.inject(CrmContactTypeFormService);
    crmContactTypeService = TestBed.inject(CrmContactTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crmContactType: ICrmContactType = { id: 456 };

      activatedRoute.data = of({ crmContactType });
      comp.ngOnInit();

      expect(comp.crmContactType).toEqual(crmContactType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmContactType>>();
      const crmContactType = { id: 123 };
      jest.spyOn(crmContactTypeFormService, 'getCrmContactType').mockReturnValue(crmContactType);
      jest.spyOn(crmContactTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmContactType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmContactType }));
      saveSubject.complete();

      // THEN
      expect(crmContactTypeFormService.getCrmContactType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmContactTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crmContactType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmContactType>>();
      const crmContactType = { id: 123 };
      jest.spyOn(crmContactTypeFormService, 'getCrmContactType').mockReturnValue({ id: null });
      jest.spyOn(crmContactTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmContactType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmContactType }));
      saveSubject.complete();

      // THEN
      expect(crmContactTypeFormService.getCrmContactType).toHaveBeenCalled();
      expect(crmContactTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmContactType>>();
      const crmContactType = { id: 123 };
      jest.spyOn(crmContactTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmContactType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmContactTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
