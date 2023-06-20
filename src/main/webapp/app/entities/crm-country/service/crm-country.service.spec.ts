import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmCountry } from '../crm-country.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-country.test-samples';

import { CrmCountryService } from './crm-country.service';

const requireRestSample: ICrmCountry = {
  ...sampleWithRequiredData,
};

describe('CrmCountry Service', () => {
  let service: CrmCountryService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmCountry | ICrmCountry[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmCountryService);
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

    it('should create a CrmCountry', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmCountry = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmCountry).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmCountry', () => {
      const crmCountry = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmCountry).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmCountry', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmCountry', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmCountry', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmCountryToCollectionIfMissing', () => {
      it('should add a CrmCountry to an empty array', () => {
        const crmCountry: ICrmCountry = sampleWithRequiredData;
        expectedResult = service.addCrmCountryToCollectionIfMissing([], crmCountry);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmCountry);
      });

      it('should not add a CrmCountry to an array that contains it', () => {
        const crmCountry: ICrmCountry = sampleWithRequiredData;
        const crmCountryCollection: ICrmCountry[] = [
          {
            ...crmCountry,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmCountryToCollectionIfMissing(crmCountryCollection, crmCountry);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmCountry to an array that doesn't contain it", () => {
        const crmCountry: ICrmCountry = sampleWithRequiredData;
        const crmCountryCollection: ICrmCountry[] = [sampleWithPartialData];
        expectedResult = service.addCrmCountryToCollectionIfMissing(crmCountryCollection, crmCountry);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmCountry);
      });

      it('should add only unique CrmCountry to an array', () => {
        const crmCountryArray: ICrmCountry[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmCountryCollection: ICrmCountry[] = [sampleWithRequiredData];
        expectedResult = service.addCrmCountryToCollectionIfMissing(crmCountryCollection, ...crmCountryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmCountry: ICrmCountry = sampleWithRequiredData;
        const crmCountry2: ICrmCountry = sampleWithPartialData;
        expectedResult = service.addCrmCountryToCollectionIfMissing([], crmCountry, crmCountry2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmCountry);
        expect(expectedResult).toContain(crmCountry2);
      });

      it('should accept null and undefined values', () => {
        const crmCountry: ICrmCountry = sampleWithRequiredData;
        expectedResult = service.addCrmCountryToCollectionIfMissing([], null, crmCountry, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmCountry);
      });

      it('should return initial array if no CrmCountry is added', () => {
        const crmCountryCollection: ICrmCountry[] = [sampleWithRequiredData];
        expectedResult = service.addCrmCountryToCollectionIfMissing(crmCountryCollection, undefined, null);
        expect(expectedResult).toEqual(crmCountryCollection);
      });
    });

    describe('compareCrmCountry', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmCountry(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmCountry(entity1, entity2);
        const compareResult2 = service.compareCrmCountry(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmCountry(entity1, entity2);
        const compareResult2 = service.compareCrmCountry(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmCountry(entity1, entity2);
        const compareResult2 = service.compareCrmCountry(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
