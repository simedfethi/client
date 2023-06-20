import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmailTemplateFormService } from './email-template-form.service';
import { EmailTemplateService } from '../service/email-template.service';
import { IEmailTemplate } from '../email-template.model';

import { EmailTemplateUpdateComponent } from './email-template-update.component';

describe('EmailTemplate Management Update Component', () => {
  let comp: EmailTemplateUpdateComponent;
  let fixture: ComponentFixture<EmailTemplateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let emailTemplateFormService: EmailTemplateFormService;
  let emailTemplateService: EmailTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmailTemplateUpdateComponent],
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
      .overrideTemplate(EmailTemplateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmailTemplateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    emailTemplateFormService = TestBed.inject(EmailTemplateFormService);
    emailTemplateService = TestBed.inject(EmailTemplateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const emailTemplate: IEmailTemplate = { id: 456 };

      activatedRoute.data = of({ emailTemplate });
      comp.ngOnInit();

      expect(comp.emailTemplate).toEqual(emailTemplate);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmailTemplate>>();
      const emailTemplate = { id: 123 };
      jest.spyOn(emailTemplateFormService, 'getEmailTemplate').mockReturnValue(emailTemplate);
      jest.spyOn(emailTemplateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ emailTemplate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: emailTemplate }));
      saveSubject.complete();

      // THEN
      expect(emailTemplateFormService.getEmailTemplate).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(emailTemplateService.update).toHaveBeenCalledWith(expect.objectContaining(emailTemplate));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmailTemplate>>();
      const emailTemplate = { id: 123 };
      jest.spyOn(emailTemplateFormService, 'getEmailTemplate').mockReturnValue({ id: null });
      jest.spyOn(emailTemplateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ emailTemplate: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: emailTemplate }));
      saveSubject.complete();

      // THEN
      expect(emailTemplateFormService.getEmailTemplate).toHaveBeenCalled();
      expect(emailTemplateService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmailTemplate>>();
      const emailTemplate = { id: 123 };
      jest.spyOn(emailTemplateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ emailTemplate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(emailTemplateService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
