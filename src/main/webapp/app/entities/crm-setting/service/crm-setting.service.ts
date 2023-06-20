import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrmSetting, NewCrmSetting } from '../crm-setting.model';

export type PartialUpdateCrmSetting = Partial<ICrmSetting> & Pick<ICrmSetting, 'id'>;

export type EntityResponseType = HttpResponse<ICrmSetting>;
export type EntityArrayResponseType = HttpResponse<ICrmSetting[]>;

@Injectable({ providedIn: 'root' })
export class CrmSettingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crm-settings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crmSetting: NewCrmSetting): Observable<EntityResponseType> {
    return this.http.post<ICrmSetting>(this.resourceUrl, crmSetting, { observe: 'response' });
  }

  update(crmSetting: ICrmSetting): Observable<EntityResponseType> {
    return this.http.put<ICrmSetting>(`${this.resourceUrl}/${this.getCrmSettingIdentifier(crmSetting)}`, crmSetting, {
      observe: 'response',
    });
  }

  partialUpdate(crmSetting: PartialUpdateCrmSetting): Observable<EntityResponseType> {
    return this.http.patch<ICrmSetting>(`${this.resourceUrl}/${this.getCrmSettingIdentifier(crmSetting)}`, crmSetting, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrmSetting>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrmSetting[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCrmSettingIdentifier(crmSetting: Pick<ICrmSetting, 'id'>): number {
    return crmSetting.id;
  }

  compareCrmSetting(o1: Pick<ICrmSetting, 'id'> | null, o2: Pick<ICrmSetting, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrmSettingIdentifier(o1) === this.getCrmSettingIdentifier(o2) : o1 === o2;
  }

  addCrmSettingToCollectionIfMissing<Type extends Pick<ICrmSetting, 'id'>>(
    crmSettingCollection: Type[],
    ...crmSettingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crmSettings: Type[] = crmSettingsToCheck.filter(isPresent);
    if (crmSettings.length > 0) {
      const crmSettingCollectionIdentifiers = crmSettingCollection.map(crmSettingItem => this.getCrmSettingIdentifier(crmSettingItem)!);
      const crmSettingsToAdd = crmSettings.filter(crmSettingItem => {
        const crmSettingIdentifier = this.getCrmSettingIdentifier(crmSettingItem);
        if (crmSettingCollectionIdentifiers.includes(crmSettingIdentifier)) {
          return false;
        }
        crmSettingCollectionIdentifiers.push(crmSettingIdentifier);
        return true;
      });
      return [...crmSettingsToAdd, ...crmSettingCollection];
    }
    return crmSettingCollection;
  }
}
