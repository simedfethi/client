import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmDaira } from '../crm-daira.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-daira.test-samples';

import { CrmDairaService } from './crm-daira.service';

const requireRestSample: ICrmDaira = {
  ...sampleWithRequiredData,
};

describe('CrmDaira Service', () => {
  let service: CrmDairaService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmDaira | ICrmDaira[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmDairaService);
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

    it('should create a CrmDaira', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmDaira = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmDaira).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmDaira', () => {
      const crmDaira = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmDaira).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmDaira', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmDaira', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmDaira', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmDairaToCollectionIfMissing', () => {
      it('should add a CrmDaira to an empty array', () => {
        const crmDaira: ICrmDaira = sampleWithRequiredData;
        expectedResult = service.addCrmDairaToCollectionIfMissing([], crmDaira);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmDaira);
      });

      it('should not add a CrmDaira to an array that contains it', () => {
        const crmDaira: ICrmDaira = sampleWithRequiredData;
        const crmDairaCollection: ICrmDaira[] = [
          {
            ...crmDaira,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmDairaToCollectionIfMissing(crmDairaCollection, crmDaira);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmDaira to an array that doesn't contain it", () => {
        const crmDaira: ICrmDaira = sampleWithRequiredData;
        const crmDairaCollection: ICrmDaira[] = [sampleWithPartialData];
        expectedResult = service.addCrmDairaToCollectionIfMissing(crmDairaCollection, crmDaira);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmDaira);
      });

      it('should add only unique CrmDaira to an array', () => {
        const crmDairaArray: ICrmDaira[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmDairaCollection: ICrmDaira[] = [sampleWithRequiredData];
        expectedResult = service.addCrmDairaToCollectionIfMissing(crmDairaCollection, ...crmDairaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmDaira: ICrmDaira = sampleWithRequiredData;
        const crmDaira2: ICrmDaira = sampleWithPartialData;
        expectedResult = service.addCrmDairaToCollectionIfMissing([], crmDaira, crmDaira2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmDaira);
        expect(expectedResult).toContain(crmDaira2);
      });

      it('should accept null and undefined values', () => {
        const crmDaira: ICrmDaira = sampleWithRequiredData;
        expectedResult = service.addCrmDairaToCollectionIfMissing([], null, crmDaira, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmDaira);
      });

      it('should return initial array if no CrmDaira is added', () => {
        const crmDairaCollection: ICrmDaira[] = [sampleWithRequiredData];
        expectedResult = service.addCrmDairaToCollectionIfMissing(crmDairaCollection, undefined, null);
        expect(expectedResult).toEqual(crmDairaCollection);
      });
    });

    describe('compareCrmDaira', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmDaira(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmDaira(entity1, entity2);
        const compareResult2 = service.compareCrmDaira(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmDaira(entity1, entity2);
        const compareResult2 = service.compareCrmDaira(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmDaira(entity1, entity2);
        const compareResult2 = service.compareCrmDaira(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
