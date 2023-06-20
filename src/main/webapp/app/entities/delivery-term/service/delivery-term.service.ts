import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDeliveryTerm, NewDeliveryTerm } from '../delivery-term.model';

export type PartialUpdateDeliveryTerm = Partial<IDeliveryTerm> & Pick<IDeliveryTerm, 'id'>;

export type EntityResponseType = HttpResponse<IDeliveryTerm>;
export type EntityArrayResponseType = HttpResponse<IDeliveryTerm[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryTermService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/delivery-terms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(deliveryTerm: NewDeliveryTerm): Observable<EntityResponseType> {
    return this.http.post<IDeliveryTerm>(this.resourceUrl, deliveryTerm, { observe: 'response' });
  }

  update(deliveryTerm: IDeliveryTerm): Observable<EntityResponseType> {
    return this.http.put<IDeliveryTerm>(`${this.resourceUrl}/${this.getDeliveryTermIdentifier(deliveryTerm)}`, deliveryTerm, {
      observe: 'response',
    });
  }

  partialUpdate(deliveryTerm: PartialUpdateDeliveryTerm): Observable<EntityResponseType> {
    return this.http.patch<IDeliveryTerm>(`${this.resourceUrl}/${this.getDeliveryTermIdentifier(deliveryTerm)}`, deliveryTerm, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeliveryTerm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeliveryTerm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDeliveryTermIdentifier(deliveryTerm: Pick<IDeliveryTerm, 'id'>): number {
    return deliveryTerm.id;
  }

  compareDeliveryTerm(o1: Pick<IDeliveryTerm, 'id'> | null, o2: Pick<IDeliveryTerm, 'id'> | null): boolean {
    return o1 && o2 ? this.getDeliveryTermIdentifier(o1) === this.getDeliveryTermIdentifier(o2) : o1 === o2;
  }

  addDeliveryTermToCollectionIfMissing<Type extends Pick<IDeliveryTerm, 'id'>>(
    deliveryTermCollection: Type[],
    ...deliveryTermsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const deliveryTerms: Type[] = deliveryTermsToCheck.filter(isPresent);
    if (deliveryTerms.length > 0) {
      const deliveryTermCollectionIdentifiers = deliveryTermCollection.map(
        deliveryTermItem => this.getDeliveryTermIdentifier(deliveryTermItem)!
      );
      const deliveryTermsToAdd = deliveryTerms.filter(deliveryTermItem => {
        const deliveryTermIdentifier = this.getDeliveryTermIdentifier(deliveryTermItem);
        if (deliveryTermCollectionIdentifiers.includes(deliveryTermIdentifier)) {
          return false;
        }
        deliveryTermCollectionIdentifiers.push(deliveryTermIdentifier);
        return true;
      });
      return [...deliveryTermsToAdd, ...deliveryTermCollection];
    }
    return deliveryTermCollection;
  }
}
