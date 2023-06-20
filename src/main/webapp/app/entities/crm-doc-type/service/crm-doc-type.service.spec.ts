import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmDocType } from '../crm-doc-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-doc-type.test-samples';

import { CrmDocTypeService } from './crm-doc-type.service';

const requireRestSample: ICrmDocType = {
  ...sampleWithRequiredData,
};

describe('CrmDocType Service', () => {
  let service: CrmDocTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmDocType | ICrmDocType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmDocTypeService);
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

    it('should create a CrmDocType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmDocType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmDocType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmDocType', () => {
      const crmDocType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmDocType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmDocType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmDocType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmDocType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmDocTypeToCollectionIfMissing', () => {
      it('should add a CrmDocType to an empty array', () => {
        const crmDocType: ICrmDocType = sampleWithRequiredData;
        expectedResult = service.addCrmDocTypeToCollectionIfMissing([], crmDocType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmDocType);
      });

      it('should not add a CrmDocType to an array that contains it', () => {
        const crmDocType: ICrmDocType = sampleWithRequiredData;
        const crmDocTypeCollection: ICrmDocType[] = [
          {
            ...crmDocType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmDocTypeToCollectionIfMissing(crmDocTypeCollection, crmDocType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmDocType to an array that doesn't contain it", () => {
        const crmDocType: ICrmDocType = sampleWithRequiredData;
        const crmDocTypeCollection: ICrmDocType[] = [sampleWithPartialData];
        expectedResult = service.addCrmDocTypeToCollectionIfMissing(crmDocTypeCollection, crmDocType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmDocType);
      });

      it('should add only unique CrmDocType to an array', () => {
        const crmDocTypeArray: ICrmDocType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmDocTypeCollection: ICrmDocType[] = [sampleWithRequiredData];
        expectedResult = service.addCrmDocTypeToCollectionIfMissing(crmDocTypeCollection, ...crmDocTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmDocType: ICrmDocType = sampleWithRequiredData;
        const crmDocType2: ICrmDocType = sampleWithPartialData;
        expectedResult = service.addCrmDocTypeToCollectionIfMissing([], crmDocType, crmDocType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmDocType);
        expect(expectedResult).toContain(crmDocType2);
      });

      it('should accept null and undefined values', () => {
        const crmDocType: ICrmDocType = sampleWithRequiredData;
        expectedResult = service.addCrmDocTypeToCollectionIfMissing([], null, crmDocType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmDocType);
      });

      it('should return initial array if no CrmDocType is added', () => {
        const crmDocTypeCollection: ICrmDocType[] = [sampleWithRequiredData];
        expectedResult = service.addCrmDocTypeToCollectionIfMissing(crmDocTypeCollection, undefined, null);
        expect(expectedResult).toEqual(crmDocTypeCollection);
      });
    });

    describe('compareCrmDocType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmDocType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmDocType(entity1, entity2);
        const compareResult2 = service.compareCrmDocType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmDocType(entity1, entity2);
        const compareResult2 = service.compareCrmDocType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmDocType(entity1, entity2);
        const compareResult2 = service.compareCrmDocType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
