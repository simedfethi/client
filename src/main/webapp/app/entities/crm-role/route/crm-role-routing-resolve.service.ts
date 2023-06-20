import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmRole } from '../crm-role.model';
import { CrmRoleService } from '../service/crm-role.service';

@Injectable({ providedIn: 'root' })
export class CrmRoleRoutingResolveService implements Resolve<ICrmRole | null> {
  constructor(protected service: CrmRoleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmRole | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmRole: HttpResponse<ICrmRole>) => {
          if (crmRole.body) {
            return of(crmRole.body);
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
