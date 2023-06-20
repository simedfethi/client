import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CrmConcurrentFormService } from './crm-concurrent-form.service';
import { CrmConcurrentService } from '../service/crm-concurrent.service';
import { ICrmConcurrent } from '../crm-concurrent.model';

import { CrmConcurrentUpdateComponent } from './crm-concurrent-update.component';

describe('CrmConcurrent Management Update Component', () => {
  let comp: CrmConcurrentUpdateComponent;
  let fixture: ComponentFixture<CrmConcurrentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let crmConcurrentFormService: CrmConcurrentFormService;
  let crmConcurrentService: CrmConcurrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CrmConcurrentUpdateComponent],
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
      .overrideTemplate(CrmConcurrentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CrmConcurrentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    crmConcurrentFormService = TestBed.inject(CrmConcurrentFormService);
    crmConcurrentService = TestBed.inject(CrmConcurrentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const crmConcurrent: ICrmConcurrent = { id: 456 };

      activatedRoute.data = of({ crmConcurrent });
      comp.ngOnInit();

      expect(comp.crmConcurrent).toEqual(crmConcurrent);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmConcurrent>>();
      const crmConcurrent = { id: 123 };
      jest.spyOn(crmConcurrentFormService, 'getCrmConcurrent').mockReturnValue(crmConcurrent);
      jest.spyOn(crmConcurrentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmConcurrent });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmConcurrent }));
      saveSubject.complete();

      // THEN
      expect(crmConcurrentFormService.getCrmConcurrent).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(crmConcurrentService.update).toHaveBeenCalledWith(expect.objectContaining(crmConcurrent));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmConcurrent>>();
      const crmConcurrent = { id: 123 };
      jest.spyOn(crmConcurrentFormService, 'getCrmConcurrent').mockReturnValue({ id: null });
      jest.spyOn(crmConcurrentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmConcurrent: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: crmConcurrent }));
      saveSubject.complete();

      // THEN
      expect(crmConcurrentFormService.getCrmConcurrent).toHaveBeenCalled();
      expect(crmConcurrentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICrmConcurrent>>();
      const crmConcurrent = { id: 123 };
      jest.spyOn(crmConcurrentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ crmConcurrent });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(crmConcurrentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
