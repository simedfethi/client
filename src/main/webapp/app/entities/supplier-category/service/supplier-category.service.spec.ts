import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISupplierCategory } from '../supplier-category.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../supplier-category.test-samples';

import { SupplierCategoryService } from './supplier-category.service';

const requireRestSample: ISupplierCategory = {
  ...sampleWithRequiredData,
};

describe('SupplierCategory Service', () => {
  let service: SupplierCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: ISupplierCategory | ISupplierCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SupplierCategoryService);
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

    it('should create a SupplierCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const supplierCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(supplierCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SupplierCategory', () => {
      const supplierCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(supplierCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SupplierCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SupplierCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SupplierCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSupplierCategoryToCollectionIfMissing', () => {
      it('should add a SupplierCategory to an empty array', () => {
        const supplierCategory: ISupplierCategory = sampleWithRequiredData;
        expectedResult = service.addSupplierCategoryToCollectionIfMissing([], supplierCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(supplierCategory);
      });

      it('should not add a SupplierCategory to an array that contains it', () => {
        const supplierCategory: ISupplierCategory = sampleWithRequiredData;
        const supplierCategoryCollection: ISupplierCategory[] = [
          {
            ...supplierCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSupplierCategoryToCollectionIfMissing(supplierCategoryCollection, supplierCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SupplierCategory to an array that doesn't contain it", () => {
        const supplierCategory: ISupplierCategory = sampleWithRequiredData;
        const supplierCategoryCollection: ISupplierCategory[] = [sampleWithPartialData];
        expectedResult = service.addSupplierCategoryToCollectionIfMissing(supplierCategoryCollection, supplierCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(supplierCategory);
      });

      it('should add only unique SupplierCategory to an array', () => {
        const supplierCategoryArray: ISupplierCategory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const supplierCategoryCollection: ISupplierCategory[] = [sampleWithRequiredData];
        expectedResult = service.addSupplierCategoryToCollectionIfMissing(supplierCategoryCollection, ...supplierCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const supplierCategory: ISupplierCategory = sampleWithRequiredData;
        const supplierCategory2: ISupplierCategory = sampleWithPartialData;
        expectedResult = service.addSupplierCategoryToCollectionIfMissing([], supplierCategory, supplierCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(supplierCategory);
        expect(expectedResult).toContain(supplierCategory2);
      });

      it('should accept null and undefined values', () => {
        const supplierCategory: ISupplierCategory = sampleWithRequiredData;
        expectedResult = service.addSupplierCategoryToCollectionIfMissing([], null, supplierCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(supplierCategory);
      });

      it('should return initial array if no SupplierCategory is added', () => {
        const supplierCategoryCollection: ISupplierCategory[] = [sampleWithRequiredData];
        expectedResult = service.addSupplierCategoryToCollectionIfMissing(supplierCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(supplierCategoryCollection);
      });
    });

    describe('compareSupplierCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSupplierCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSupplierCategory(entity1, entity2);
        const compareResult2 = service.compareSupplierCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSupplierCategory(entity1, entity2);
        const compareResult2 = service.compareSupplierCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSupplierCategory(entity1, entity2);
        const compareResult2 = service.compareSupplierCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
