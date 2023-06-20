import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUniteMesure, NewUniteMesure } from '../unite-mesure.model';

export type PartialUpdateUniteMesure = Partial<IUniteMesure> & Pick<IUniteMesure, 'id'>;

export type EntityResponseType = HttpResponse<IUniteMesure>;
export type EntityArrayResponseType = HttpResponse<IUniteMesure[]>;

@Injectable({ providedIn: 'root' })
export class UniteMesureService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/unite-mesures');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(uniteMesure: NewUniteMesure): Observable<EntityResponseType> {
    return this.http.post<IUniteMesure>(this.resourceUrl, uniteMesure, { observe: 'response' });
  }

  update(uniteMesure: IUniteMesure): Observable<EntityResponseType> {
    return this.http.put<IUniteMesure>(`${this.resourceUrl}/${this.getUniteMesureIdentifier(uniteMesure)}`, uniteMesure, {
      observe: 'response',
    });
  }

  partialUpdate(uniteMesure: PartialUpdateUniteMesure): Observable<EntityResponseType> {
    return this.http.patch<IUniteMesure>(`${this.resourceUrl}/${this.getUniteMesureIdentifier(uniteMesure)}`, uniteMesure, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUniteMesure>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUniteMesure[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUniteMesureIdentifier(uniteMesure: Pick<IUniteMesure, 'id'>): number {
    return uniteMesure.id;
  }

  compareUniteMesure(o1: Pick<IUniteMesure, 'id'> | null, o2: Pick<IUniteMesure, 'id'> | null): boolean {
    return o1 && o2 ? this.getUniteMesureIdentifier(o1) === this.getUniteMesureIdentifier(o2) : o1 === o2;
  }

  addUniteMesureToCollectionIfMissing<Type extends Pick<IUniteMesure, 'id'>>(
    uniteMesureCollection: Type[],
    ...uniteMesuresToCheck: (Type | null | undefined)[]
  ): Type[] {
    const uniteMesures: Type[] = uniteMesuresToCheck.filter(isPresent);
    if (uniteMesures.length > 0) {
      const uniteMesureCollectionIdentifiers = uniteMesureCollection.map(
        uniteMesureItem => this.getUniteMesureIdentifier(uniteMesureItem)!
      );
      const uniteMesuresToAdd = uniteMesures.filter(uniteMesureItem => {
        const uniteMesureIdentifier = this.getUniteMesureIdentifier(uniteMesureItem);
        if (uniteMesureCollectionIdentifiers.includes(uniteMesureIdentifier)) {
          return false;
        }
        uniteMesureCollectionIdentifiers.push(uniteMesureIdentifier);
        return true;
      });
      return [...uniteMesuresToAdd, ...uniteMesureCollection];
    }
    return uniteMesureCollection;
  }
}
