import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMarkCompaign, NewMarkCompaign } from '../mark-compaign.model';

export type PartialUpdateMarkCompaign = Partial<IMarkCompaign> & Pick<IMarkCompaign, 'id'>;

type RestOf<T extends IMarkCompaign | NewMarkCompaign> = Omit<T, 'sendTime' | 'createdAt' | 'endAt'> & {
  sendTime?: string | null;
  createdAt?: string | null;
  endAt?: string | null;
};

export type RestMarkCompaign = RestOf<IMarkCompaign>;

export type NewRestMarkCompaign = RestOf<NewMarkCompaign>;

export type PartialUpdateRestMarkCompaign = RestOf<PartialUpdateMarkCompaign>;

export type EntityResponseType = HttpResponse<IMarkCompaign>;
export type EntityArrayResponseType = HttpResponse<IMarkCompaign[]>;

@Injectable({ providedIn: 'root' })
export class MarkCompaignService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mark-compaigns');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(markCompaign: NewMarkCompaign): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markCompaign);
    return this.http
      .post<RestMarkCompaign>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }
  start(markCompaign: IMarkCompaign): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markCompaign);
    return this.http.post<IMarkCompaign>(this.resourceUrl.concat('/start'), copy, { observe: 'response' });
  }

  update(markCompaign: IMarkCompaign): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markCompaign);
    return this.http
      .put<RestMarkCompaign>(`${this.resourceUrl}/${this.getMarkCompaignIdentifier(markCompaign)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(markCompaign: PartialUpdateMarkCompaign): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markCompaign);
    return this.http
      .patch<RestMarkCompaign>(`${this.resourceUrl}/${this.getMarkCompaignIdentifier(markCompaign)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMarkCompaign>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMarkCompaign[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMarkCompaignIdentifier(markCompaign: Pick<IMarkCompaign, 'id'>): number {
    return markCompaign.id;
  }

  compareMarkCompaign(o1: Pick<IMarkCompaign, 'id'> | null, o2: Pick<IMarkCompaign, 'id'> | null): boolean {
    return o1 && o2 ? this.getMarkCompaignIdentifier(o1) === this.getMarkCompaignIdentifier(o2) : o1 === o2;
  }

  addMarkCompaignToCollectionIfMissing<Type extends Pick<IMarkCompaign, 'id'>>(
    markCompaignCollection: Type[],
    ...markCompaignsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const markCompaigns: Type[] = markCompaignsToCheck.filter(isPresent);
    if (markCompaigns.length > 0) {
      const markCompaignCollectionIdentifiers = markCompaignCollection.map(
        markCompaignItem => this.getMarkCompaignIdentifier(markCompaignItem)!
      );
      const markCompaignsToAdd = markCompaigns.filter(markCompaignItem => {
        const markCompaignIdentifier = this.getMarkCompaignIdentifier(markCompaignItem);
        if (markCompaignCollectionIdentifiers.includes(markCompaignIdentifier)) {
          return false;
        }
        markCompaignCollectionIdentifiers.push(markCompaignIdentifier);
        return true;
      });
      return [...markCompaignsToAdd, ...markCompaignCollection];
    }
    return markCompaignCollection;
  }

  protected convertDateFromClient<T extends IMarkCompaign | NewMarkCompaign | PartialUpdateMarkCompaign>(markCompaign: T): RestOf<T> {
    return {
      ...markCompaign,
      sendTime: markCompaign.sendTime?.toJSON() ?? null,
      createdAt: markCompaign.createdAt?.toJSON() ?? null,
      endAt: markCompaign.endAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restMarkCompaign: RestMarkCompaign): IMarkCompaign {
    return {
      ...restMarkCompaign,
      sendTime: restMarkCompaign.sendTime ? dayjs(restMarkCompaign.sendTime) : undefined,
      createdAt: restMarkCompaign.createdAt ? dayjs(restMarkCompaign.createdAt) : undefined,
      endAt: restMarkCompaign.endAt ? dayjs(restMarkCompaign.endAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMarkCompaign>): HttpResponse<IMarkCompaign> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMarkCompaign[]>): HttpResponse<IMarkCompaign[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
