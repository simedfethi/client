import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITransactionCRM } from '../transaction-crm.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../transaction-crm.test-samples';

import { TransactionCRMService, RestTransactionCRM } from './transaction-crm.service';

const requireRestSample: RestTransactionCRM = {
  ...sampleWithRequiredData,
  dateFin: sampleWithRequiredData.dateFin?.format(DATE_FORMAT),
  creeLe: sampleWithRequiredData.creeLe?.toJSON(),
  dernierUpdate: sampleWithRequiredData.dernierUpdate?.toJSON(),
};

describe('TransactionCRM Service', () => {
  let service: TransactionCRMService;
  let httpMock: HttpTestingController;
  let expectedResult: ITransactionCRM | ITransactionCRM[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TransactionCRMService);
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

    it('should create a TransactionCRM', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const transactionCRM = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(transactionCRM).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TransactionCRM', () => {
      const transactionCRM = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(transactionCRM).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TransactionCRM', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TransactionCRM', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TransactionCRM', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTransactionCRMToCollectionIfMissing', () => {
      it('should add a TransactionCRM to an empty array', () => {
        const transactionCRM: ITransactionCRM = sampleWithRequiredData;
        expectedResult = service.addTransactionCRMToCollectionIfMissing([], transactionCRM);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transactionCRM);
      });

      it('should not add a TransactionCRM to an array that contains it', () => {
        const transactionCRM: ITransactionCRM = sampleWithRequiredData;
        const transactionCRMCollection: ITransactionCRM[] = [
          {
            ...transactionCRM,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTransactionCRMToCollectionIfMissing(transactionCRMCollection, transactionCRM);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TransactionCRM to an array that doesn't contain it", () => {
        const transactionCRM: ITransactionCRM = sampleWithRequiredData;
        const transactionCRMCollection: ITransactionCRM[] = [sampleWithPartialData];
        expectedResult = service.addTransactionCRMToCollectionIfMissing(transactionCRMCollection, transactionCRM);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transactionCRM);
      });

      it('should add only unique TransactionCRM to an array', () => {
        const transactionCRMArray: ITransactionCRM[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const transactionCRMCollection: ITransactionCRM[] = [sampleWithRequiredData];
        expectedResult = service.addTransactionCRMToCollectionIfMissing(transactionCRMCollection, ...transactionCRMArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const transactionCRM: ITransactionCRM = sampleWithRequiredData;
        const transactionCRM2: ITransactionCRM = sampleWithPartialData;
        expectedResult = service.addTransactionCRMToCollectionIfMissing([], transactionCRM, transactionCRM2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transactionCRM);
        expect(expectedResult).toContain(transactionCRM2);
      });

      it('should accept null and undefined values', () => {
        const transactionCRM: ITransactionCRM = sampleWithRequiredData;
        expectedResult = service.addTransactionCRMToCollectionIfMissing([], null, transactionCRM, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transactionCRM);
      });

      it('should return initial array if no TransactionCRM is added', () => {
        const transactionCRMCollection: ITransactionCRM[] = [sampleWithRequiredData];
        expectedResult = service.addTransactionCRMToCollectionIfMissing(transactionCRMCollection, undefined, null);
        expect(expectedResult).toEqual(transactionCRMCollection);
      });
    });

    describe('compareTransactionCRM', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTransactionCRM(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTransactionCRM(entity1, entity2);
        const compareResult2 = service.compareTransactionCRM(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTransactionCRM(entity1, entity2);
        const compareResult2 = service.compareTransactionCRM(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTransactionCRM(entity1, entity2);
        const compareResult2 = service.compareTransactionCRM(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
