import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { CustomerType } from 'app/entities/enumerations/customer-type.model';
import { ICustomer, Customer } from '../customer.model';

import { CustomerService } from './customer.service';

describe('Customer Service', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  let elemDefault: ICustomer;
  let expectedResult: ICustomer | ICustomer[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      customerType: CustomerType.PHYSIQUE,
      company: 'AAAAAAA',
      lastName: 'AAAAAAA',
      firstName: 'AAAAAAA',
      emailAddress: 'AAAAAAA',
      jobTitle: 'AAAAAAA',
      businessPhone: 'AAAAAAA',
      homePhone: 'AAAAAAA',
      mobilePhone: 'AAAAAAA',
      faxNumber: 'AAAAAAA',
      addresse: 'AAAAAAA',
      wilaya: 'AAAAAAA',
      daira: 'AAAAAAA',
      codePostal: 'AAAAAAA',
      commune: 'AAAAAAA',
      webPage: 'AAAAAAA',
      notes: 'AAAAAAA',
      attachmentsContentType: 'image/png',
      attachments: 'AAAAAAA',
      dejaClient: false,
      dateDerniereViste: currentDate,
      latitude: 0,
      longitude: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateDerniereViste: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Customer', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateDerniereViste: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateDerniereViste: currentDate,
        },
        returnedFromService
      );

      service.create(new Customer()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Customer', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          customerType: 'BBBBBB',
          company: 'BBBBBB',
          lastName: 'BBBBBB',
          firstName: 'BBBBBB',
          emailAddress: 'BBBBBB',
          jobTitle: 'BBBBBB',
          businessPhone: 'BBBBBB',
          homePhone: 'BBBBBB',
          mobilePhone: 'BBBBBB',
          faxNumber: 'BBBBBB',
          addresse: 'BBBBBB',
          wilaya: 'BBBBBB',
          daira: 'BBBBBB',
          codePostal: 'BBBBBB',
          commune: 'BBBBBB',
          webPage: 'BBBBBB',
          notes: 'BBBBBB',
          attachments: 'BBBBBB',
          dejaClient: true,
          dateDerniereViste: currentDate.format(DATE_FORMAT),
          latitude: 1,
          longitude: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateDerniereViste: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Customer', () => {
      const patchObject = Object.assign(
        {
          customerType: 'BBBBBB',
          lastName: 'BBBBBB',
          emailAddress: 'BBBBBB',
          jobTitle: 'BBBBBB',
          mobilePhone: 'BBBBBB',
          daira: 'BBBBBB',
          commune: 'BBBBBB',
          attachments: 'BBBBBB',
          longitude: 1,
        },
        new Customer()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateDerniereViste: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Customer', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          customerType: 'BBBBBB',
          company: 'BBBBBB',
          lastName: 'BBBBBB',
          firstName: 'BBBBBB',
          emailAddress: 'BBBBBB',
          jobTitle: 'BBBBBB',
          businessPhone: 'BBBBBB',
          homePhone: 'BBBBBB',
          mobilePhone: 'BBBBBB',
          faxNumber: 'BBBBBB',
          addresse: 'BBBBBB',
          wilaya: 'BBBBBB',
          daira: 'BBBBBB',
          codePostal: 'BBBBBB',
          commune: 'BBBBBB',
          webPage: 'BBBBBB',
          notes: 'BBBBBB',
          attachments: 'BBBBBB',
          dejaClient: true,
          dateDerniereViste: currentDate.format(DATE_FORMAT),
          latitude: 1,
          longitude: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateDerniereViste: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Customer', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCustomerToCollectionIfMissing', () => {
      it('should add a Customer to an empty array', () => {
        const customer: ICustomer = { id: 123 };
        expectedResult = service.addCustomerToCollectionIfMissing([], customer);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customer);
      });

      it('should not add a Customer to an array that contains it', () => {
        const customer: ICustomer = { id: 123 };
        const customerCollection: ICustomer[] = [
          {
            ...customer,
          },
          { id: 456 },
        ];
        expectedResult = service.addCustomerToCollectionIfMissing(customerCollection, customer);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Customer to an array that doesn't contain it", () => {
        const customer: ICustomer = { id: 123 };
        const customerCollection: ICustomer[] = [{ id: 456 }];
        expectedResult = service.addCustomerToCollectionIfMissing(customerCollection, customer);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customer);
      });

      it('should add only unique Customer to an array', () => {
        const customerArray: ICustomer[] = [{ id: 123 }, { id: 456 }, { id: 3380 }];
        const customerCollection: ICustomer[] = [{ id: 123 }];
        expectedResult = service.addCustomerToCollectionIfMissing(customerCollection, ...customerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const customer: ICustomer = { id: 123 };
        const customer2: ICustomer = { id: 456 };
        expectedResult = service.addCustomerToCollectionIfMissing([], customer, customer2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customer);
        expect(expectedResult).toContain(customer2);
      });

      it('should accept null and undefined values', () => {
        const customer: ICustomer = { id: 123 };
        expectedResult = service.addCustomerToCollectionIfMissing([], null, customer, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customer);
      });

      it('should return initial array if no Customer is added', () => {
        const customerCollection: ICustomer[] = [{ id: 123 }];
        expectedResult = service.addCustomerToCollectionIfMissing(customerCollection, undefined, null);
        expect(expectedResult).toEqual(customerCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
