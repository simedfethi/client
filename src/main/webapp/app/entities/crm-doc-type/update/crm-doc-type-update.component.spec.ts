import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmDocTypeFormService } from './crm-doc-type-form.service';
import { CrmDocTypeService } from '../service/crm-doc-type.service';
import { ICrmDocType } from '../crm-doc-type.model';

import { CrmDocTypeUpdateComponent } from './crm-doc-type-update.component';

describe('CrmDocType Management Update Component', () => {
  let comp: CrmDocTypeUpdateComponent;
  let fixture: ComponentFixture<CrmDocTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmDocTypeFormService: CrmDocTypeFormService;
  let crmDocTypeService: CrmDocTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmDocTypeUpdateComponent],
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
      .overrideTemplate(CrmDocTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmDocTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmDocTypeFormService = TestBed.inject(CrmDocTypeFormService);
    crmDocTypeService = TestBed.inject(CrmDocTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crmDocType: ICrmDocType = { id: 456 };

      activatedRoute.data = of({ crmDocType });
      comp.ngOnInit();

      expect(comp.crmDocType).toEqual(crmDocType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDocType>>();
      const crmDocType = { id: 123 };
      jest.spyOn(crmDocTypeFormService, 'getCrmDocType').mockReturnValue(crmDocType);
      jest.spyOn(crmDocTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDocType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmDocType }));
      saveSubject.complete();

      // THEN
      expect(crmDocTypeFormService.getCrmDocType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmDocTypeService.update).toHaveBeenCalledWith(expect.objectContaining(crmDocType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDocType>>();
      const crmDocType = { id: 123 };
      jest.spyOn(crmDocTypeFormService, 'getCrmDocType').mockReturnValue({ id: null });
      jest.spyOn(crmDocTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDocType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmDocType }));
      saveSubject.complete();

      // THEN
      expect(crmDocTypeFormService.getCrmDocType).toHaveBeenCalled();
      expect(crmDocTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmDocType>>();
      const crmDocType = { id: 123 };
      jest.spyOn(crmDocTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmDocType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmDocTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
