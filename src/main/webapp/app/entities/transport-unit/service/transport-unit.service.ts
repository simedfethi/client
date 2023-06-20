import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITransportUnit, NewTransportUnit } from '../transport-unit.model';

export type PartialUpdateTransportUnit = Partial<ITransportUnit> & Pick<ITransportUnit, 'id'>;

export type EntityResponseType = HttpResponse<ITransportUnit>;
export type EntityArrayResponseType = HttpResponse<ITransportUnit[]>;

@Injectable({ providedIn: 'root' })
export class TransportUnitService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/transport-units');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(transportUnit: NewTransportUnit): Observable<EntityResponseType> {
    return this.http.post<ITransportUnit>(this.resourceUrl, transportUnit, { observe: 'response' });
  }

  update(transportUnit: ITransportUnit): Observable<EntityResponseType> {
    return this.http.put<ITransportUnit>(`${this.resourceUrl}/${this.getTransportUnitIdentifier(transportUnit)}`, transportUnit, {
      observe: 'response',
    });
  }

  partialUpdate(transportUnit: PartialUpdateTransportUnit): Observable<EntityResponseType> {
    return this.http.patch<ITransportUnit>(`${this.resourceUrl}/${this.getTransportUnitIdentifier(transportUnit)}`, transportUnit, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITransportUnit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransportUnit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTransportUnitIdentifier(transportUnit: Pick<ITransportUnit, 'id'>): number {
    return transportUnit.id;
  }

  compareTransportUnit(o1: Pick<ITransportUnit, 'id'> | null, o2: Pick<ITransportUnit, 'id'> | null): boolean {
    return o1 && o2 ? this.getTransportUnitIdentifier(o1) === this.getTransportUnitIdentifier(o2) : o1 === o2;
  }

  addTransportUnitToCollectionIfMissing<Type extends Pick<ITransportUnit, 'id'>>(
    transportUnitCollection: Type[],
    ...transportUnitsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const transportUnits: Type[] = transportUnitsToCheck.filter(isPresent);
    if (transportUnits.length > 0) {
      const transportUnitCollectionIdentifiers = transportUnitCollection.map(
        transportUnitItem => this.getTransportUnitIdentifier(transportUnitItem)!
      );
      const transportUnitsToAdd = transportUnits.filter(transportUnitItem => {
        const transportUnitIdentifier = this.getTransportUnitIdentifier(transportUnitItem);
        if (transportUnitCollectionIdentifiers.includes(transportUnitIdentifier)) {
          return false;
        }
        transportUnitCollectionIdentifiers.push(transportUnitIdentifier);
        return true;
      });
      return [...transportUnitsToAdd, ...transportUnitCollection];
    }
    return transportUnitCollection;
  }
}
