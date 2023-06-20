import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISupplierCategory } from '../supplier-category.model';
import { SupplierCategoryService } from '../service/supplier-category.service';

@Injectable({ providedIn: 'root' })
export class SupplierCategoryRoutingResolveService implements Resolve<ISupplierCategory | null> {
  constructor(protected service: SupplierCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplierCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((supplierCategory: HttpResponse<ISupplierCategory>) => {
          if (supplierCategory.body) {
            return of(supplierCategory.body);
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
