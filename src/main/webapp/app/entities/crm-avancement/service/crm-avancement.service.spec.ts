import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmAvancement } from '../crm-avancement.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-avancement.test-samples';

import { CrmAvancementService } from './crm-avancement.service';

const requireRestSample: ICrmAvancement = {
  ...sampleWithRequiredData,
};

describe('CrmAvancement Service', () => {
  let service: CrmAvancementService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmAvancement | ICrmAvancement[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmAvancementService);
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

    it('should create a CrmAvancement', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmAvancement = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmAvancement).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmAvancement', () => {
      const crmAvancement = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmAvancement).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmAvancement', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmAvancement', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmAvancement', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmAvancementToCollectionIfMissing', () => {
      it('should add a CrmAvancement to an empty array', () => {
        const crmAvancement: ICrmAvancement = sampleWithRequiredData;
        expectedResult = service.addCrmAvancementToCollectionIfMissing([], crmAvancement);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmAvancement);
      });

      it('should not add a CrmAvancement to an array that contains it', () => {
        const crmAvancement: ICrmAvancement = sampleWithRequiredData;
        const crmAvancementCollection: ICrmAvancement[] = [
          {
            ...crmAvancement,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmAvancementToCollectionIfMissing(crmAvancementCollection, crmAvancement);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmAvancement to an array that doesn't contain it", () => {
        const crmAvancement: ICrmAvancement = sampleWithRequiredData;
        const crmAvancementCollection: ICrmAvancement[] = [sampleWithPartialData];
        expectedResult = service.addCrmAvancementToCollectionIfMissing(crmAvancementCollection, crmAvancement);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmAvancement);
      });

      it('should add only unique CrmAvancement to an array', () => {
        const crmAvancementArray: ICrmAvancement[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmAvancementCollection: ICrmAvancement[] = [sampleWithRequiredData];
        expectedResult = service.addCrmAvancementToCollectionIfMissing(crmAvancementCollection, ...crmAvancementArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmAvancement: ICrmAvancement = sampleWithRequiredData;
        const crmAvancement2: ICrmAvancement = sampleWithPartialData;
        expectedResult = service.addCrmAvancementToCollectionIfMissing([], crmAvancement, crmAvancement2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmAvancement);
        expect(expectedResult).toContain(crmAvancement2);
      });

      it('should accept null and undefined values', () => {
        const crmAvancement: ICrmAvancement = sampleWithRequiredData;
        expectedResult = service.addCrmAvancementToCollectionIfMissing([], null, crmAvancement, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmAvancement);
      });

      it('should return initial array if no CrmAvancement is added', () => {
        const crmAvancementCollection: ICrmAvancement[] = [sampleWithRequiredData];
        expectedResult = service.addCrmAvancementToCollectionIfMissing(crmAvancementCollection, undefined, null);
        expect(expectedResult).toEqual(crmAvancementCollection);
      });
    });

    describe('compareCrmAvancement', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmAvancement(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmAvancement(entity1, entity2);
        const compareResult2 = service.compareCrmAvancement(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmAvancement(entity1, entity2);
        const compareResult2 = service.compareCrmAvancement(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmAvancement(entity1, entity2);
        const compareResult2 = service.compareCrmAvancement(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
