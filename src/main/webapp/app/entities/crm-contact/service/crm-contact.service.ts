import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmContact, NewCrmContact } from '../crm-contact.model';

export type PartialUpdateCrmContact = Partial<ICrmContact> & Pick<ICrmContact, 'id'>;

type RestOf<T extends ICrmContact | NewCrmContact> = Omit<T, 'naissanceDate' | 'createdTime' | 'lastUpdate'> & {
  naissanceDate?: string | null;
  createdTime?: string | null;
  lastUpdate?: string | null;
};

export type RestCrmContact = RestOf<ICrmContact>;

export type NewRestCrmContact = RestOf<NewCrmContact>;

export type PartialUpdateRestCrmContact = RestOf<PartialUpdateCrmContact>;

export type EntityResponseType = HttpResponse<ICrmContact>;
export type EntityArrayResponseType = HttpResponse<ICrmContact[]>;

@Injectable({ providedIn: 'root' })
export class CrmContactService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-contacts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmContact: NewCrmContact): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(crmContact);
    return this.http
      .post<RestCrmContact>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(crmContact: ICrmContact): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(crmContact);
    return this.http
      .put<RestCrmContact>(`${this.resourceUrl}/${this.getCrmContactIdentifier(crmContact)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(crmContact: PartialUpdateCrmContact): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(crmContact);
    return this.http
      .patch<RestCrmContact>(`${this.resourceUrl}/${this.getCrmContactIdentifier(crmContact)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCrmContact>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCrmContact[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmContactIdentifier(crmContact: Pick<ICrmContact, 'id'>): number {
    return crmContact.id;
  }

  compareCrmContact(o1: Pick<ICrmContact, 'id'> | null, o2: Pick<ICrmContact, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmContactIdentifier(o1) === this.getCrmContactIdentifier(o2) : o1 === o2;
  }

  addCrmContactToCollectionIfMissing<Type extends Pick<ICrmContact, 'id'>>(
    crmContactCollection: Type[],
    ...crmContactsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmContacts: Type[] = crmContactsToCheck.filter(isPresent);
    if (crmContacts.length > 0) {
      const crmContactCollectionIdentifiers = crmContactCollection.map(crmContactItem => this.getCrmContactIdentifier(crmContactItem)!);
      const crmContactsToAdd = crmContacts.filter(crmContactItem => {
        const crmContactIdentifier = this.getCrmContactIdentifier(crmContactItem);
        if (crmContactCollectionIdentifiers.includes(crmContactIdentifier)) {
          return false;
        }
        crmContactCollectionIdentifiers.push(crmContactIdentifier);
        return true;
      });
      return [...crmContactsToAdd, ...crmContactCollection];
    }
    return crmContactCollection;
  }

  protected convertDateFromClient<T extends ICrmContact | NewCrmContact | PartialUpdateCrmContact>(crmContact: T): RestOf<T> {
    return {
      ...crmContact,
      naissanceDate: crmContact.naissanceDate?.format(DATE_FORMAT) ?? null,
      createdTime: crmContact.createdTime?.toJSON() ?? null,
      lastUpdate: crmContact.lastUpdate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCrmContact: RestCrmContact): ICrmContact {
    return {
      ...restCrmContact,
      naissanceDate: restCrmContact.naissanceDate ? dayjs(restCrmContact.naissanceDate) : undefined,
      createdTime: restCrmContact.createdTime ? dayjs(restCrmContact.createdTime) : undefined,
      lastUpdate: restCrmContact.lastUpdate ? dayjs(restCrmContact.lastUpdate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCrmContact>): HttpResponse<ICrmContact> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCrmContact[]>): HttpResponse<ICrmContact[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
