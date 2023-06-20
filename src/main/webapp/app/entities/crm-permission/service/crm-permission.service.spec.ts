import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmPermission } from '../crm-permission.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-permission.test-samples';

import { CrmPermissionService } from './crm-permission.service';

const requireRestSample: ICrmPermission = {
  ...sampleWithRequiredData,
};

describe('CrmPermission Service', () => {
  let service: CrmPermissionService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmPermission | ICrmPermission[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmPermissionService);
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

    it('should create a CrmPermission', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmPermission = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmPermission).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmPermission', () => {
      const crmPermission = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmPermission).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmPermission', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmPermission', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmPermission', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmPermissionToCollectionIfMissing', () => {
      it('should add a CrmPermission to an empty array', () => {
        const crmPermission: ICrmPermission = sampleWithRequiredData;
        expectedResult = service.addCrmPermissionToCollectionIfMissing([], crmPermission);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmPermission);
      });

      it('should not add a CrmPermission to an array that contains it', () => {
        const crmPermission: ICrmPermission = sampleWithRequiredData;
        const crmPermissionCollection: ICrmPermission[] = [
          {
            ...crmPermission,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmPermissionToCollectionIfMissing(crmPermissionCollection, crmPermission);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmPermission to an array that doesn't contain it", () => {
        const crmPermission: ICrmPermission = sampleWithRequiredData;
        const crmPermissionCollection: ICrmPermission[] = [sampleWithPartialData];
        expectedResult = service.addCrmPermissionToCollectionIfMissing(crmPermissionCollection, crmPermission);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmPermission);
      });

      it('should add only unique CrmPermission to an array', () => {
        const crmPermissionArray: ICrmPermission[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmPermissionCollection: ICrmPermission[] = [sampleWithRequiredData];
        expectedResult = service.addCrmPermissionToCollectionIfMissing(crmPermissionCollection, ...crmPermissionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmPermission: ICrmPermission = sampleWithRequiredData;
        const crmPermission2: ICrmPermission = sampleWithPartialData;
        expectedResult = service.addCrmPermissionToCollectionIfMissing([], crmPermission, crmPermission2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmPermission);
        expect(expectedResult).toContain(crmPermission2);
      });

      it('should accept null and undefined values', () => {
        const crmPermission: ICrmPermission = sampleWithRequiredData;
        expectedResult = service.addCrmPermissionToCollectionIfMissing([], null, crmPermission, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmPermission);
      });

      it('should return initial array if no CrmPermission is added', () => {
        const crmPermissionCollection: ICrmPermission[] = [sampleWithRequiredData];
        expectedResult = service.addCrmPermissionToCollectionIfMissing(crmPermissionCollection, undefined, null);
        expect(expectedResult).toEqual(crmPermissionCollection);
      });
    });

    describe('compareCrmPermission', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmPermission(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmPermission(entity1, entity2);
        const compareResult2 = service.compareCrmPermission(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmPermission(entity1, entity2);
        const compareResult2 = service.compareCrmPermission(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmPermission(entity1, entity2);
        const compareResult2 = service.compareCrmPermission(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
