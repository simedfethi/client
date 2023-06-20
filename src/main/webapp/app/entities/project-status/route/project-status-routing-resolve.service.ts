import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProjectStatus } from '../project-status.model';
import { ProjectStatusService } from '../service/project-status.service';

@Injectable({ providedIn: 'root' })
export class ProjectStatusRoutingResolveService implements Resolve<IProjectStatus | null> {
  constructor(protected service: ProjectStatusService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProjectStatus | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((projectStatus: HttpResponse<IProjectStatus>) => {
          if (projectStatus.body) {
            return of(projectStatus.body);
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
