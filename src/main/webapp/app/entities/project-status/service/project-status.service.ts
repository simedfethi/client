import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProjectStatus, NewProjectStatus } from '../project-status.model';

export type PartialUpdateProjectStatus = Partial<IProjectStatus> & Pick<IProjectStatus, 'id'>;

export type EntityResponseType = HttpResponse<IProjectStatus>;
export type EntityArrayResponseType = HttpResponse<IProjectStatus[]>;

@Injectable({ providedIn: 'root' })
export class ProjectStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/project-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(projectStatus: NewProjectStatus): Observable<EntityResponseType> {
    return this.http.post<IProjectStatus>(this.resourceUrl, projectStatus, { observe: 'response' });
  }

  update(projectStatus: IProjectStatus): Observable<EntityResponseType> {
    return this.http.put<IProjectStatus>(`${this.resourceUrl}/${this.getProjectStatusIdentifier(projectStatus)}`, projectStatus, {
      observe: 'response',
    });
  }

  partialUpdate(projectStatus: PartialUpdateProjectStatus): Observable<EntityResponseType> {
    return this.http.patch<IProjectStatus>(`${this.resourceUrl}/${this.getProjectStatusIdentifier(projectStatus)}`, projectStatus, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProjectStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProjectStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProjectStatusIdentifier(projectStatus: Pick<IProjectStatus, 'id'>): number {
    return projectStatus.id;
  }

  compareProjectStatus(o1: Pick<IProjectStatus, 'id'> | null, o2: Pick<IProjectStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getProjectStatusIdentifier(o1) === this.getProjectStatusIdentifier(o2) : o1 === o2;
  }

  addProjectStatusToCollectionIfMissing<Type extends Pick<IProjectStatus, 'id'>>(
    projectStatusCollection: Type[],
    ...projectStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const projectStatuses: Type[] = projectStatusesToCheck.filter(isPresent);
    if (projectStatuses.length > 0) {
      const projectStatusCollectionIdentifiers = projectStatusCollection.map(
        projectStatusItem => this.getProjectStatusIdentifier(projectStatusItem)!
      );
      const projectStatusesToAdd = projectStatuses.filter(projectStatusItem => {
        const projectStatusIdentifier = this.getProjectStatusIdentifier(projectStatusItem);
        if (projectStatusCollectionIdentifiers.includes(projectStatusIdentifier)) {
          return false;
        }
        projectStatusCollectionIdentifiers.push(projectStatusIdentifier);
        return true;
      });
      return [...projectStatusesToAdd, ...projectStatusCollection];
    }
    return projectStatusCollection;
  }
}
