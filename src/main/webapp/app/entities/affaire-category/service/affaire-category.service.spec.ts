import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAffaireCategory } from '../affaire-category.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../affaire-category.test-samples';

import { AffaireCategoryService } from './affaire-category.service';

const requireRestSample: IAffaireCategory = {
  ...sampleWithRequiredData,
};

describe('AffaireCategory Service', () => {
  let service: AffaireCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: IAffaireCategory | IAffaireCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AffaireCategoryService);
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

    it('should create a AffaireCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const affaireCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(affaireCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AffaireCategory', () => {
      const affaireCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(affaireCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AffaireCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AffaireCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AffaireCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAffaireCategoryToCollectionIfMissing', () => {
      it('should add a AffaireCategory to an empty array', () => {
        const affaireCategory: IAffaireCategory = sampleWithRequiredData;
        expectedResult = service.addAffaireCategoryToCollectionIfMissing([], affaireCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(affaireCategory);
      });

      it('should not add a AffaireCategory to an array that contains it', () => {
        const affaireCategory: IAffaireCategory = sampleWithRequiredData;
        const affaireCategoryCollection: IAffaireCategory[] = [
          {
            ...affaireCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAffaireCategoryToCollectionIfMissing(affaireCategoryCollection, affaireCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AffaireCategory to an array that doesn't contain it", () => {
        const affaireCategory: IAffaireCategory = sampleWithRequiredData;
        const affaireCategoryCollection: IAffaireCategory[] = [sampleWithPartialData];
        expectedResult = service.addAffaireCategoryToCollectionIfMissing(affaireCategoryCollection, affaireCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(affaireCategory);
      });

      it('should add only unique AffaireCategory to an array', () => {
        const affaireCategoryArray: IAffaireCategory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const affaireCategoryCollection: IAffaireCategory[] = [sampleWithRequiredData];
        expectedResult = service.addAffaireCategoryToCollectionIfMissing(affaireCategoryCollection, ...affaireCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const affaireCategory: IAffaireCategory = sampleWithRequiredData;
        const affaireCategory2: IAffaireCategory = sampleWithPartialData;
        expectedResult = service.addAffaireCategoryToCollectionIfMissing([], affaireCategory, affaireCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(affaireCategory);
        expect(expectedResult).toContain(affaireCategory2);
      });

      it('should accept null and undefined values', () => {
        const affaireCategory: IAffaireCategory = sampleWithRequiredData;
        expectedResult = service.addAffaireCategoryToCollectionIfMissing([], null, affaireCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(affaireCategory);
      });

      it('should return initial array if no AffaireCategory is added', () => {
        const affaireCategoryCollection: IAffaireCategory[] = [sampleWithRequiredData];
        expectedResult = service.addAffaireCategoryToCollectionIfMissing(affaireCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(affaireCategoryCollection);
      });
    });

    describe('compareAffaireCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAffaireCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAffaireCategory(entity1, entity2);
        const compareResult2 = service.compareAffaireCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAffaireCategory(entity1, entity2);
        const compareResult2 = service.compareAffaireCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAffaireCategory(entity1, entity2);
        const compareResult2 = service.compareAffaireCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
