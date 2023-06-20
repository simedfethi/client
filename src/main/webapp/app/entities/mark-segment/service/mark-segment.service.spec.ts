import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMarkSegment } from '../mark-segment.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../mark-segment.test-samples';

import { MarkSegmentService, RestMarkSegment } from './mark-segment.service';

const requireRestSample: RestMarkSegment = {
  ...sampleWithRequiredData,
  createdAt: sampleWithRequiredData.createdAt?.toJSON(),
};

describe('MarkSegment Service', () => {
  let service: MarkSegmentService;
  let httpMock: HttpTestingController;
  let expectedResult: IMarkSegment | IMarkSegment[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MarkSegmentService);
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

    it('should create a MarkSegment', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const markSegment = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(markSegment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MarkSegment', () => {
      const markSegment = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(markSegment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MarkSegment', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MarkSegment', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MarkSegment', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMarkSegmentToCollectionIfMissing', () => {
      it('should add a MarkSegment to an empty array', () => {
        const markSegment: IMarkSegment = sampleWithRequiredData;
        expectedResult = service.addMarkSegmentToCollectionIfMissing([], markSegment);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(markSegment);
      });

      it('should not add a MarkSegment to an array that contains it', () => {
        const markSegment: IMarkSegment = sampleWithRequiredData;
        const markSegmentCollection: IMarkSegment[] = [
          {
            ...markSegment,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMarkSegmentToCollectionIfMissing(markSegmentCollection, markSegment);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MarkSegment to an array that doesn't contain it", () => {
        const markSegment: IMarkSegment = sampleWithRequiredData;
        const markSegmentCollection: IMarkSegment[] = [sampleWithPartialData];
        expectedResult = service.addMarkSegmentToCollectionIfMissing(markSegmentCollection, markSegment);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(markSegment);
      });

      it('should add only unique MarkSegment to an array', () => {
        const markSegmentArray: IMarkSegment[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const markSegmentCollection: IMarkSegment[] = [sampleWithRequiredData];
        expectedResult = service.addMarkSegmentToCollectionIfMissing(markSegmentCollection, ...markSegmentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const markSegment: IMarkSegment = sampleWithRequiredData;
        const markSegment2: IMarkSegment = sampleWithPartialData;
        expectedResult = service.addMarkSegmentToCollectionIfMissing([], markSegment, markSegment2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(markSegment);
        expect(expectedResult).toContain(markSegment2);
      });

      it('should accept null and undefined values', () => {
        const markSegment: IMarkSegment = sampleWithRequiredData;
        expectedResult = service.addMarkSegmentToCollectionIfMissing([], null, markSegment, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(markSegment);
      });

      it('should return initial array if no MarkSegment is added', () => {
        const markSegmentCollection: IMarkSegment[] = [sampleWithRequiredData];
        expectedResult = service.addMarkSegmentToCollectionIfMissing(markSegmentCollection, undefined, null);
        expect(expectedResult).toEqual(markSegmentCollection);
      });
    });

    describe('compareMarkSegment', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMarkSegment(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMarkSegment(entity1, entity2);
        const compareResult2 = service.compareMarkSegment(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMarkSegment(entity1, entity2);
        const compareResult2 = service.compareMarkSegment(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMarkSegment(entity1, entity2);
        const compareResult2 = service.compareMarkSegment(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
