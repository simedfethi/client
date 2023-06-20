import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmConcurrent, NewCrmConcurrent } from '../crm-concurrent.model';

export type PartialUpdateCrmConcurrent = Partial<ICrmConcurrent> & Pick<ICrmConcurrent, 'id'>;

type RestOf<T extends ICrmConcurrent | NewCrmConcurrent> = Omit<T, 'createdTime' | 'lastUpdate'> & {
  createdTime?: string | null;
  lastUpdate?: string | null;
};

export type RestCrmConcurrent = RestOf<ICrmConcurrent>;

export type NewRestCrmConcurrent = RestOf<NewCrmConcurrent>;

export type PartialUpdateRestCrmConcurrent = RestOf<PartialUpdateCrmConcurrent>;

export type EntityResponseType = HttpResponse<ICrmConcurrent>;
export type EntityArrayResponseType = HttpResponse<ICrmConcurrent[]>;

@Injectable({ providedIn: 'root' })
export class CrmConcurrentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-concurrents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmConcurrent: NewCrmConcurrent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(crmConcurrent);
    return this.http
      .post<RestCrmConcurrent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(crmConcurrent: ICrmConcurrent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(crmConcurrent);
    return this.http
      .put<RestCrmConcurrent>(`${this.resourceUrl}/${this.getCrmConcurrentIdentifier(crmConcurrent)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(crmConcurrent: PartialUpdateCrmConcurrent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(crmConcurrent);
    return this.http
      .patch<RestCrmConcurrent>(`${this.resourceUrl}/${this.getCrmConcurrentIdentifier(crmConcurrent)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCrmConcurrent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCrmConcurrent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmConcurrentIdentifier(crmConcurrent: Pick<ICrmConcurrent, 'id'>): number {
    return crmConcurrent.id;
  }

  compareCrmConcurrent(o1: Pick<ICrmConcurrent, 'id'> | null, o2: Pick<ICrmConcurrent, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmConcurrentIdentifier(o1) === this.getCrmConcurrentIdentifier(o2) : o1 === o2;
  }

  addCrmConcurrentToCollectionIfMissing<Type extends Pick<ICrmConcurrent, 'id'>>(
    crmConcurrentCollection: Type[],
    ...crmConcurrentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmConcurrents: Type[] = crmConcurrentsToCheck.filter(isPresent);
    if (crmConcurrents.length > 0) {
      const crmConcurrentCollectionIdentifiers = crmConcurrentCollection.map(
        crmConcurrentItem => this.getCrmConcurrentIdentifier(crmConcurrentItem)!
      );
      const crmConcurrentsToAdd = crmConcurrents.filter(crmConcurrentItem => {
        const crmConcurrentIdentifier = this.getCrmConcurrentIdentifier(crmConcurrentItem);
        if (crmConcurrentCollectionIdentifiers.includes(crmConcurrentIdentifier)) {
          return false;
        }
        crmConcurrentCollectionIdentifiers.push(crmConcurrentIdentifier);
        return true;
      });
      return [...crmConcurrentsToAdd, ...crmConcurrentCollection];
    }
    return crmConcurrentCollection;
  }

  protected convertDateFromClient<T extends ICrmConcurrent | NewCrmConcurrent | PartialUpdateCrmConcurrent>(crmConcurrent: T): RestOf<T> {
    return {
      ...crmConcurrent,
      createdTime: crmConcurrent.createdTime?.toJSON() ?? null,
      lastUpdate: crmConcurrent.lastUpdate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCrmConcurrent: RestCrmConcurrent): ICrmConcurrent {
    return {
      ...restCrmConcurrent,
      createdTime: restCrmConcurrent.createdTime ? dayjs(restCrmConcurrent.createdTime) : undefined,
      lastUpdate: restCrmConcurrent.lastUpdate ? dayjs(restCrmConcurrent.lastUpdate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCrmConcurrent>): HttpResponse<ICrmConcurrent> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCrmConcurrent[]>): HttpResponse<ICrmConcurrent[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
