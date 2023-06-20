import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDeliveryTerm } from '../delivery-term.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../delivery-term.test-samples';

import { DeliveryTermService } from './delivery-term.service';

const requireRestSample: IDeliveryTerm = {
  ...sampleWithRequiredData,
};

describe('DeliveryTerm Service', () => {
  let service: DeliveryTermService;
  let httpMock: HttpTestingController;
  let expectedResult: IDeliveryTerm | IDeliveryTerm[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DeliveryTermService);
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

    it('should create a DeliveryTerm', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deliveryTerm = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(deliveryTerm).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DeliveryTerm', () => {
      const deliveryTerm = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(deliveryTerm).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DeliveryTerm', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DeliveryTerm', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DeliveryTerm', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDeliveryTermToCollectionIfMissing', () => {
      it('should add a DeliveryTerm to an empty array', () => {
        const deliveryTerm: IDeliveryTerm = sampleWithRequiredData;
        expectedResult = service.addDeliveryTermToCollectionIfMissing([], deliveryTerm);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryTerm);
      });

      it('should not add a DeliveryTerm to an array that contains it', () => {
        const deliveryTerm: IDeliveryTerm = sampleWithRequiredData;
        const deliveryTermCollection: IDeliveryTerm[] = [
          {
            ...deliveryTerm,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDeliveryTermToCollectionIfMissing(deliveryTermCollection, deliveryTerm);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DeliveryTerm to an array that doesn't contain it", () => {
        const deliveryTerm: IDeliveryTerm = sampleWithRequiredData;
        const deliveryTermCollection: IDeliveryTerm[] = [sampleWithPartialData];
        expectedResult = service.addDeliveryTermToCollectionIfMissing(deliveryTermCollection, deliveryTerm);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryTerm);
      });

      it('should add only unique DeliveryTerm to an array', () => {
        const deliveryTermArray: IDeliveryTerm[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const deliveryTermCollection: IDeliveryTerm[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryTermToCollectionIfMissing(deliveryTermCollection, ...deliveryTermArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const deliveryTerm: IDeliveryTerm = sampleWithRequiredData;
        const deliveryTerm2: IDeliveryTerm = sampleWithPartialData;
        expectedResult = service.addDeliveryTermToCollectionIfMissing([], deliveryTerm, deliveryTerm2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryTerm);
        expect(expectedResult).toContain(deliveryTerm2);
      });

      it('should accept null and undefined values', () => {
        const deliveryTerm: IDeliveryTerm = sampleWithRequiredData;
        expectedResult = service.addDeliveryTermToCollectionIfMissing([], null, deliveryTerm, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryTerm);
      });

      it('should return initial array if no DeliveryTerm is added', () => {
        const deliveryTermCollection: IDeliveryTerm[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryTermToCollectionIfMissing(deliveryTermCollection, undefined, null);
        expect(expectedResult).toEqual(deliveryTermCollection);
      });
    });

    describe('compareDeliveryTerm', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDeliveryTerm(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDeliveryTerm(entity1, entity2);
        const compareResult2 = service.compareDeliveryTerm(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDeliveryTerm(entity1, entity2);
        const compareResult2 = service.compareDeliveryTerm(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDeliveryTerm(entity1, entity2);
        const compareResult2 = service.compareDeliveryTerm(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
