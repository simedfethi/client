import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProductvariante, NewProductvariante } from '../productvariante.model';

export type PartialUpdateProductvariante = Partial<IProductvariante> & Pick<IProductvariante, 'id'>;

export type EntityResponseType = HttpResponse<IProductvariante>;
export type EntityArrayResponseType = HttpResponse<IProductvariante[]>;

@Injectable({ providedIn: 'root' })
export class ProductvarianteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/productvariantes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(productvariante: NewProductvariante): Observable<EntityResponseType> {
    return this.http.post<IProductvariante>(this.resourceUrl, productvariante, { observe: 'response' });
  }

  update(productvariante: IProductvariante): Observable<EntityResponseType> {
    return this.http.put<IProductvariante>(`${this.resourceUrl}/${this.getProductvarianteIdentifier(productvariante)}`, productvariante, {
      observe: 'response',
    });
  }

  partialUpdate(productvariante: PartialUpdateProductvariante): Observable<EntityResponseType> {
    return this.http.patch<IProductvariante>(`${this.resourceUrl}/${this.getProductvarianteIdentifier(productvariante)}`, productvariante, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductvariante>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductvariante[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProductvarianteIdentifier(productvariante: Pick<IProductvariante, 'id'>): number {
    return productvariante.id;
  }

  compareProductvariante(o1: Pick<IProductvariante, 'id'> | null, o2: Pick<IProductvariante, 'id'> | null): boolean {
    return o1 && o2 ? this.getProductvarianteIdentifier(o1) === this.getProductvarianteIdentifier(o2) : o1 === o2;
  }

  addProductvarianteToCollectionIfMissing<Type extends Pick<IProductvariante, 'id'>>(
    productvarianteCollection: Type[],
    ...productvariantesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const productvariantes: Type[] = productvariantesToCheck.filter(isPresent);
    if (productvariantes.length > 0) {
      const productvarianteCollectionIdentifiers = productvarianteCollection.map(
        productvarianteItem => this.getProductvarianteIdentifier(productvarianteItem)!
      );
      const productvariantesToAdd = productvariantes.filter(productvarianteItem => {
        const productvarianteIdentifier = this.getProductvarianteIdentifier(productvarianteItem);
        if (productvarianteCollectionIdentifiers.includes(productvarianteIdentifier)) {
          return false;
        }
        productvarianteCollectionIdentifiers.push(productvarianteIdentifier);
        return true;
      });
      return [...productvariantesToAdd, ...productvarianteCollection];
    }
    return productvarianteCollection;
  }
}
