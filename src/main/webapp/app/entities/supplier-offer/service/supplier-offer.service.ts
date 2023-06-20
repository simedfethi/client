import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISupplierOffer, NewSupplierOffer } from '../supplier-offer.model';

export type PartialUpdateSupplierOffer = Partial<ISupplierOffer> & Pick<ISupplierOffer, 'id'>;

export type EntityResponseType = HttpResponse<ISupplierOffer>;
export type EntityArrayResponseType = HttpResponse<ISupplierOffer[]>;

@Injectable({ providedIn: 'root' })
export class SupplierOfferService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/supplier-offers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(supplierOffer: NewSupplierOffer): Observable<EntityResponseType> {
    return this.http.post<ISupplierOffer>(this.resourceUrl, supplierOffer, { observe: 'response' });
  }

  update(supplierOffer: ISupplierOffer): Observable<EntityResponseType> {
    return this.http.put<ISupplierOffer>(`${this.resourceUrl}/${this.getSupplierOfferIdentifier(supplierOffer)}`, supplierOffer, {
      observe: 'response',
    });
  }

  partialUpdate(supplierOffer: PartialUpdateSupplierOffer): Observable<EntityResponseType> {
    return this.http.patch<ISupplierOffer>(`${this.resourceUrl}/${this.getSupplierOfferIdentifier(supplierOffer)}`, supplierOffer, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISupplierOffer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupplierOffer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSupplierOfferIdentifier(supplierOffer: Pick<ISupplierOffer, 'id'>): number {
    return supplierOffer.id;
  }

  compareSupplierOffer(o1: Pick<ISupplierOffer, 'id'> | null, o2: Pick<ISupplierOffer, 'id'> | null): boolean {
    return o1 && o2 ? this.getSupplierOfferIdentifier(o1) === this.getSupplierOfferIdentifier(o2) : o1 === o2;
  }

  addSupplierOfferToCollectionIfMissing<Type extends Pick<ISupplierOffer, 'id'>>(
    supplierOfferCollection: Type[],
    ...supplierOffersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const supplierOffers: Type[] = supplierOffersToCheck.filter(isPresent);
    if (supplierOffers.length > 0) {
      const supplierOfferCollectionIdentifiers = supplierOfferCollection.map(
        supplierOfferItem => this.getSupplierOfferIdentifier(supplierOfferItem)!
      );
      const supplierOffersToAdd = supplierOffers.filter(supplierOfferItem => {
        const supplierOfferIdentifier = this.getSupplierOfferIdentifier(supplierOfferItem);
        if (supplierOfferCollectionIdentifiers.includes(supplierOfferIdentifier)) {
          return false;
        }
        supplierOfferCollectionIdentifiers.push(supplierOfferIdentifier);
        return true;
      });
      return [...supplierOffersToAdd, ...supplierOfferCollection];
    }
    return supplierOfferCollection;
  }
}
