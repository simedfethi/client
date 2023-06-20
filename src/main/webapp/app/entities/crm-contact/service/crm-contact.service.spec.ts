import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICrmContact } from '../crm-contact.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../crm-contact.test-samples';

import { CrmContactService, RestCrmContact } from './crm-contact.service';

const requireRestSample: RestCrmContact = {
  ...sampleWithRequiredData,
  naissanceDate: sampleWithRequiredData.naissanceDate?.format(DATE_FORMAT),
  createdTime: sampleWithRequiredData.createdTime?.toJSON(),
  lastUpdate: sampleWithRequiredData.lastUpdate?.toJSON(),
};

describe('CrmContact Service', () => {
  let service: CrmContactService;
  let httpMock: HttpTestingController;
  let expectedResult: ICrmContact | ICrmContact[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CrmContactService);
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

    it('should create a CrmContact', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const crmContact = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(crmContact).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CrmContact', () => {
      const crmContact = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(crmContact).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CrmContact', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CrmContact', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CrmContact', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCrmContactToCollectionIfMissing', () => {
      it('should add a CrmContact to an empty array', () => {
        const crmContact: ICrmContact = sampleWithRequiredData;
        expectedResult = service.addCrmContactToCollectionIfMissing([], crmContact);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmContact);
      });

      it('should not add a CrmContact to an array that contains it', () => {
        const crmContact: ICrmContact = sampleWithRequiredData;
        const crmContactCollection: ICrmContact[] = [
          {
            ...crmContact,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCrmContactToCollectionIfMissing(crmContactCollection, crmContact);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CrmContact to an array that doesn't contain it", () => {
        const crmContact: ICrmContact = sampleWithRequiredData;
        const crmContactCollection: ICrmContact[] = [sampleWithPartialData];
        expectedResult = service.addCrmContactToCollectionIfMissing(crmContactCollection, crmContact);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmContact);
      });

      it('should add only unique CrmContact to an array', () => {
        const crmContactArray: ICrmContact[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const crmContactCollection: ICrmContact[] = [sampleWithRequiredData];
        expectedResult = service.addCrmContactToCollectionIfMissing(crmContactCollection, ...crmContactArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crmContact: ICrmContact = sampleWithRequiredData;
        const crmContact2: ICrmContact = sampleWithPartialData;
        expectedResult = service.addCrmContactToCollectionIfMissing([], crmContact, crmContact2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crmContact);
        expect(expectedResult).toContain(crmContact2);
      });

      it('should accept null and undefined values', () => {
        const crmContact: ICrmContact = sampleWithRequiredData;
        expectedResult = service.addCrmContactToCollectionIfMissing([], null, crmContact, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crmContact);
      });

      it('should return initial array if no CrmContact is added', () => {
        const crmContactCollection: ICrmContact[] = [sampleWithRequiredData];
        expectedResult = service.addCrmContactToCollectionIfMissing(crmContactCollection, undefined, null);
        expect(expectedResult).toEqual(crmContactCollection);
      });
    });

    describe('compareCrmContact', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCrmContact(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCrmContact(entity1, entity2);
        const compareResult2 = service.compareCrmContact(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCrmContact(entity1, entity2);
        const compareResult2 = service.compareCrmContact(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCrmContact(entity1, entity2);
        const compareResult2 = service.compareCrmContact(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
