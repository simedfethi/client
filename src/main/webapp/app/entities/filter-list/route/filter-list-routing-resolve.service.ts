import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFilterList } from '../filter-list.model';
import { FilterListService } from '../service/filter-list.service';

@Injectable({ providedIn: 'root' })
export class FilterListRoutingResolveService implements Resolve<IFilterList | null> {
  constructor(protected service: FilterListService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFilterList | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((filterList: HttpResponse<IFilterList>) => {
          if (filterList.body) {
            return of(filterList.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
