import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmUserSetting } from '../crm-user-setting.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-user-setting.test-samples';

import { CrmUserSettingService } from './crm-user-setting.service';

const requireRestSample: ICrmUserSetting = {
  ...sampleWithRequiredData,
};

describe('CrmUserSetting Service', () => {
  let service: CrmUserSettingService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmUserSetting | ICrmUserSetting[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmUserSettingService);
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

    it('should create a CrmUserSetting', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmUserSetting = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmUserSetting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmUserSetting', () => {
      const crmUserSetting = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmUserSetting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmUserSetting', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmUserSetting', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmUserSetting', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmUserSettingToCollectionIfMissing', () => {
      it('should add a CrmUserSetting to an empty array', () => {
        const crmUserSetting: ICrmUserSetting = sampleWithRequiredData;
        expectedResult = service.addCrmUserSettingToCollectionIfMissing([], crmUserSetting);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmUserSetting);
      });

      it('should not add a CrmUserSetting to an array that contains it', () => {
        const crmUserSetting: ICrmUserSetting = sampleWithRequiredData;
        const crmUserSettingCollection: ICrmUserSetting[] = [
          {
            ...crmUserSetting,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmUserSettingToCollectionIfMissing(crmUserSettingCollection, crmUserSetting);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmUserSetting to an array that doesn't contain it", () => {
        const crmUserSetting: ICrmUserSetting = sampleWithRequiredData;
        const crmUserSettingCollection: ICrmUserSetting[] = [sampleWithPartialData];
        expectedResult = service.addCrmUserSettingToCollectionIfMissing(crmUserSettingCollection, crmUserSetting);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmUserSetting);
      });

      it('should add only unique CrmUserSetting to an array', () => {
        const crmUserSettingArray: ICrmUserSetting[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmUserSettingCollection: ICrmUserSetting[] = [sampleWithRequiredData];
        expectedResult = service.addCrmUserSettingToCollectionIfMissing(crmUserSettingCollection, ...crmUserSettingArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmUserSetting: ICrmUserSetting = sampleWithRequiredData;
        const crmUserSetting2: ICrmUserSetting = sampleWithPartialData;
        expectedResult = service.addCrmUserSettingToCollectionIfMissing([], crmUserSetting, crmUserSetting2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmUserSetting);
        expect(expectedResult).toContain(crmUserSetting2);
      });

      it('should accept null and undefined values', () => {
        const crmUserSetting: ICrmUserSetting = sampleWithRequiredData;
        expectedResult = service.addCrmUserSettingToCollectionIfMissing([], null, crmUserSetting, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmUserSetting);
      });

      it('should return initial array if no CrmUserSetting is added', () => {
        const crmUserSettingCollection: ICrmUserSetting[] = [sampleWithRequiredData];
        expectedResult = service.addCrmUserSettingToCollectionIfMissing(crmUserSettingCollection, undefined, null);
        expect(expectedResult).toEqual(crmUserSettingCollection);
      });
    });

    describe('compareCrmUserSetting', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmUserSetting(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmUserSetting(entity1, entity2);
        const compareResult2 = service.compareCrmUserSetting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmUserSetting(entity1, entity2);
        const compareResult2 = service.compareCrmUserSetting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmUserSetting(entity1, entity2);
        const compareResult2 = service.compareCrmUserSetting(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
