import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmDocument, NewCrmDocument } from '../crm-document.model';

export type PartialUpdateCrmDocument = Partial<ICrmDocument> & Pick<ICrmDocument, 'id'>;

type RestOf<T extends ICrmDocument | NewCrmDocument> = Omit<T, 'cretedDate' | 'updateDate'> & {
  cretedDate?: string | null;
  updateDate?: string | null;
};

export type RestCrmDocument = RestOf<ICrmDocument>;

export type NewRestCrmDocument = RestOf<NewCrmDocument>;

export type PartialUpdateRestCrmDocument = RestOf<PartialUpdateCrmDocument>;

export type EntityResponseType = HttpResponse<ICrmDocument>;
export type EntityArrayResponseType = HttpResponse<ICrmDocument[]>;

@Injectable({ providedIn: 'root' })
export class CrmDocumentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-documents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmDocument: NewCrmDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(crmDocument);
    return this.http
      .post<RestCrmDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(crmDocument: ICrmDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(crmDocument);
    return this.http
      .put<RestCrmDocument>(`${this.resourceUrl}/${this.getCrmDocumentIdentifier(crmDocument)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(crmDocument: PartialUpdateCrmDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(crmDocument);
    return this.http
      .patch<RestCrmDocument>(`${this.resourceUrl}/${this.getCrmDocumentIdentifier(crmDocument)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCrmDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCrmDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmDocumentIdentifier(crmDocument: Pick<ICrmDocument, 'id'>): number {
    return crmDocument.id;
  }

  compareCrmDocument(o1: Pick<ICrmDocument, 'id'> | null, o2: Pick<ICrmDocument, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmDocumentIdentifier(o1) === this.getCrmDocumentIdentifier(o2) : o1 === o2;
  }

  addCrmDocumentToCollectionIfMissing<Type extends Pick<ICrmDocument, 'id'>>(
    crmDocumentCollection: Type[],
    ...crmDocumentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmDocuments: Type[] = crmDocumentsToCheck.filter(isPresent);
    if (crmDocuments.length > 0) {
      const crmDocumentCollectionIdentifiers = crmDocumentCollection.map(
        crmDocumentItem => this.getCrmDocumentIdentifier(crmDocumentItem)!
      );
      const crmDocumentsToAdd = crmDocuments.filter(crmDocumentItem => {
        const crmDocumentIdentifier = this.getCrmDocumentIdentifier(crmDocumentItem);
        if (crmDocumentCollectionIdentifiers.includes(crmDocumentIdentifier)) {
          return false;
        }
        crmDocumentCollectionIdentifiers.push(crmDocumentIdentifier);
        return true;
      });
      return [...crmDocumentsToAdd, ...crmDocumentCollection];
    }
    return crmDocumentCollection;
  }

  convertDateFromClient<T extends ICrmDocument | NewCrmDocument | PartialUpdateCrmDocument>(crmDocument: T): RestOf<T> {
    return {
      ...crmDocument,
      cretedDate: crmDocument.cretedDate?.toJSON() ?? null,
      updateDate: crmDocument.updateDate?.toJSON() ?? null,
    };
  }

  convertDateFromServer(restCrmDocument: RestCrmDocument): ICrmDocument {
    return {
      ...restCrmDocument,
      cretedDate: restCrmDocument.cretedDate ? dayjs(restCrmDocument.cretedDate) : undefined,
      updateDate: restCrmDocument.updateDate ? dayjs(restCrmDocument.updateDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCrmDocument>): HttpResponse<ICrmDocument> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCrmDocument[]>): HttpResponse<ICrmDocument[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
