import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmDocType } from '../crm-doc-type.model';
import { CrmDocTypeService } from '../service/crm-doc-type.service';

@Injectable({ providedIn: 'root' })
export class CrmDocTypeRoutingResolveService implements Resolve<ICrmDocType | null> {
  constructor(protected service: CrmDocTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmDocType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmDocType: HttpResponse<ICrmDocType>) => {
          if (crmDocType.body) {
            return of(crmDocType.body);
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
