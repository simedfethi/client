import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISupplier, NewSupplier } from '../supplier.model';

export type PartialUpdateSupplier = Partial<ISupplier> & Pick<ISupplier, 'id'>;

type RestOf<T extends ISupplier | NewSupplier> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

export type RestSupplier = RestOf<ISupplier>;

export type NewRestSupplier = RestOf<NewSupplier>;

export type PartialUpdateRestSupplier = RestOf<PartialUpdateSupplier>;

export type EntityResponseType = HttpResponse<ISupplier>;
export type EntityArrayResponseType = HttpResponse<ISupplier[]>;

@Injectable({ providedIn: 'root' })
export class SupplierService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/suppliers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(supplier: NewSupplier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supplier);
    return this.http
      .post<RestSupplier>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(supplier: ISupplier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supplier);
    return this.http
      .put<RestSupplier>(`${this.resourceUrl}/${this.getSupplierIdentifier(supplier)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(supplier: PartialUpdateSupplier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supplier);
    return this.http
      .patch<RestSupplier>(`${this.resourceUrl}/${this.getSupplierIdentifier(supplier)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSupplier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSupplier[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSupplierIdentifier(supplier: Pick<ISupplier, 'id'>): number {
    return supplier.id;
  }

  compareSupplier(o1: Pick<ISupplier, 'id'> | null, o2: Pick<ISupplier, 'id'> | null): boolean {
    return o1 && o2 ? this.getSupplierIdentifier(o1) === this.getSupplierIdentifier(o2) : o1 === o2;
  }

  addSupplierToCollectionIfMissing<Type extends Pick<ISupplier, 'id'>>(
    supplierCollection: Type[],
    ...suppliersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const suppliers: Type[] = suppliersToCheck.filter(isPresent);
    if (suppliers.length > 0) {
      const supplierCollectionIdentifiers = supplierCollection.map(supplierItem => this.getSupplierIdentifier(supplierItem)!);
      const suppliersToAdd = suppliers.filter(supplierItem => {
        const supplierIdentifier = this.getSupplierIdentifier(supplierItem);
        if (supplierCollectionIdentifiers.includes(supplierIdentifier)) {
          return false;
        }
        supplierCollectionIdentifiers.push(supplierIdentifier);
        return true;
      });
      return [...suppliersToAdd, ...supplierCollection];
    }
    return supplierCollection;
  }

  protected convertDateFromClient<T extends ISupplier | NewSupplier | PartialUpdateSupplier>(supplier: T): RestOf<T> {
    return {
      ...supplier,
      createdAt: supplier.createdAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSupplier: RestSupplier): ISupplier {
    return {
      ...restSupplier,
      createdAt: restSupplier.createdAt ? dayjs(restSupplier.createdAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSupplier>): HttpResponse<ISupplier> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSupplier[]>): HttpResponse<ISupplier[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
