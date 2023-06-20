import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../email-template.test-samples';

import { EmailTemplateFormService } from './email-template-form.service';

describe('EmailTemplate Form Service', () => {
  let service: EmailTemplateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailTemplateFormService);
  });

  describe('Service methods', () => {
    describe('createEmailTemplateFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmailTemplateFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            templateName: expect.any(Object),
            emailSubject: expect.any(Object),
            templateContent: expect.any(Object),
            tempType: expect.any(Object),
            htmlContent: expect.any(Object),
            useCount: expect.any(Object),
            createdAt: expect.any(Object),
            attachments: expect.any(Object),
          })
        );
      });

      it('passing IEmailTemplate should create a new form with FormGroup', () => {
        const formGroup = service.createEmailTemplateFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            templateName: expect.any(Object),
            emailSubject: expect.any(Object),
            templateContent: expect.any(Object),
            tempType: expect.any(Object),
            htmlContent: expect.any(Object),
            useCount: expect.any(Object),
            createdAt: expect.any(Object),
            attachments: expect.any(Object),
          })
        );
      });
    });

    describe('getEmailTemplate', () => {
      it('should return NewEmailTemplate for default EmailTemplate initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEmailTemplateFormGroup(sampleWithNewData);

        const emailTemplate = service.getEmailTemplate(formGroup) as any;

        expect(emailTemplate).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmailTemplate for empty EmailTemplate initial value', () => {
        const formGroup = service.createEmailTemplateFormGroup();

        const emailTemplate = service.getEmailTemplate(formGroup) as any;

        expect(emailTemplate).toMatchObject({});
      });

      it('should return IEmailTemplate', () => {
        const formGroup = service.createEmailTemplateFormGroup(sampleWithRequiredData);

        const emailTemplate = service.getEmailTemplate(formGroup) as any;

        expect(emailTemplate).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEmailTemplate should not enable id FormControl', () => {
        const formGroup = service.createEmailTemplateFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEmailTemplate should disable id FormControl', () => {
        const formGroup = service.createEmailTemplateFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
