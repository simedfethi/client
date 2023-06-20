import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMarkSegment, NewMarkSegment } from '../mark-segment.model';

export type PartialUpdateMarkSegment = Partial<IMarkSegment> & Pick<IMarkSegment, 'id'>;

type RestOf<T extends IMarkSegment | NewMarkSegment> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

export type RestMarkSegment = RestOf<IMarkSegment>;

export type NewRestMarkSegment = RestOf<NewMarkSegment>;

export type PartialUpdateRestMarkSegment = RestOf<PartialUpdateMarkSegment>;

export type EntityResponseType = HttpResponse<IMarkSegment>;
export type EntityArrayResponseType = HttpResponse<IMarkSegment[]>;

@Injectable({ providedIn: 'root' })
export class MarkSegmentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mark-segments');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(markSegment: NewMarkSegment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markSegment);
    return this.http
      .post<RestMarkSegment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(markSegment: IMarkSegment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markSegment);
    return this.http
      .put<RestMarkSegment>(`${this.resourceUrl}/${this.getMarkSegmentIdentifier(markSegment)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(markSegment: PartialUpdateMarkSegment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(markSegment);
    return this.http
      .patch<RestMarkSegment>(`${this.resourceUrl}/${this.getMarkSegmentIdentifier(markSegment)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMarkSegment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMarkSegment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMarkSegmentIdentifier(markSegment: Pick<IMarkSegment, 'id'>): number {
    return markSegment.id;
  }

  compareMarkSegment(o1: Pick<IMarkSegment, 'id'> | null, o2: Pick<IMarkSegment, 'id'> | null): boolean {
    return o1 && o2 ? this.getMarkSegmentIdentifier(o1) === this.getMarkSegmentIdentifier(o2) : o1 === o2;
  }

  addMarkSegmentToCollectionIfMissing<Type extends Pick<IMarkSegment, 'id'>>(
    markSegmentCollection: Type[],
    ...markSegmentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const markSegments: Type[] = markSegmentsToCheck.filter(isPresent);
    if (markSegments.length > 0) {
      const markSegmentCollectionIdentifiers = markSegmentCollection.map(
        markSegmentItem => this.getMarkSegmentIdentifier(markSegmentItem)!
      );
      const markSegmentsToAdd = markSegments.filter(markSegmentItem => {
        const markSegmentIdentifier = this.getMarkSegmentIdentifier(markSegmentItem);
        if (markSegmentCollectionIdentifiers.includes(markSegmentIdentifier)) {
          return false;
        }
        markSegmentCollectionIdentifiers.push(markSegmentIdentifier);
        return true;
      });
      return [...markSegmentsToAdd, ...markSegmentCollection];
    }
    return markSegmentCollection;
  }

  protected convertDateFromClient<T extends IMarkSegment | NewMarkSegment | PartialUpdateMarkSegment>(markSegment: T): RestOf<T> {
    return {
      ...markSegment,
      createdAt: markSegment.createdAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restMarkSegment: RestMarkSegment): IMarkSegment {
    return {
      ...restMarkSegment,
      createdAt: restMarkSegment.createdAt ? dayjs(restMarkSegment.createdAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMarkSegment>): HttpResponse<IMarkSegment> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMarkSegment[]>): HttpResponse<IMarkSegment[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
