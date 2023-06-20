import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICustomerCategory, NewCustomerCategory } from '../customer-category.model';

export type PartialUpdateCustomerCategory = Partial<ICustomerCategory> & Pick<ICustomerCategory, 'id'>;

export type EntityResponseType = HttpResponse<ICustomerCategory>;
export type EntityArrayResponseType = HttpResponse<ICustomerCategory[]>;

@Injectable({ providedIn: 'root' })
export class CustomerCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/customer-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(customerCategory: NewCustomerCategory): Observable<EntityResponseType> {
    return this.http.post<ICustomerCategory>(this.resourceUrl, customerCategory, { observe: 'response' });
  }

  update(customerCategory: ICustomerCategory): Observable<EntityResponseType> {
    return this.http.put<ICustomerCategory>(
      `${this.resourceUrl}/${this.getCustomerCategoryIdentifier(customerCategory)}`,
      customerCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(customerCategory: PartialUpdateCustomerCategory): Observable<EntityResponseType> {
    return this.http.patch<ICustomerCategory>(
      `${this.resourceUrl}/${this.getCustomerCategoryIdentifier(customerCategory)}`,
      customerCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCustomerCategoryIdentifier(customerCategory: Pick<ICustomerCategory, 'id'>): number {
    return customerCategory.id;
  }

  compareCustomerCategory(o1: Pick<ICustomerCategory, 'id'> | null, o2: Pick<ICustomerCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getCustomerCategoryIdentifier(o1) === this.getCustomerCategoryIdentifier(o2) : o1 === o2;
  }

  addCustomerCategoryToCollectionIfMissing<Type extends Pick<ICustomerCategory, 'id'>>(
    customerCategoryCollection: Type[],
    ...customerCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const customerCategories: Type[] = customerCategoriesToCheck.filter(isPresent);
    if (customerCategories.length > 0) {
      const customerCategoryCollectionIdentifiers = customerCategoryCollection.map(
        customerCategoryItem => this.getCustomerCategoryIdentifier(customerCategoryItem)!
      );
      const customerCategoriesToAdd = customerCategories.filter(customerCategoryItem => {
        const customerCategoryIdentifier = this.getCustomerCategoryIdentifier(customerCategoryItem);
        if (customerCategoryCollectionIdentifiers.includes(customerCategoryIdentifier)) {
          return false;
        }
        customerCategoryCollectionIdentifiers.push(customerCategoryIdentifier);
        return true;
      });
      return [...customerCategoriesToAdd, ...customerCategoryCollection];
    }
    return customerCategoryCollection;
  }
}
