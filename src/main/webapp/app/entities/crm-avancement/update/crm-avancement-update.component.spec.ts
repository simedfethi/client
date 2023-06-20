import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmAvancementFormService } from './crm-avancement-form.service';
import { CrmAvancementService } from '../service/crm-avancement.service';
import { ICrmAvancement } from '../crm-avancement.model';

import { CrmAvancementUpdateComponent } from './crm-avancement-update.component';

describe('CrmAvancement Management Update Component', () => {
  let comp: CrmAvancementUpdateComponent;
  let fixture: ComponentFixture<CrmAvancementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmAvancementFormService: CrmAvancementFormService;
  let crmAvancementService: CrmAvancementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmAvancementUpdateComponent],
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
      .overrideTemplate(CrmAvancementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmAvancementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmAvancementFormService = TestBed.inject(CrmAvancementFormService);
    crmAvancementService = TestBed.inject(CrmAvancementService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crmAvancement: ICrmAvancement = { id: 456 };

      activatedRoute.data = of({ crmAvancement });
      comp.ngOnInit();

      expect(comp.crmAvancement).toEqual(crmAvancement);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmAvancement>>();
      const crmAvancement = { id: 123 };
      jest.spyOn(crmAvancementFormService, 'getCrmAvancement').mockReturnValue(crmAvancement);
      jest.spyOn(crmAvancementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmAvancement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmAvancement }));
      saveSubject.complete();

      // THEN
      expect(crmAvancementFormService.getCrmAvancement).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmAvancementService.update).toHaveBeenCalledWith(expect.objectContaining(crmAvancement));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmAvancement>>();
      const crmAvancement = { id: 123 };
      jest.spyOn(crmAvancementFormService, 'getCrmAvancement').mockReturnValue({ id: null });
      jest.spyOn(crmAvancementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmAvancement: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmAvancement }));
      saveSubject.complete();

      // THEN
      expect(crmAvancementFormService.getCrmAvancement).toHaveBeenCalled();
      expect(crmAvancementService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmAvancement>>();
      const crmAvancement = { id: 123 };
      jest.spyOn(crmAvancementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmAvancement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmAvancementService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
