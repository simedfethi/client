import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmailTemplate, NewEmailTemplate } from '../email-template.model';

export type PartialUpdateEmailTemplate = Partial<IEmailTemplate> & Pick<IEmailTemplate, 'id'>;

type RestOf<T extends IEmailTemplate | NewEmailTemplate> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

export type RestEmailTemplate = RestOf<IEmailTemplate>;

export type NewRestEmailTemplate = RestOf<NewEmailTemplate>;

export type PartialUpdateRestEmailTemplate = RestOf<PartialUpdateEmailTemplate>;

export type EntityResponseType = HttpResponse<IEmailTemplate>;
export type EntityArrayResponseType = HttpResponse<IEmailTemplate[]>;

@Injectable({ providedIn: 'root' })
export class EmailTemplateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/email-templates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(emailTemplate: NewEmailTemplate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(emailTemplate);
    return this.http
      .post<RestEmailTemplate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(emailTemplate: IEmailTemplate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(emailTemplate);
    return this.http
      .put<RestEmailTemplate>(`${this.resourceUrl}/${this.getEmailTemplateIdentifier(emailTemplate)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(emailTemplate: PartialUpdateEmailTemplate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(emailTemplate);
    return this.http
      .patch<RestEmailTemplate>(`${this.resourceUrl}/${this.getEmailTemplateIdentifier(emailTemplate)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEmailTemplate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEmailTemplate[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEmailTemplateIdentifier(emailTemplate: Pick<IEmailTemplate, 'id'>): number {
    return emailTemplate.id;
  }

  compareEmailTemplate(o1: Pick<IEmailTemplate, 'id'> | null, o2: Pick<IEmailTemplate, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmailTemplateIdentifier(o1) === this.getEmailTemplateIdentifier(o2) : o1 === o2;
  }

  addEmailTemplateToCollectionIfMissing<Type extends Pick<IEmailTemplate, 'id'>>(
    emailTemplateCollection: Type[],
    ...emailTemplatesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const emailTemplates: Type[] = emailTemplatesToCheck.filter(isPresent);
    if (emailTemplates.length > 0) {
      const emailTemplateCollectionIdentifiers = emailTemplateCollection.map(
        emailTemplateItem => this.getEmailTemplateIdentifier(emailTemplateItem)!
      );
      const emailTemplatesToAdd = emailTemplates.filter(emailTemplateItem => {
        const emailTemplateIdentifier = this.getEmailTemplateIdentifier(emailTemplateItem);
        if (emailTemplateCollectionIdentifiers.includes(emailTemplateIdentifier)) {
          return false;
        }
        emailTemplateCollectionIdentifiers.push(emailTemplateIdentifier);
        return true;
      });
      return [...emailTemplatesToAdd, ...emailTemplateCollection];
    }
    return emailTemplateCollection;
  }

  protected convertDateFromClient<T extends IEmailTemplate | NewEmailTemplate | PartialUpdateEmailTemplate>(emailTemplate: T): RestOf<T> {
    return {
      ...emailTemplate,
      createdAt: emailTemplate.createdAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restEmailTemplate: RestEmailTemplate): IEmailTemplate {
    return {
      ...restEmailTemplate,
      createdAt: restEmailTemplate.createdAt ? dayjs(restEmailTemplate.createdAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEmailTemplate>): HttpResponse<IEmailTemplate> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEmailTemplate[]>): HttpResponse<IEmailTemplate[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
