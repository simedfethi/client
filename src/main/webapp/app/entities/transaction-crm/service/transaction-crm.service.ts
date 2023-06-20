import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITransactionCRM, NewTransactionCRM } from '../transaction-crm.model';

export type PartialUpdateTransactionCRM = Partial<ITransactionCRM> & Pick<ITransactionCRM, 'id'>;
type RestOf<T extends ITransactionCRM | NewTransactionCRM> = Omit<
  T,
  'dateFin' | 'creeLe' | 'dernierUpdate' | 'lastActivity' | 'etapeDepuis'
  > & {
  dateFin?: string | null;
  creeLe?: string | null;
  dernierUpdate?: string | null;
  lastActivity?: string | null;
  etapeDepuis?: string | null;
};

export type RestTransactionCRM = RestOf<ITransactionCRM>;

export type NewRestTransactionCRM = RestOf<NewTransactionCRM>;

export type PartialUpdateRestTransactionCRM = RestOf<PartialUpdateTransactionCRM>;

export type EntityResponseType = HttpResponse<ITransactionCRM>;
export type EntityArrayResponseType = HttpResponse<ITransactionCRM[]>;

@Injectable({ providedIn: 'root' })
export class TransactionCRMService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/transaction-crms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(transactionCRM: NewTransactionCRM): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactionCRM);
    return this.http
      .post<RestTransactionCRM>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(transactionCRM: ITransactionCRM): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactionCRM);
    return this.http
      .put<RestTransactionCRM>(`${this.resourceUrl}/${this.getTransactionCRMIdentifier(transactionCRM)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(transactionCRM: PartialUpdateTransactionCRM): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactionCRM);
    return this.http
      .patch<RestTransactionCRM>(`${this.resourceUrl}/${this.getTransactionCRMIdentifier(transactionCRM)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }
  validate(transactionCRM: PartialUpdateTransactionCRM): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactionCRM);
    return this.http
      .patch<RestTransactionCRM>(`${this.resourceUrl}/validate/${this.getTransactionCRMIdentifier(transactionCRM)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTransactionCRM>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTransactionCRM[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }
  queryOr(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTransactionCRM[]>(`${this.resourceUrl}/search`, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTransactionCRMIdentifier(transactionCRM: Pick<ITransactionCRM, 'id'>): number {
    return transactionCRM.id;
  }

  compareTransactionCRM(o1: Pick<ITransactionCRM, 'id'> | null, o2: Pick<ITransactionCRM, 'id'> | null): boolean {
    return o1 && o2 ? this.getTransactionCRMIdentifier(o1) === this.getTransactionCRMIdentifier(o2) : o1 === o2;
  }

  addTransactionCRMToCollectionIfMissing<Type extends Pick<ITransactionCRM, 'id'>>(
    transactionCRMCollection: Type[],
    ...transactionCRMSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const transactionCRMS: Type[] = transactionCRMSToCheck.filter(isPresent);
    if (transactionCRMS.length > 0) {
      const transactionCRMCollectionIdentifiers = transactionCRMCollection.map(
        transactionCRMItem => this.getTransactionCRMIdentifier(transactionCRMItem)!
      );
      const transactionCRMSToAdd = transactionCRMS.filter(transactionCRMItem => {
        const transactionCRMIdentifier = this.getTransactionCRMIdentifier(transactionCRMItem);
        if (transactionCRMCollectionIdentifiers.includes(transactionCRMIdentifier)) {
          return false;
        }
        transactionCRMCollectionIdentifiers.push(transactionCRMIdentifier);
        return true;
      });
      return [...transactionCRMSToAdd, ...transactionCRMCollection];
    }
    return transactionCRMCollection;
  }


  protected convertDateFromClient<T extends ITransactionCRM | NewTransactionCRM | PartialUpdateTransactionCRM>(
    transactionCRM: T
  ): RestOf<T> {
    return {
      ...transactionCRM,
      dateFin: transactionCRM.dateFin?.format(DATE_FORMAT) ?? null,
      creeLe: transactionCRM.creeLe?.toJSON() ?? null,
      dernierUpdate: transactionCRM.dernierUpdate?.toJSON() ?? null,
      lastActivity: transactionCRM.lastActivity?.toJSON() ?? null,
      etapeDepuis: transactionCRM.etapeDepuis?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTransactionCRM: RestTransactionCRM): ITransactionCRM {
    return {
      ...restTransactionCRM,
      dateFin: restTransactionCRM.dateFin ? dayjs(restTransactionCRM.dateFin) : undefined,
      creeLe: restTransactionCRM.creeLe ? dayjs(restTransactionCRM.creeLe) : undefined,
      dernierUpdate: restTransactionCRM.dernierUpdate ? dayjs(restTransactionCRM.dernierUpdate) : undefined,
      lastActivity: restTransactionCRM.lastActivity ? dayjs(restTransactionCRM.lastActivity) : undefined,
      etapeDepuis: restTransactionCRM.etapeDepuis ? dayjs(restTransactionCRM.etapeDepuis) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTransactionCRM>): HttpResponse<ITransactionCRM> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTransactionCRM[]>): HttpResponse<ITransactionCRM[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
