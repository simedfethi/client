import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmConcurrent } from '../crm-concurrent.model';
import { CrmConcurrentService } from '../service/crm-concurrent.service';

@Injectable({ providedIn: 'root' })
export class CrmConcurrentRoutingResolveService implements Resolve<ICrmConcurrent | null> {
  constructor(protected service: CrmConcurrentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmConcurrent | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmConcurrent: HttpResponse<ICrmConcurrent>) => {
          if (crmConcurrent.body) {
            return of(crmConcurrent.body);
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
