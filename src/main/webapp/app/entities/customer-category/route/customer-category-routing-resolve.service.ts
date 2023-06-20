import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICustomerCategory } from '../customer-category.model';
import { CustomerCategoryService } from '../service/customer-category.service';

@Injectable({ providedIn: 'root' })
export class CustomerCategoryRoutingResolveService implements Resolve<ICustomerCategory | null> {
  constructor(protected service: CustomerCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((customerCategory: HttpResponse<ICustomerCategory>) => {
          if (customerCategory.body) {
            return of(customerCategory.body);
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
