import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICustomerCategory } from '../customer-category.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../customer-category.test-samples';

import { CustomerCategoryService } from './customer-category.service';

const requireRestSample: ICustomerCategory = {
  ...sampleWithRequiredData,
};

describe('CustomerCategory Service', () => {
  let service: CustomerCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: ICustomerCategory | ICustomerCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CustomerCategoryService);
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

    it('should create a CustomerCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customerCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(customerCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CustomerCategory', () => {
      const customerCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(customerCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CustomerCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CustomerCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CustomerCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCustomerCategoryToCollectionIfMissing', () => {
      it('should add a CustomerCategory to an empty array', () => {
        const customerCategory: ICustomerCategory = sampleWithRequiredData;
        expectedResult = service.addCustomerCategoryToCollectionIfMissing([], customerCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customerCategory);
      });

      it('should not add a CustomerCategory to an array that contains it', () => {
        const customerCategory: ICustomerCategory = sampleWithRequiredData;
        const customerCategoryCollection: ICustomerCategory[] = [
          {
            ...customerCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCustomerCategoryToCollectionIfMissing(customerCategoryCollection, customerCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CustomerCategory to an array that doesn't contain it", () => {
        const customerCategory: ICustomerCategory = sampleWithRequiredData;
        const customerCategoryCollection: ICustomerCategory[] = [sampleWithPartialData];
        expectedResult = service.addCustomerCategoryToCollectionIfMissing(customerCategoryCollection, customerCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customerCategory);
      });

      it('should add only unique CustomerCategory to an array', () => {
        const customerCategoryArray: ICustomerCategory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const customerCategoryCollection: ICustomerCategory[] = [sampleWithRequiredData];
        expectedResult = service.addCustomerCategoryToCollectionIfMissing(customerCategoryCollection, ...customerCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const customerCategory: ICustomerCategory = sampleWithRequiredData;
        const customerCategory2: ICustomerCategory = sampleWithPartialData;
        expectedResult = service.addCustomerCategoryToCollectionIfMissing([], customerCategory, customerCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customerCategory);
        expect(expectedResult).toContain(customerCategory2);
      });

      it('should accept null and undefined values', () => {
        const customerCategory: ICustomerCategory = sampleWithRequiredData;
        expectedResult = service.addCustomerCategoryToCollectionIfMissing([], null, customerCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customerCategory);
      });

      it('should return initial array if no CustomerCategory is added', () => {
        const customerCategoryCollection: ICustomerCategory[] = [sampleWithRequiredData];
        expectedResult = service.addCustomerCategoryToCollectionIfMissing(customerCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(customerCategoryCollection);
      });
    });

    describe('compareCustomerCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCustomerCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCustomerCategory(entity1, entity2);
        const compareResult2 = service.compareCustomerCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCustomerCategory(entity1, entity2);
        const compareResult2 = service.compareCustomerCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCustomerCategory(entity1, entity2);
        const compareResult2 = service.compareCustomerCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
