import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITransactionEtape } from '../transaction-etape.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../transaction-etape.test-samples';

import { TransactionEtapeService } from './transaction-etape.service';

const requireRestSample: ITransactionEtape = {
  ...sampleWithRequiredData,
};

describe('TransactionEtape Service', () => {
  let service: TransactionEtapeService;
  let httpMock: HttpTestingController;
  let expectedResult: ITransactionEtape | ITransactionEtape[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TransactionEtapeService);
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

    it('should create a TransactionEtape', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const transactionEtape = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(transactionEtape).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TransactionEtape', () => {
      const transactionEtape = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(transactionEtape).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TransactionEtape', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TransactionEtape', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TransactionEtape', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTransactionEtapeToCollectionIfMissing', () => {
      it('should add a TransactionEtape to an empty array', () => {
        const transactionEtape: ITransactionEtape = sampleWithRequiredData;
        expectedResult = service.addTransactionEtapeToCollectionIfMissing([], transactionEtape);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transactionEtape);
      });

      it('should not add a TransactionEtape to an array that contains it', () => {
        const transactionEtape: ITransactionEtape = sampleWithRequiredData;
        const transactionEtapeCollection: ITransactionEtape[] = [
          {
            ...transactionEtape,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTransactionEtapeToCollectionIfMissing(transactionEtapeCollection, transactionEtape);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TransactionEtape to an array that doesn't contain it", () => {
        const transactionEtape: ITransactionEtape = sampleWithRequiredData;
        const transactionEtapeCollection: ITransactionEtape[] = [sampleWithPartialData];
        expectedResult = service.addTransactionEtapeToCollectionIfMissing(transactionEtapeCollection, transactionEtape);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transactionEtape);
      });

      it('should add only unique TransactionEtape to an array', () => {
        const transactionEtapeArray: ITransactionEtape[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const transactionEtapeCollection: ITransactionEtape[] = [sampleWithRequiredData];
        expectedResult = service.addTransactionEtapeToCollectionIfMissing(transactionEtapeCollection, ...transactionEtapeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const transactionEtape: ITransactionEtape = sampleWithRequiredData;
        const transactionEtape2: ITransactionEtape = sampleWithPartialData;
        expectedResult = service.addTransactionEtapeToCollectionIfMissing([], transactionEtape, transactionEtape2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transactionEtape);
        expect(expectedResult).toContain(transactionEtape2);
      });

      it('should accept null and undefined values', () => {
        const transactionEtape: ITransactionEtape = sampleWithRequiredData;
        expectedResult = service.addTransactionEtapeToCollectionIfMissing([], null, transactionEtape, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transactionEtape);
      });

      it('should return initial array if no TransactionEtape is added', () => {
        const transactionEtapeCollection: ITransactionEtape[] = [sampleWithRequiredData];
        expectedResult = service.addTransactionEtapeToCollectionIfMissing(transactionEtapeCollection, undefined, null);
        expect(expectedResult).toEqual(transactionEtapeCollection);
      });
    });

    describe('compareTransactionEtape', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTransactionEtape(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTransactionEtape(entity1, entity2);
        const compareResult2 = service.compareTransactionEtape(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTransactionEtape(entity1, entity2);
        const compareResult2 = service.compareTransactionEtape(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTransactionEtape(entity1, entity2);
        const compareResult2 = service.compareTransactionEtape(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
