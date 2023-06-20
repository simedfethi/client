import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployerNumber } from '../employer-number.model';
import { EmployerNumberService } from '../service/employer-number.service';

@Injectable({ providedIn: 'root' })
export class EmployerNumberRoutingResolveService implements Resolve<IEmployerNumber | null> {
  constructor(protected service: EmployerNumberService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployerNumber | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((employerNumber: HttpResponse<IEmployerNumber>) => {
          if (employerNumber.body) {
            return of(employerNumber.body);
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
