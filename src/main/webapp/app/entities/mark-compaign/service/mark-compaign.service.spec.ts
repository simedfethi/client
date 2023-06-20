import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMarkCompaign } from '../mark-compaign.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../mark-compaign.test-samples';

import { MarkCompaignService, RestMarkCompaign } from './mark-compaign.service';

const requireRestSample: RestMarkCompaign = {
  ...sampleWithRequiredData,
  sendTime: sampleWithRequiredData.sendTime?.toJSON(),
  createdAt: sampleWithRequiredData.createdAt?.toJSON(),
  endAt: sampleWithRequiredData.endAt?.toJSON(),
};

describe('MarkCompaign Service', () => {
  let service: MarkCompaignService;
  let httpMock: HttpTestingController;
  let expectedResult: IMarkCompaign | IMarkCompaign[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MarkCompaignService);
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

    it('should create a MarkCompaign', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const markCompaign = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(markCompaign).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MarkCompaign', () => {
      const markCompaign = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(markCompaign).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MarkCompaign', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MarkCompaign', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MarkCompaign', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMarkCompaignToCollectionIfMissing', () => {
      it('should add a MarkCompaign to an empty array', () => {
        const markCompaign: IMarkCompaign = sampleWithRequiredData;
        expectedResult = service.addMarkCompaignToCollectionIfMissing([], markCompaign);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(markCompaign);
      });

      it('should not add a MarkCompaign to an array that contains it', () => {
        const markCompaign: IMarkCompaign = sampleWithRequiredData;
        const markCompaignCollection: IMarkCompaign[] = [
          {
            ...markCompaign,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMarkCompaignToCollectionIfMissing(markCompaignCollection, markCompaign);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MarkCompaign to an array that doesn't contain it", () => {
        const markCompaign: IMarkCompaign = sampleWithRequiredData;
        const markCompaignCollection: IMarkCompaign[] = [sampleWithPartialData];
        expectedResult = service.addMarkCompaignToCollectionIfMissing(markCompaignCollection, markCompaign);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(markCompaign);
      });

      it('should add only unique MarkCompaign to an array', () => {
        const markCompaignArray: IMarkCompaign[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const markCompaignCollection: IMarkCompaign[] = [sampleWithRequiredData];
        expectedResult = service.addMarkCompaignToCollectionIfMissing(markCompaignCollection, ...markCompaignArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const markCompaign: IMarkCompaign = sampleWithRequiredData;
        const markCompaign2: IMarkCompaign = sampleWithPartialData;
        expectedResult = service.addMarkCompaignToCollectionIfMissing([], markCompaign, markCompaign2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(markCompaign);
        expect(expectedResult).toContain(markCompaign2);
      });

      it('should accept null and undefined values', () => {
        const markCompaign: IMarkCompaign = sampleWithRequiredData;
        expectedResult = service.addMarkCompaignToCollectionIfMissing([], null, markCompaign, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(markCompaign);
      });

      it('should return initial array if no MarkCompaign is added', () => {
        const markCompaignCollection: IMarkCompaign[] = [sampleWithRequiredData];
        expectedResult = service.addMarkCompaignToCollectionIfMissing(markCompaignCollection, undefined, null);
        expect(expectedResult).toEqual(markCompaignCollection);
      });
    });

    describe('compareMarkCompaign', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMarkCompaign(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMarkCompaign(entity1, entity2);
        const compareResult2 = service.compareMarkCompaign(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMarkCompaign(entity1, entity2);
        const compareResult2 = service.compareMarkCompaign(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMarkCompaign(entity1, entity2);
        const compareResult2 = service.compareMarkCompaign(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
