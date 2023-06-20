import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmPermission } from '../crm-permission.model';
import { CrmPermissionService } from '../service/crm-permission.service';

@Injectable({ providedIn: 'root' })
export class CrmPermissionRoutingResolveService implements Resolve<ICrmPermission | null> {
  constructor(protected service: CrmPermissionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmPermission | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmPermission: HttpResponse<ICrmPermission>) => {
          if (crmPermission.body) {
            return of(crmPermission.body);
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
