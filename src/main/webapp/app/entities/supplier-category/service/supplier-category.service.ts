import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISupplierCategory, NewSupplierCategory } from '../supplier-category.model';

export type PartialUpdateSupplierCategory = Partial<ISupplierCategory> & Pick<ISupplierCategory, 'id'>;

export type EntityResponseType = HttpResponse<ISupplierCategory>;
export type EntityArrayResponseType = HttpResponse<ISupplierCategory[]>;

@Injectable({ providedIn: 'root' })
export class SupplierCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/supplier-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(supplierCategory: NewSupplierCategory): Observable<EntityResponseType> {
    return this.http.post<ISupplierCategory>(this.resourceUrl, supplierCategory, { observe: 'response' });
  }

  update(supplierCategory: ISupplierCategory): Observable<EntityResponseType> {
    return this.http.put<ISupplierCategory>(
      `${this.resourceUrl}/${this.getSupplierCategoryIdentifier(supplierCategory)}`,
      supplierCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(supplierCategory: PartialUpdateSupplierCategory): Observable<EntityResponseType> {
    return this.http.patch<ISupplierCategory>(
      `${this.resourceUrl}/${this.getSupplierCategoryIdentifier(supplierCategory)}`,
      supplierCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISupplierCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupplierCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSupplierCategoryIdentifier(supplierCategory: Pick<ISupplierCategory, 'id'>): number {
    return supplierCategory.id;
  }

  compareSupplierCategory(o1: Pick<ISupplierCategory, 'id'> | null, o2: Pick<ISupplierCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getSupplierCategoryIdentifier(o1) === this.getSupplierCategoryIdentifier(o2) : o1 === o2;
  }

  addSupplierCategoryToCollectionIfMissing<Type extends Pick<ISupplierCategory, 'id'>>(
    supplierCategoryCollection: Type[],
    ...supplierCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const supplierCategories: Type[] = supplierCategoriesToCheck.filter(isPresent);
    if (supplierCategories.length > 0) {
      const supplierCategoryCollectionIdentifiers = supplierCategoryCollection.map(
        supplierCategoryItem => this.getSupplierCategoryIdentifier(supplierCategoryItem)!
      );
      const supplierCategoriesToAdd = supplierCategories.filter(supplierCategoryItem => {
        const supplierCategoryIdentifier = this.getSupplierCategoryIdentifier(supplierCategoryItem);
        if (supplierCategoryCollectionIdentifiers.includes(supplierCategoryIdentifier)) {
          return false;
        }
        supplierCategoryCollectionIdentifiers.push(supplierCategoryIdentifier);
        return true;
      });
      return [...supplierCategoriesToAdd, ...supplierCategoryCollection];
    }
    return supplierCategoryCollection;
  }
}
