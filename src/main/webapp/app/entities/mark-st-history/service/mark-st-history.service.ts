import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMarkStHistory, NewMarkStHistory } from '../mark-st-history.model';

export type PartialUpdateMarkStHistory = Partial<IMarkStHistory> & Pick<IMarkStHistory, 'id'>;

type RestOf<T extends IMarkStHistory | NewMarkStHistory> = Omit<T, 'startTime' | 'endTime'> & {
  startTime?: string | null;
  endTime?: string | null;
};

export type RestMarkStHistory = RestOf<IMarkStHistory>;

export type NewRestMarkStHistory = RestOf<NewMarkStHistory>;

export type PartialUpdateRestMarkStHistory = RestOf<PartialUpdateMarkStHistory>;

export type EntityResponseType = HttpResponse<IMarkStHistory>;
export type EntityArrayResponseType = HttpResponse<IMarkStHistory[]>;

@Injectable({ providedIn: 'root' })
export class MarkStHistoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mark-st-histories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(markStHistory: NewMarkStHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markStHistory);
    return this.http
      .post<RestMarkStHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(markStHistory: IMarkStHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markStHistory);
    return this.http
      .put<RestMarkStHistory>(`${this.resourceUrl}/${this.getMarkStHistoryIdentifier(markStHistory)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(markStHistory: PartialUpdateMarkStHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markStHistory);
    return this.http
      .patch<RestMarkStHistory>(`${this.resourceUrl}/${this.getMarkStHistoryIdentifier(markStHistory)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMarkStHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMarkStHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMarkStHistoryIdentifier(markStHistory: Pick<IMarkStHistory, 'id'>): number {
    return markStHistory.id;
  }

  compareMarkStHistory(o1: Pick<IMarkStHistory, 'id'> | null, o2: Pick<IMarkStHistory, 'id'> | null): boolean {
    return o1 && o2 ? this.getMarkStHistoryIdentifier(o1) === this.getMarkStHistoryIdentifier(o2) : o1 === o2;
  }

  addMarkStHistoryToCollectionIfMissing<Type extends Pick<IMarkStHistory, 'id'>>(
    markStHistoryCollection: Type[],
    ...markStHistoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const markStHistories: Type[] = markStHistoriesToCheck.filter(isPresent);
    if (markStHistories.length > 0) {
      const markStHistoryCollectionIdentifiers = markStHistoryCollection.map(
        markStHistoryItem => this.getMarkStHistoryIdentifier(markStHistoryItem)!
      );
      const markStHistoriesToAdd = markStHistories.filter(markStHistoryItem => {
        const markStHistoryIdentifier = this.getMarkStHistoryIdentifier(markStHistoryItem);
        if (markStHistoryCollectionIdentifiers.includes(markStHistoryIdentifier)) {
          return false;
        }
        markStHistoryCollectionIdentifiers.push(markStHistoryIdentifier);
        return true;
      });
      return [...markStHistoriesToAdd, ...markStHistoryCollection];
    }
    return markStHistoryCollection;
  }

  protected convertDateFromClient<T extends IMarkStHistory | NewMarkStHistory | PartialUpdateMarkStHistory>(markStHistory: T): RestOf<T> {
    return {
      ...markStHistory,
      startTime: markStHistory.startTime?.toJSON() ?? null,
      endTime: markStHistory.endTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restMarkStHistory: RestMarkStHistory): IMarkStHistory {
    return {
      ...restMarkStHistory,
      startTime: restMarkStHistory.startTime ? dayjs(restMarkStHistory.startTime) : undefined,
      endTime: restMarkStHistory.endTime ? dayjs(restMarkStHistory.endTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMarkStHistory>): HttpResponse<IMarkStHistory> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMarkStHistory[]>): HttpResponse<IMarkStHistory[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
