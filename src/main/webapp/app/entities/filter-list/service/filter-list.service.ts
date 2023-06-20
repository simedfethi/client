import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFilterList, NewFilterList } from '../filter-list.model';

export type PartialUpdateFilterList = Partial<IFilterList> & Pick<IFilterList, 'id'>;

export type EntityResponseType = HttpResponse<IFilterList>;
export type EntityArrayResponseType = HttpResponse<IFilterList[]>;

@Injectable({ providedIn: 'root' })
export class FilterListService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/filter-lists');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(filterList: NewFilterList): Observable<EntityResponseType> {
    return this.http.post<IFilterList>(this.resourceUrl, filterList, { observe: 'response' });
  }

  update(filterList: IFilterList): Observable<EntityResponseType> {
    return this.http.put<IFilterList>(`${this.resourceUrl}/${this.getFilterListIdentifier(filterList)}`, filterList, {
      observe: 'response',
    });
  }

  partialUpdate(filterList: PartialUpdateFilterList): Observable<EntityResponseType> {
    return this.http.patch<IFilterList>(`${this.resourceUrl}/${this.getFilterListIdentifier(filterList)}`, filterList, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFilterList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFilterList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFilterListIdentifier(filterList: Pick<IFilterList, 'id'>): number {
    return filterList.id;
  }

  compareFilterList(o1: Pick<IFilterList, 'id'> | null, o2: Pick<IFilterList, 'id'> | null): boolean {
    return o1 && o2 ? this.getFilterListIdentifier(o1) === this.getFilterListIdentifier(o2) : o1 === o2;
  }

  addFilterListToCollectionIfMissing<Type extends Pick<IFilterList, 'id'>>(
    filterListCollection: Type[],
    ...filterListsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const filterLists: Type[] = filterListsToCheck.filter(isPresent);
    if (filterLists.length > 0) {
      const filterListCollectionIdentifiers = filterListCollection.map(filterListItem => this.getFilterListIdentifier(filterListItem)!);
      const filterListsToAdd = filterLists.filter(filterListItem => {
        const filterListIdentifier = this.getFilterListIdentifier(filterListItem);
        if (filterListCollectionIdentifiers.includes(filterListIdentifier)) {
          return false;
        }
        filterListCollectionIdentifiers.push(filterListIdentifier);
        return true;
      });
      return [...filterListsToAdd, ...filterListCollection];
    }
    return filterListCollection;
  }
}
