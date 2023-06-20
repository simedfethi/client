import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmSetting } from '../crm-setting.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-setting.test-samples';

import { CrmSettingService } from './crm-setting.service';

const requireRestSample: ICrmSetting = {
  ...sampleWithRequiredData,
};

describe('CrmSetting Service', () => {
  let service: CrmSettingService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmSetting | ICrmSetting[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmSettingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a CrmSetting', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmSetting = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmSetting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmSetting', () => {
      const crmSetting = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmSetting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmSetting', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmSetting', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmSetting', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmSettingToCollectionIfMissing', () => {
      it('should add a CrmSetting to an empty array', () => {
        const crmSetting: ICrmSetting = sampleWithRequiredData;
        expectedResult = service.addCrmSettingToCollectionIfMissing([], crmSetting);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmSetting);
      });

      it('should not add a CrmSetting to an array that contains it', () => {
        const crmSetting: ICrmSetting = sampleWithRequiredData;
        const crmSettingCollection: ICrmSetting[] = [
          {
            ...crmSetting,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmSettingToCollectionIfMissing(crmSettingCollection, crmSetting);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmSetting to an array that doesn't contain it", () => {
        const crmSetting: ICrmSetting = sampleWithRequiredData;
        const crmSettingCollection: ICrmSetting[] = [sampleWithPartialData];
        expectedResult = service.addCrmSettingToCollectionIfMissing(crmSettingCollection, crmSetting);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmSetting);
      });

      it('should add only unique CrmSetting to an array', () => {
        const crmSettingArray: ICrmSetting[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmSettingCollection: ICrmSetting[] = [sampleWithRequiredData];
        expectedResult = service.addCrmSettingToCollectionIfMissing(crmSettingCollection, ...crmSettingArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmSetting: ICrmSetting = sampleWithRequiredData;
        const crmSetting2: ICrmSetting = sampleWithPartialData;
        expectedResult = service.addCrmSettingToCollectionIfMissing([], crmSetting, crmSetting2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmSetting);
        expect(expectedResult).toContain(crmSetting2);
      });

      it('should accept null and undefined values', () => {
        const crmSetting: ICrmSetting = sampleWithRequiredData;
        expectedResult = service.addCrmSettingToCollectionIfMissing([], null, crmSetting, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmSetting);
      });

      it('should return initial array if no CrmSetting is added', () => {
        const crmSettingCollection: ICrmSetting[] = [sampleWithRequiredData];
        expectedResult = service.addCrmSettingToCollectionIfMissing(crmSettingCollection, undefined, null);
        expect(expectedResult).toEqual(crmSettingCollection);
      });
    });

    describe('compareCrmSetting', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmSetting(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmSetting(entity1, entity2);
        const compareResult2 = service.compareCrmSetting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmSetting(entity1, entity2);
        const compareResult2 = service.compareCrmSetting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmSetting(entity1, entity2);
        const compareResult2 = service.compareCrmSetting(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
