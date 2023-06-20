import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITransporter, NewTransporter } from '../transporter.model';

export type PartialUpdateTransporter = Partial<ITransporter> & Pick<ITransporter, 'id'>;

type RestOf<T extends ITransporter | NewTransporter> = Omit<T, 'expireDate'> & {
  expireDate?: string | null;
};

export type RestTransporter = RestOf<ITransporter>;

export type NewRestTransporter = RestOf<NewTransporter>;

export type PartialUpdateRestTransporter = RestOf<PartialUpdateTransporter>;

export type EntityResponseType = HttpResponse<ITransporter>;
export type EntityArrayResponseType = HttpResponse<ITransporter[]>;

@Injectable({ providedIn: 'root' })
export class TransporterService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/transporters');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(transporter: NewTransporter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transporter);
    return this.http
      .post<RestTransporter>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(transporter: ITransporter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transporter);
    return this.http
      .put<RestTransporter>(`${this.resourceUrl}/${this.getTransporterIdentifier(transporter)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(transporter: PartialUpdateTransporter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transporter);
    return this.http
      .patch<RestTransporter>(`${this.resourceUrl}/${this.getTransporterIdentifier(transporter)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTransporter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTransporter[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTransporterIdentifier(transporter: Pick<ITransporter, 'id'>): number {
    return transporter.id;
  }

  compareTransporter(o1: Pick<ITransporter, 'id'> | null, o2: Pick<ITransporter, 'id'> | null): boolean {
    return o1 && o2 ? this.getTransporterIdentifier(o1) === this.getTransporterIdentifier(o2) : o1 === o2;
  }

  addTransporterToCollectionIfMissing<Type extends Pick<ITransporter, 'id'>>(
    transporterCollection: Type[],
    ...transportersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const transporters: Type[] = transportersToCheck.filter(isPresent);
    if (transporters.length > 0) {
      const transporterCollectionIdentifiers = transporterCollection.map(
        transporterItem => this.getTransporterIdentifier(transporterItem)!
      );
      const transportersToAdd = transporters.filter(transporterItem => {
        const transporterIdentifier = this.getTransporterIdentifier(transporterItem);
        if (transporterCollectionIdentifiers.includes(transporterIdentifier)) {
          return false;
        }
        transporterCollectionIdentifiers.push(transporterIdentifier);
        return true;
      });
      return [...transportersToAdd, ...transporterCollection];
    }
    return transporterCollection;
  }

  protected convertDateFromClient<T extends ITransporter | NewTransporter | PartialUpdateTransporter>(transporter: T): RestOf<T> {
    return {
      ...transporter,
      expireDate: transporter.expireDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTransporter: RestTransporter): ITransporter {
    return {
      ...restTransporter,
      expireDate: restTransporter.expireDate ? dayjs(restTransporter.expireDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTransporter>): HttpResponse<ITransporter> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTransporter[]>): HttpResponse<ITransporter[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
