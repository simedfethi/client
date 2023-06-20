import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAffaireCategory, NewAffaireCategory } from '../affaire-category.model';

export type PartialUpdateAffaireCategory = Partial<IAffaireCategory> & Pick<IAffaireCategory, 'id'>;

export type EntityResponseType = HttpResponse<IAffaireCategory>;
export type EntityArrayResponseType = HttpResponse<IAffaireCategory[]>;

@Injectable({ providedIn: 'root' })
export class AffaireCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/affaire-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(affaireCategory: NewAffaireCategory): Observable<EntityResponseType> {
    return this.http.post<IAffaireCategory>(this.resourceUrl, affaireCategory, { observe: 'response' });
  }

  update(affaireCategory: IAffaireCategory): Observable<EntityResponseType> {
    return this.http.put<IAffaireCategory>(`${this.resourceUrl}/${this.getAffaireCategoryIdentifier(affaireCategory)}`, affaireCategory, {
      observe: 'response',
    });
  }

  partialUpdate(affaireCategory: PartialUpdateAffaireCategory): Observable<EntityResponseType> {
    return this.http.patch<IAffaireCategory>(`${this.resourceUrl}/${this.getAffaireCategoryIdentifier(affaireCategory)}`, affaireCategory, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAffaireCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAffaireCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAffaireCategoryIdentifier(affaireCategory: Pick<IAffaireCategory, 'id'>): number {
    return affaireCategory.id;
  }

  compareAffaireCategory(o1: Pick<IAffaireCategory, 'id'> | null, o2: Pick<IAffaireCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getAffaireCategoryIdentifier(o1) === this.getAffaireCategoryIdentifier(o2) : o1 === o2;
  }

  addAffaireCategoryToCollectionIfMissing<Type extends Pick<IAffaireCategory, 'id'>>(
    affaireCategoryCollection: Type[],
    ...affaireCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const affaireCategories: Type[] = affaireCategoriesToCheck.filter(isPresent);
    if (affaireCategories.length > 0) {
      const affaireCategoryCollectionIdentifiers = affaireCategoryCollection.map(
        affaireCategoryItem => this.getAffaireCategoryIdentifier(affaireCategoryItem)!
      );
      const affaireCategoriesToAdd = affaireCategories.filter(affaireCategoryItem => {
        const affaireCategoryIdentifier = this.getAffaireCategoryIdentifier(affaireCategoryItem);
        if (affaireCategoryCollectionIdentifiers.includes(affaireCategoryIdentifier)) {
          return false;
        }
        affaireCategoryCollectionIdentifiers.push(affaireCategoryIdentifier);
        return true;
      });
      return [...affaireCategoriesToAdd, ...affaireCategoryCollection];
    }
    return affaireCategoryCollection;
  }
}
