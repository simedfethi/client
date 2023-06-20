import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmCOntactSource } from '../crm-c-ontact-source.model';
import { CrmCOntactSourceService } from '../service/crm-c-ontact-source.service';

@Injectable({ providedIn: 'root' })
export class CrmCOntactSourceRoutingResolveService implements Resolve<ICrmCOntactSource | null> {
  constructor(protected service: CrmCOntactSourceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmCOntactSource | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmCOntactSource: HttpResponse<ICrmCOntactSource>) => {
          if (crmCOntactSource.body) {
            return of(crmCOntactSource.body);
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
