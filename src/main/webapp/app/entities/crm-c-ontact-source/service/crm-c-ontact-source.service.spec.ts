import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmCOntactSource } from '../crm-c-ontact-source.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-c-ontact-source.test-samples';

import { CrmCOntactSourceService } from './crm-c-ontact-source.service';

const requireRestSample: ICrmCOntactSource = {
  ...sampleWithRequiredData,
};

describe('CrmCOntactSource Service', () => {
  let service: CrmCOntactSourceService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmCOntactSource | ICrmCOntactSource[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmCOntactSourceService);
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

    it('should create a CrmCOntactSource', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmCOntactSource = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmCOntactSource).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmCOntactSource', () => {
      const crmCOntactSource = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmCOntactSource).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmCOntactSource', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmCOntactSource', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmCOntactSource', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmCOntactSourceToCollectionIfMissing', () => {
      it('should add a CrmCOntactSource to an empty array', () => {
        const crmCOntactSource: ICrmCOntactSource = sampleWithRequiredData;
        expectedResult = service.addCrmCOntactSourceToCollectionIfMissing([], crmCOntactSource);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmCOntactSource);
      });

      it('should not add a CrmCOntactSource to an array that contains it', () => {
        const crmCOntactSource: ICrmCOntactSource = sampleWithRequiredData;
        const crmCOntactSourceCollection: ICrmCOntactSource[] = [
          {
            ...crmCOntactSource,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmCOntactSourceToCollectionIfMissing(crmCOntactSourceCollection, crmCOntactSource);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmCOntactSource to an array that doesn't contain it", () => {
        const crmCOntactSource: ICrmCOntactSource = sampleWithRequiredData;
        const crmCOntactSourceCollection: ICrmCOntactSource[] = [sampleWithPartialData];
        expectedResult = service.addCrmCOntactSourceToCollectionIfMissing(crmCOntactSourceCollection, crmCOntactSource);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmCOntactSource);
      });

      it('should add only unique CrmCOntactSource to an array', () => {
        const crmCOntactSourceArray: ICrmCOntactSource[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmCOntactSourceCollection: ICrmCOntactSource[] = [sampleWithRequiredData];
        expectedResult = service.addCrmCOntactSourceToCollectionIfMissing(crmCOntactSourceCollection, ...crmCOntactSourceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmCOntactSource: ICrmCOntactSource = sampleWithRequiredData;
        const crmCOntactSource2: ICrmCOntactSource = sampleWithPartialData;
        expectedResult = service.addCrmCOntactSourceToCollectionIfMissing([], crmCOntactSource, crmCOntactSource2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmCOntactSource);
        expect(expectedResult).toContain(crmCOntactSource2);
      });

      it('should accept null and undefined values', () => {
        const crmCOntactSource: ICrmCOntactSource = sampleWithRequiredData;
        expectedResult = service.addCrmCOntactSourceToCollectionIfMissing([], null, crmCOntactSource, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmCOntactSource);
      });

      it('should return initial array if no CrmCOntactSource is added', () => {
        const crmCOntactSourceCollection: ICrmCOntactSource[] = [sampleWithRequiredData];
        expectedResult = service.addCrmCOntactSourceToCollectionIfMissing(crmCOntactSourceCollection, undefined, null);
        expect(expectedResult).toEqual(crmCOntactSourceCollection);
      });
    });

    describe('compareCrmCOntactSource', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmCOntactSource(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmCOntactSource(entity1, entity2);
        const compareResult2 = service.compareCrmCOntactSource(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmCOntactSource(entity1, entity2);
        const compareResult2 = service.compareCrmCOntactSource(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmCOntactSource(entity1, entity2);
        const compareResult2 = service.compareCrmCOntactSource(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
