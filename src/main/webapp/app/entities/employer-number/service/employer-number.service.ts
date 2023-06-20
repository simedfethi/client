import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployerNumber, NewEmployerNumber } from '../employer-number.model';

export type PartialUpdateEmployerNumber = Partial<IEmployerNumber> & Pick<IEmployerNumber, 'id'>;

export type EntityResponseType = HttpResponse<IEmployerNumber>;
export type EntityArrayResponseType = HttpResponse<IEmployerNumber[]>;

@Injectable({ providedIn: 'root' })
export class EmployerNumberService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employer-numbers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(employerNumber: NewEmployerNumber): Observable<EntityResponseType> {
    return this.http.post<IEmployerNumber>(this.resourceUrl, employerNumber, { observe: 'response' });
  }

  update(employerNumber: IEmployerNumber): Observable<EntityResponseType> {
    return this.http.put<IEmployerNumber>(`${this.resourceUrl}/${this.getEmployerNumberIdentifier(employerNumber)}`, employerNumber, {
      observe: 'response',
    });
  }

  partialUpdate(employerNumber: PartialUpdateEmployerNumber): Observable<EntityResponseType> {
    return this.http.patch<IEmployerNumber>(`${this.resourceUrl}/${this.getEmployerNumberIdentifier(employerNumber)}`, employerNumber, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmployerNumber>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployerNumber[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEmployerNumberIdentifier(employerNumber: Pick<IEmployerNumber, 'id'>): number {
    return employerNumber.id;
  }

  compareEmployerNumber(o1: Pick<IEmployerNumber, 'id'> | null, o2: Pick<IEmployerNumber, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmployerNumberIdentifier(o1) === this.getEmployerNumberIdentifier(o2) : o1 === o2;
  }

  addEmployerNumberToCollectionIfMissing<Type extends Pick<IEmployerNumber, 'id'>>(
    employerNumberCollection: Type[],
    ...employerNumbersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const employerNumbers: Type[] = employerNumbersToCheck.filter(isPresent);
    if (employerNumbers.length > 0) {
      const employerNumberCollectionIdentifiers = employerNumberCollection.map(
        employerNumberItem => this.getEmployerNumberIdentifier(employerNumberItem)!
      );
      const employerNumbersToAdd = employerNumbers.filter(employerNumberItem => {
        const employerNumberIdentifier = this.getEmployerNumberIdentifier(employerNumberItem);
        if (employerNumberCollectionIdentifiers.includes(employerNumberIdentifier)) {
          return false;
        }
        employerNumberCollectionIdentifiers.push(employerNumberIdentifier);
        return true;
      });
      return [...employerNumbersToAdd, ...employerNumberCollection];
    }
    return employerNumberCollection;
  }
}
