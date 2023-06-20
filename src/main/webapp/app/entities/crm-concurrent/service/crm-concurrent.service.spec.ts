import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmConcurrent } from '../crm-concurrent.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-concurrent.test-samples';

import { CrmConcurrentService, RestCrmConcurrent } from './crm-concurrent.service';

const requireRestSample: RestCrmConcurrent = {
  ...sampleWithRequiredData,
  createdTime: sampleWithRequiredData.createdTime?.toJSON(),
  lastUpdate: sampleWithRequiredData.lastUpdate?.toJSON(),
};

describe('CrmConcurrent Service', () => {
  let service: CrmConcurrentService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmConcurrent | ICrmConcurrent[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmConcurrentService);
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

    it('should create a CrmConcurrent', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmConcurrent = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmConcurrent).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmConcurrent', () => {
      const crmConcurrent = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmConcurrent).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmConcurrent', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmConcurrent', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmConcurrent', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmConcurrentToCollectionIfMissing', () => {
      it('should add a CrmConcurrent to an empty array', () => {
        const crmConcurrent: ICrmConcurrent = sampleWithRequiredData;
        expectedResult = service.addCrmConcurrentToCollectionIfMissing([], crmConcurrent);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmConcurrent);
      });

      it('should not add a CrmConcurrent to an array that contains it', () => {
        const crmConcurrent: ICrmConcurrent = sampleWithRequiredData;
        const crmConcurrentCollection: ICrmConcurrent[] = [
          {
            ...crmConcurrent,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmConcurrentToCollectionIfMissing(crmConcurrentCollection, crmConcurrent);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmConcurrent to an array that doesn't contain it", () => {
        const crmConcurrent: ICrmConcurrent = sampleWithRequiredData;
        const crmConcurrentCollection: ICrmConcurrent[] = [sampleWithPartialData];
        expectedResult = service.addCrmConcurrentToCollectionIfMissing(crmConcurrentCollection, crmConcurrent);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmConcurrent);
      });

      it('should add only unique CrmConcurrent to an array', () => {
        const crmConcurrentArray: ICrmConcurrent[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmConcurrentCollection: ICrmConcurrent[] = [sampleWithRequiredData];
        expectedResult = service.addCrmConcurrentToCollectionIfMissing(crmConcurrentCollection, ...crmConcurrentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmConcurrent: ICrmConcurrent = sampleWithRequiredData;
        const crmConcurrent2: ICrmConcurrent = sampleWithPartialData;
        expectedResult = service.addCrmConcurrentToCollectionIfMissing([], crmConcurrent, crmConcurrent2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmConcurrent);
        expect(expectedResult).toContain(crmConcurrent2);
      });

      it('should accept null and undefined values', () => {
        const crmConcurrent: ICrmConcurrent = sampleWithRequiredData;
        expectedResult = service.addCrmConcurrentToCollectionIfMissing([], null, crmConcurrent, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmConcurrent);
      });

      it('should return initial array if no CrmConcurrent is added', () => {
        const crmConcurrentCollection: ICrmConcurrent[] = [sampleWithRequiredData];
        expectedResult = service.addCrmConcurrentToCollectionIfMissing(crmConcurrentCollection, undefined, null);
        expect(expectedResult).toEqual(crmConcurrentCollection);
      });
    });

    describe('compareCrmConcurrent', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmConcurrent(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmConcurrent(entity1, entity2);
        const compareResult2 = service.compareCrmConcurrent(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmConcurrent(entity1, entity2);
        const compareResult2 = service.compareCrmConcurrent(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmConcurrent(entity1, entity2);
        const compareResult2 = service.compareCrmConcurrent(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
