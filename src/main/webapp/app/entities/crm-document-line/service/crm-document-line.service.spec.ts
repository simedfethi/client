import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrmDocumentLine } from '../crm-document-line.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-document-line.test-samples';

import { CrmDocumentLineService } from './crm-document-line.service';

const requireRestSample: ICrmDocumentLine = {
  ...sampleWithRequiredData,
};

describe('CrmDocumentLine Service', () => {
  let service: CrmDocumentLineService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmDocumentLine | ICrmDocumentLine[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmDocumentLineService);
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

    it('should create a CrmDocumentLine', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmDocumentLine = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmDocumentLine).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmDocumentLine', () => {
      const crmDocumentLine = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmDocumentLine).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmDocumentLine', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmDocumentLine', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmDocumentLine', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmDocumentLineToCollectionIfMissing', () => {
      it('should add a CrmDocumentLine to an empty array', () => {
        const crmDocumentLine: ICrmDocumentLine = sampleWithRequiredData;
        expectedResult = service.addCrmDocumentLineToCollectionIfMissing([], crmDocumentLine);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmDocumentLine);
      });

      it('should not add a CrmDocumentLine to an array that contains it', () => {
        const crmDocumentLine: ICrmDocumentLine = sampleWithRequiredData;
        const crmDocumentLineCollection: ICrmDocumentLine[] = [
          {
            ...crmDocumentLine,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmDocumentLineToCollectionIfMissing(crmDocumentLineCollection, crmDocumentLine);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmDocumentLine to an array that doesn't contain it", () => {
        const crmDocumentLine: ICrmDocumentLine = sampleWithRequiredData;
        const crmDocumentLineCollection: ICrmDocumentLine[] = [sampleWithPartialData];
        expectedResult = service.addCrmDocumentLineToCollectionIfMissing(crmDocumentLineCollection, crmDocumentLine);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmDocumentLine);
      });

      it('should add only unique CrmDocumentLine to an array', () => {
        const crmDocumentLineArray: ICrmDocumentLine[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmDocumentLineCollection: ICrmDocumentLine[] = [sampleWithRequiredData];
        expectedResult = service.addCrmDocumentLineToCollectionIfMissing(crmDocumentLineCollection, ...crmDocumentLineArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmDocumentLine: ICrmDocumentLine = sampleWithRequiredData;
        const crmDocumentLine2: ICrmDocumentLine = sampleWithPartialData;
        expectedResult = service.addCrmDocumentLineToCollectionIfMissing([], crmDocumentLine, crmDocumentLine2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmDocumentLine);
        expect(expectedResult).toContain(crmDocumentLine2);
      });

      it('should accept null and undefined values', () => {
        const crmDocumentLine: ICrmDocumentLine = sampleWithRequiredData;
        expectedResult = service.addCrmDocumentLineToCollectionIfMissing([], null, crmDocumentLine, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmDocumentLine);
      });

      it('should return initial array if no CrmDocumentLine is added', () => {
        const crmDocumentLineCollection: ICrmDocumentLine[] = [sampleWithRequiredData];
        expectedResult = service.addCrmDocumentLineToCollectionIfMissing(crmDocumentLineCollection, undefined, null);
        expect(expectedResult).toEqual(crmDocumentLineCollection);
      });
    });

    describe('compareCrmDocumentLine', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmDocumentLine(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmDocumentLine(entity1, entity2);
        const compareResult2 = service.compareCrmDocumentLine(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmDocumentLine(entity1, entity2);
        const compareResult2 = service.compareCrmDocumentLine(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmDocumentLine(entity1, entity2);
        const compareResult2 = service.compareCrmDocumentLine(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
