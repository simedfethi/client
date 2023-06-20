import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../crm-c-ontact-source.test-samples';

import { CrmCOntactSourceFormService } from './crm-c-ontact-source-form.service';

describe('CrmCOntactSource Form Service', () => {
  let service: CrmCOntactSourceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrmCOntactSourceFormService);
  });

  describe('Service methods', () => {
    describe('createCrmCOntactSourceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCrmCOntactSourceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactSource: expect.any(Object),
          })
        );
      });

      it('passing ICrmCOntactSource should create a new form with FormGroup', () => {
        const formGroup = service.createCrmCOntactSourceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactSource: expect.any(Object),
          })
        );
      });
    });

    describe('getCrmCOntactSource', () => {
      it('should return NewCrmCOntactSource for default CrmCOntactSource initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCrmCOntactSourceFormGroup(sampleWithNewData);

        const crmCOntactSource = service.getCrmCOntactSource(formGroup) as any;

        expect(crmCOntactSource).toMatchObject(sampleWithNewData);
      });

      it('should return NewCrmCOntactSource for empty CrmCOntactSource initial value', () => {
        const formGroup = service.createCrmCOntactSourceFormGroup();

        const crmCOntactSource = service.getCrmCOntactSource(formGroup) as any;

        expect(crmCOntactSource).toMatchObject({});
      });

      it('should return ICrmCOntactSource', () => {
        const formGroup = service.createCrmCOntactSourceFormGroup(sampleWithRequiredData);

        const crmCOntactSource = service.getCrmCOntactSource(formGroup) as any;

        expect(crmCOntactSource).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICrmCOntactSource should not enable id FormControl', () => {
        const formGroup = service.createCrmCOntactSourceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCrmCOntactSource should disable id FormControl', () => {
        const formGroup = service.createCrmCOntactSourceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
