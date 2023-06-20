import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmRole } from '../crm-role.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-role.test-samples';

import { CrmRoleService } from './crm-role.service';

const requireRestSample: ICrmRole = {
  ...sampleWithRequiredData,
};

describe('CrmRole Service', () => {
  let service: CrmRoleService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmRole | ICrmRole[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmRoleService);
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

    it('should create a CrmRole', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmRole = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmRole).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmRole', () => {
      const crmRole = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmRole).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmRole', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmRole', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmRole', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmRoleToCollectionIfMissing', () => {
      it('should add a CrmRole to an empty array', () => {
        const crmRole: ICrmRole = sampleWithRequiredData;
        expectedResult = service.addCrmRoleToCollectionIfMissing([], crmRole);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmRole);
      });

      it('should not add a CrmRole to an array that contains it', () => {
        const crmRole: ICrmRole = sampleWithRequiredData;
        const crmRoleCollection: ICrmRole[] = [
          {
            ...crmRole,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmRoleToCollectionIfMissing(crmRoleCollection, crmRole);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmRole to an array that doesn't contain it", () => {
        const crmRole: ICrmRole = sampleWithRequiredData;
        const crmRoleCollection: ICrmRole[] = [sampleWithPartialData];
        expectedResult = service.addCrmRoleToCollectionIfMissing(crmRoleCollection, crmRole);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmRole);
      });

      it('should add only unique CrmRole to an array', () => {
        const crmRoleArray: ICrmRole[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmRoleCollection: ICrmRole[] = [sampleWithRequiredData];
        expectedResult = service.addCrmRoleToCollectionIfMissing(crmRoleCollection, ...crmRoleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmRole: ICrmRole = sampleWithRequiredData;
        const crmRole2: ICrmRole = sampleWithPartialData;
        expectedResult = service.addCrmRoleToCollectionIfMissing([], crmRole, crmRole2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmRole);
        expect(expectedResult).toContain(crmRole2);
      });

      it('should accept null and undefined values', () => {
        const crmRole: ICrmRole = sampleWithRequiredData;
        expectedResult = service.addCrmRoleToCollectionIfMissing([], null, crmRole, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmRole);
      });

      it('should return initial array if no CrmRole is added', () => {
        const crmRoleCollection: ICrmRole[] = [sampleWithRequiredData];
        expectedResult = service.addCrmRoleToCollectionIfMissing(crmRoleCollection, undefined, null);
        expect(expectedResult).toEqual(crmRoleCollection);
      });
    });

    describe('compareCrmRole', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmRole(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmRole(entity1, entity2);
        const compareResult2 = service.compareCrmRole(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmRole(entity1, entity2);
        const compareResult2 = service.compareCrmRole(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmRole(entity1, entity2);
        const compareResult2 = service.compareCrmRole(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
