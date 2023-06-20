import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITransportUnit } from '../transport-unit.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../transport-unit.test-samples';

import { TransportUnitService } from './transport-unit.service';

const requireRestSample: ITransportUnit = {
  ...sampleWithRequiredData,
};

describe('TransportUnit Service', () => {
  let service: TransportUnitService;
  let httpMock: HttpTestingController;
  let expectedResult: ITransportUnit | ITransportUnit[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TransportUnitService);
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

    it('should create a TransportUnit', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const transportUnit = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(transportUnit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TransportUnit', () => {
      const transportUnit = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(transportUnit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TransportUnit', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TransportUnit', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TransportUnit', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTransportUnitToCollectionIfMissing', () => {
      it('should add a TransportUnit to an empty array', () => {
        const transportUnit: ITransportUnit = sampleWithRequiredData;
        expectedResult = service.addTransportUnitToCollectionIfMissing([], transportUnit);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transportUnit);
      });

      it('should not add a TransportUnit to an array that contains it', () => {
        const transportUnit: ITransportUnit = sampleWithRequiredData;
        const transportUnitCollection: ITransportUnit[] = [
          {
            ...transportUnit,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTransportUnitToCollectionIfMissing(transportUnitCollection, transportUnit);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TransportUnit to an array that doesn't contain it", () => {
        const transportUnit: ITransportUnit = sampleWithRequiredData;
        const transportUnitCollection: ITransportUnit[] = [sampleWithPartialData];
        expectedResult = service.addTransportUnitToCollectionIfMissing(transportUnitCollection, transportUnit);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transportUnit);
      });

      it('should add only unique TransportUnit to an array', () => {
        const transportUnitArray: ITransportUnit[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const transportUnitCollection: ITransportUnit[] = [sampleWithRequiredData];
        expectedResult = service.addTransportUnitToCollectionIfMissing(transportUnitCollection, ...transportUnitArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const transportUnit: ITransportUnit = sampleWithRequiredData;
        const transportUnit2: ITransportUnit = sampleWithPartialData;
        expectedResult = service.addTransportUnitToCollectionIfMissing([], transportUnit, transportUnit2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(transportUnit);
        expect(expectedResult).toContain(transportUnit2);
      });

      it('should accept null and undefined values', () => {
        const transportUnit: ITransportUnit = sampleWithRequiredData;
        expectedResult = service.addTransportUnitToCollectionIfMissing([], null, transportUnit, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(transportUnit);
      });

      it('should return initial array if no TransportUnit is added', () => {
        const transportUnitCollection: ITransportUnit[] = [sampleWithRequiredData];
        expectedResult = service.addTransportUnitToCollectionIfMissing(transportUnitCollection, undefined, null);
        expect(expectedResult).toEqual(transportUnitCollection);
      });
    });

    describe('compareTransportUnit', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTransportUnit(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTransportUnit(entity1, entity2);
        const compareResult2 = service.compareTransportUnit(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTransportUnit(entity1, entity2);
        const compareResult2 = service.compareTransportUnit(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTransportUnit(entity1, entity2);
        const compareResult2 = service.compareTransportUnit(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
