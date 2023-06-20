import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmDocumentLine, NewCrmDocumentLine } from '../crm-document-line.model';

export type PartialUpdateCrmDocumentLine = Partial<ICrmDocumentLine> & Pick<ICrmDocumentLine, 'id'>;

export type EntityResponseType = HttpResponse<ICrmDocumentLine>;
export type EntityArrayResponseType = HttpResponse<ICrmDocumentLine[]>;

@Injectable({ providedIn: 'root' })
export class CrmDocumentLineService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-document-lines');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmDocumentLine: NewCrmDocumentLine): Observable<EntityResponseType> {
    return this.http.post<ICrmDocumentLine>(this.resourceUrl, crmDocumentLine, { observe: 'response' });
  }

  update(crmDocumentLine: ICrmDocumentLine): Observable<EntityResponseType> {
    return this.http.put<ICrmDocumentLine>(`${this.resourceUrl}/${this.getCrmDocumentLineIdentifier(crmDocumentLine)}`, crmDocumentLine, {
      observe: 'response',
    });
  }

  partialUpdate(crmDocumentLine: PartialUpdateCrmDocumentLine): Observable<EntityResponseType> {
    return this.http.patch<ICrmDocumentLine>(`${this.resourceUrl}/${this.getCrmDocumentLineIdentifier(crmDocumentLine)}`, crmDocumentLine, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmDocumentLine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmDocumentLine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmDocumentLineIdentifier(crmDocumentLine: Pick<ICrmDocumentLine, 'id'>): number {
    return crmDocumentLine.id;
  }

  compareCrmDocumentLine(o1: Pick<ICrmDocumentLine, 'id'> | null, o2: Pick<ICrmDocumentLine, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmDocumentLineIdentifier(o1) === this.getCrmDocumentLineIdentifier(o2) : o1 === o2;
  }

  addCrmDocumentLineToCollectionIfMissing<Type extends Pick<ICrmDocumentLine, 'id'>>(
    crmDocumentLineCollection: Type[],
    ...crmDocumentLinesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmDocumentLines: Type[] = crmDocumentLinesToCheck.filter(isPresent);
    if (crmDocumentLines.length > 0) {
      const crmDocumentLineCollectionIdentifiers = crmDocumentLineCollection.map(
        crmDocumentLineItem => this.getCrmDocumentLineIdentifier(crmDocumentLineItem)!
      );
      const crmDocumentLinesToAdd = crmDocumentLines.filter(crmDocumentLineItem => {
        const crmDocumentLineIdentifier = this.getCrmDocumentLineIdentifier(crmDocumentLineItem);
        if (crmDocumentLineCollectionIdentifiers.includes(crmDocumentLineIdentifier)) {
          return false;
        }
        crmDocumentLineCollectionIdentifiers.push(crmDocumentLineIdentifier);
        return true;
      });
      return [...crmDocumentLinesToAdd, ...crmDocumentLineCollection];
    }
    return crmDocumentLineCollection;
  }
}
