import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProductvariante } from '../productvariante.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../productvariante.test-samples';

import { ProductvarianteService } from './productvariante.service';

const requireRestSample: IProductvariante = {
  ...sampleWithRequiredData,
};

describe('Productvariante Service', () => {
  let service: ProductvarianteService;
  let httpMock: HttpTestingController;
  let expectedResult: IProductvariante | IProductvariante[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProductvarianteService);
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

    it('should create a Productvariante', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const productvariante = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(productvariante).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Productvariante', () => {
      const productvariante = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(productvariante).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Productvariante', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Productvariante', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Productvariante', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProductvarianteToCollectionIfMissing', () => {
      it('should add a Productvariante to an empty array', () => {
        const productvariante: IProductvariante = sampleWithRequiredData;
        expectedResult = service.addProductvarianteToCollectionIfMissing([], productvariante);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(productvariante);
      });

      it('should not add a Productvariante to an array that contains it', () => {
        const productvariante: IProductvariante = sampleWithRequiredData;
        const productvarianteCollection: IProductvariante[] = [
          {
            ...productvariante,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProductvarianteToCollectionIfMissing(productvarianteCollection, productvariante);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Productvariante to an array that doesn't contain it", () => {
        const productvariante: IProductvariante = sampleWithRequiredData;
        const productvarianteCollection: IProductvariante[] = [sampleWithPartialData];
        expectedResult = service.addProductvarianteToCollectionIfMissing(productvarianteCollection, productvariante);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(productvariante);
      });

      it('should add only unique Productvariante to an array', () => {
        const productvarianteArray: IProductvariante[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const productvarianteCollection: IProductvariante[] = [sampleWithRequiredData];
        expectedResult = service.addProductvarianteToCollectionIfMissing(productvarianteCollection, ...productvarianteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const productvariante: IProductvariante = sampleWithRequiredData;
        const productvariante2: IProductvariante = sampleWithPartialData;
        expectedResult = service.addProductvarianteToCollectionIfMissing([], productvariante, productvariante2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(productvariante);
        expect(expectedResult).toContain(productvariante2);
      });

      it('should accept null and undefined values', () => {
        const productvariante: IProductvariante = sampleWithRequiredData;
        expectedResult = service.addProductvarianteToCollectionIfMissing([], null, productvariante, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(productvariante);
      });

      it('should return initial array if no Productvariante is added', () => {
        const productvarianteCollection: IProductvariante[] = [sampleWithRequiredData];
        expectedResult = service.addProductvarianteToCollectionIfMissing(productvarianteCollection, undefined, null);
        expect(expectedResult).toEqual(productvarianteCollection);
      });
    });

    describe('compareProductvariante', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProductvariante(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProductvariante(entity1, entity2);
        const compareResult2 = service.compareProductvariante(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProductvariante(entity1, entity2);
        const compareResult2 = service.compareProductvariante(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProductvariante(entity1, entity2);
        const compareResult2 = service.compareProductvariante(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
