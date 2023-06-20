import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMarkStHistory } from '../mark-st-history.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../mark-st-history.test-samples';

import { MarkStHistoryService, RestMarkStHistory } from './mark-st-history.service';

const requireRestSample: RestMarkStHistory = {
  ...sampleWithRequiredData,
  startTime: sampleWithRequiredData.startTime?.toJSON(),
  endTime: sampleWithRequiredData.endTime?.toJSON(),
};

describe('MarkStHistory Service', () => {
  let service: MarkStHistoryService;
  let httpMock: HttpTestingController;
  let expectedResult: IMarkStHistory | IMarkStHistory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MarkStHistoryService);
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

    it('should create a MarkStHistory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const markStHistory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(markStHistory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MarkStHistory', () => {
      const markStHistory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(markStHistory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MarkStHistory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MarkStHistory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MarkStHistory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMarkStHistoryToCollectionIfMissing', () => {
      it('should add a MarkStHistory to an empty array', () => {
        const markStHistory: IMarkStHistory = sampleWithRequiredData;
        expectedResult = service.addMarkStHistoryToCollectionIfMissing([], markStHistory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(markStHistory);
      });

      it('should not add a MarkStHistory to an array that contains it', () => {
        const markStHistory: IMarkStHistory = sampleWithRequiredData;
        const markStHistoryCollection: IMarkStHistory[] = [
          {
            ...markStHistory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMarkStHistoryToCollectionIfMissing(markStHistoryCollection, markStHistory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MarkStHistory to an array that doesn't contain it", () => {
        const markStHistory: IMarkStHistory = sampleWithRequiredData;
        const markStHistoryCollection: IMarkStHistory[] = [sampleWithPartialData];
        expectedResult = service.addMarkStHistoryToCollectionIfMissing(markStHistoryCollection, markStHistory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(markStHistory);
      });

      it('should add only unique MarkStHistory to an array', () => {
        const markStHistoryArray: IMarkStHistory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const markStHistoryCollection: IMarkStHistory[] = [sampleWithRequiredData];
        expectedResult = service.addMarkStHistoryToCollectionIfMissing(markStHistoryCollection, ...markStHistoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const markStHistory: IMarkStHistory = sampleWithRequiredData;
        const markStHistory2: IMarkStHistory = sampleWithPartialData;
        expectedResult = service.addMarkStHistoryToCollectionIfMissing([], markStHistory, markStHistory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(markStHistory);
        expect(expectedResult).toContain(markStHistory2);
      });

      it('should accept null and undefined values', () => {
        const markStHistory: IMarkStHistory = sampleWithRequiredData;
        expectedResult = service.addMarkStHistoryToCollectionIfMissing([], null, markStHistory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(markStHistory);
      });

      it('should return initial array if no MarkStHistory is added', () => {
        const markStHistoryCollection: IMarkStHistory[] = [sampleWithRequiredData];
        expectedResult = service.addMarkStHistoryToCollectionIfMissing(markStHistoryCollection, undefined, null);
        expect(expectedResult).toEqual(markStHistoryCollection);
      });
    });

    describe('compareMarkStHistory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMarkStHistory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMarkStHistory(entity1, entity2);
        const compareResult2 = service.compareMarkStHistory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMarkStHistory(entity1, entity2);
        const compareResult2 = service.compareMarkStHistory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMarkStHistory(entity1, entity2);
        const compareResult2 = service.compareMarkStHistory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
