import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITransportUnit } from '../transport-unit.model';
import { TransportUnitService } from '../service/transport-unit.service';

@Injectable({ providedIn: 'root' })
export class TransportUnitRoutingResolveService implements Resolve<ITransportUnit | null> {
  constructor(protected service: TransportUnitService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransportUnit | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((transportUnit: HttpResponse<ITransportUnit>) => {
          if (transportUnit.body) {
            return of(transportUnit.body);
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
