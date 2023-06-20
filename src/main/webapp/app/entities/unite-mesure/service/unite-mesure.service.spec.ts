import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUniteMesure } from '../unite-mesure.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../unite-mesure.test-samples';

import { UniteMesureService } from './unite-mesure.service';

const requireRestSample: IUniteMesure = {
  ...sampleWithRequiredData,
};

describe('UniteMesure Service', () => {
  let service: UniteMesureService;
  let httpMock: HttpTestingController;
  let expectedResult: IUniteMesure | IUniteMesure[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UniteMesureService);
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

    it('should create a UniteMesure', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const uniteMesure = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(uniteMesure).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UniteMesure', () => {
      const uniteMesure = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(uniteMesure).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UniteMesure', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UniteMesure', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UniteMesure', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUniteMesureToCollectionIfMissing', () => {
      it('should add a UniteMesure to an empty array', () => {
        const uniteMesure: IUniteMesure = sampleWithRequiredData;
        expectedResult = service.addUniteMesureToCollectionIfMissing([], uniteMesure);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(uniteMesure);
      });

      it('should not add a UniteMesure to an array that contains it', () => {
        const uniteMesure: IUniteMesure = sampleWithRequiredData;
        const uniteMesureCollection: IUniteMesure[] = [
          {
            ...uniteMesure,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUniteMesureToCollectionIfMissing(uniteMesureCollection, uniteMesure);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UniteMesure to an array that doesn't contain it", () => {
        const uniteMesure: IUniteMesure = sampleWithRequiredData;
        const uniteMesureCollection: IUniteMesure[] = [sampleWithPartialData];
        expectedResult = service.addUniteMesureToCollectionIfMissing(uniteMesureCollection, uniteMesure);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(uniteMesure);
      });

      it('should add only unique UniteMesure to an array', () => {
        const uniteMesureArray: IUniteMesure[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const uniteMesureCollection: IUniteMesure[] = [sampleWithRequiredData];
        expectedResult = service.addUniteMesureToCollectionIfMissing(uniteMesureCollection, ...uniteMesureArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const uniteMesure: IUniteMesure = sampleWithRequiredData;
        const uniteMesure2: IUniteMesure = sampleWithPartialData;
        expectedResult = service.addUniteMesureToCollectionIfMissing([], uniteMesure, uniteMesure2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(uniteMesure);
        expect(expectedResult).toContain(uniteMesure2);
      });

      it('should accept null and undefined values', () => {
        const uniteMesure: IUniteMesure = sampleWithRequiredData;
        expectedResult = service.addUniteMesureToCollectionIfMissing([], null, uniteMesure, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(uniteMesure);
      });

      it('should return initial array if no UniteMesure is added', () => {
        const uniteMesureCollection: IUniteMesure[] = [sampleWithRequiredData];
        expectedResult = service.addUniteMesureToCollectionIfMissing(uniteMesureCollection, undefined, null);
        expect(expectedResult).toEqual(uniteMesureCollection);
      });
    });

    describe('compareUniteMesure', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUniteMesure(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUniteMesure(entity1, entity2);
        const compareResult2 = service.compareUniteMesure(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUniteMesure(entity1, entity2);
        const compareResult2 = service.compareUniteMesure(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUniteMesure(entity1, entity2);
        const compareResult2 = service.compareUniteMesure(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
