import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISupplierOffer } from '../supplier-offer.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../supplier-offer.test-samples';

import { SupplierOfferService } from './supplier-offer.service';

const requireRestSample: ISupplierOffer = {
  ...sampleWithRequiredData,
};

describe('SupplierOffer Service', () => {
  let service: SupplierOfferService;
  let httpMock: HttpTestingController;
  let expectedResult: ISupplierOffer | ISupplierOffer[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SupplierOfferService);
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

    it('should create a SupplierOffer', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplierOffer = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(supplierOffer).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SupplierOffer', () => {
      const supplierOffer = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(supplierOffer).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SupplierOffer', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SupplierOffer', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SupplierOffer', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSupplierOfferToCollectionIfMissing', () => {
      it('should add a SupplierOffer to an empty array', () => {
        const supplierOffer: ISupplierOffer = sampleWithRequiredData;
        expectedResult = service.addSupplierOfferToCollectionIfMissing([], supplierOffer);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(supplierOffer);
      });

      it('should not add a SupplierOffer to an array that contains it', () => {
        const supplierOffer: ISupplierOffer = sampleWithRequiredData;
        const supplierOfferCollection: ISupplierOffer[] = [
          {
            ...supplierOffer,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSupplierOfferToCollectionIfMissing(supplierOfferCollection, supplierOffer);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SupplierOffer to an array that doesn't contain it", () => {
        const supplierOffer: ISupplierOffer = sampleWithRequiredData;
        const supplierOfferCollection: ISupplierOffer[] = [sampleWithPartialData];
        expectedResult = service.addSupplierOfferToCollectionIfMissing(supplierOfferCollection, supplierOffer);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(supplierOffer);
      });

      it('should add only unique SupplierOffer to an array', () => {
        const supplierOfferArray: ISupplierOffer[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const supplierOfferCollection: ISupplierOffer[] = [sampleWithRequiredData];
        expectedResult = service.addSupplierOfferToCollectionIfMissing(supplierOfferCollection, ...supplierOfferArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const supplierOffer: ISupplierOffer = sampleWithRequiredData;
        const supplierOffer2: ISupplierOffer = sampleWithPartialData;
        expectedResult = service.addSupplierOfferToCollectionIfMissing([], supplierOffer, supplierOffer2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(supplierOffer);
        expect(expectedResult).toContain(supplierOffer2);
      });

      it('should accept null and undefined values', () => {
        const supplierOffer: ISupplierOffer = sampleWithRequiredData;
        expectedResult = service.addSupplierOfferToCollectionIfMissing([], null, supplierOffer, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(supplierOffer);
      });

      it('should return initial array if no SupplierOffer is added', () => {
        const supplierOfferCollection: ISupplierOffer[] = [sampleWithRequiredData];
        expectedResult = service.addSupplierOfferToCollectionIfMissing(supplierOfferCollection, undefined, null);
        expect(expectedResult).toEqual(supplierOfferCollection);
      });
    });

    describe('compareSupplierOffer', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSupplierOffer(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSupplierOffer(entity1, entity2);
        const compareResult2 = service.compareSupplierOffer(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSupplierOffer(entity1, entity2);
        const compareResult2 = service.compareSupplierOffer(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSupplierOffer(entity1, entity2);
        const compareResult2 = service.compareSupplierOffer(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
