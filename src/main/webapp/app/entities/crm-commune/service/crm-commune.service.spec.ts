import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmCommune } from '../crm-commune.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-commune.test-samples';

import { CrmCommuneService } from './crm-commune.service';

const requireRestSample: ICrmCommune = {
  ...sampleWithRequiredData,
};

describe('CrmCommune Service', () => {
  let service: CrmCommuneService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmCommune | ICrmCommune[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmCommuneService);
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

    it('should create a CrmCommune', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmCommune = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmCommune).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmCommune', () => {
      const crmCommune = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmCommune).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmCommune', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmCommune', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmCommune', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmCommuneToCollectionIfMissing', () => {
      it('should add a CrmCommune to an empty array', () => {
        const crmCommune: ICrmCommune = sampleWithRequiredData;
        expectedResult = service.addCrmCommuneToCollectionIfMissing([], crmCommune);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmCommune);
      });

      it('should not add a CrmCommune to an array that contains it', () => {
        const crmCommune: ICrmCommune = sampleWithRequiredData;
        const crmCommuneCollection: ICrmCommune[] = [
          {
            ...crmCommune,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmCommuneToCollectionIfMissing(crmCommuneCollection, crmCommune);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmCommune to an array that doesn't contain it", () => {
        const crmCommune: ICrmCommune = sampleWithRequiredData;
        const crmCommuneCollection: ICrmCommune[] = [sampleWithPartialData];
        expectedResult = service.addCrmCommuneToCollectionIfMissing(crmCommuneCollection, crmCommune);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmCommune);
      });

      it('should add only unique CrmCommune to an array', () => {
        const crmCommuneArray: ICrmCommune[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmCommuneCollection: ICrmCommune[] = [sampleWithRequiredData];
        expectedResult = service.addCrmCommuneToCollectionIfMissing(crmCommuneCollection, ...crmCommuneArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmCommune: ICrmCommune = sampleWithRequiredData;
        const crmCommune2: ICrmCommune = sampleWithPartialData;
        expectedResult = service.addCrmCommuneToCollectionIfMissing([], crmCommune, crmCommune2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmCommune);
        expect(expectedResult).toContain(crmCommune2);
      });

      it('should accept null and undefined values', () => {
        const crmCommune: ICrmCommune = sampleWithRequiredData;
        expectedResult = service.addCrmCommuneToCollectionIfMissing([], null, crmCommune, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmCommune);
      });

      it('should return initial array if no CrmCommune is added', () => {
        const crmCommuneCollection: ICrmCommune[] = [sampleWithRequiredData];
        expectedResult = service.addCrmCommuneToCollectionIfMissing(crmCommuneCollection, undefined, null);
        expect(expectedResult).toEqual(crmCommuneCollection);
      });
    });

    describe('compareCrmCommune', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmCommune(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmCommune(entity1, entity2);
        const compareResult2 = service.compareCrmCommune(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmCommune(entity1, entity2);
        const compareResult2 = service.compareCrmCommune(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmCommune(entity1, entity2);
        const compareResult2 = service.compareCrmCommune(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
