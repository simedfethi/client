import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmDaira } from '../crm-daira.model';
import { CrmDairaService } from '../service/crm-daira.service';

@Injectable({ providedIn: 'root' })
export class CrmDairaRoutingResolveService implements Resolve<ICrmDaira | null> {
  constructor(protected service: CrmDairaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmDaira | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmDaira: HttpResponse<ICrmDaira>) => {
          if (crmDaira.body) {
            return of(crmDaira.body);
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
