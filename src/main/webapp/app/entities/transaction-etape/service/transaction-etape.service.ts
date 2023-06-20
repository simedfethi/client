import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITransactionEtape, NewTransactionEtape } from '../transaction-etape.model';

export type PartialUpdateTransactionEtape = Partial<ITransactionEtape> & Pick<ITransactionEtape, 'id'>;

export type EntityResponseType = HttpResponse<ITransactionEtape>;
export type EntityArrayResponseType = HttpResponse<ITransactionEtape[]>;

@Injectable({ providedIn: 'root' })
export class TransactionEtapeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/transaction-etapes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(transactionEtape: NewTransactionEtape): Observable<EntityResponseType> {
    return this.http.post<ITransactionEtape>(this.resourceUrl, transactionEtape, { observe: 'response' });
  }

  update(transactionEtape: ITransactionEtape): Observable<EntityResponseType> {
    return this.http.put<ITransactionEtape>(
      `${this.resourceUrl}/${this.getTransactionEtapeIdentifier(transactionEtape)}`,
      transactionEtape,
      { observe: 'response' }
    );
  }

  partialUpdate(transactionEtape: PartialUpdateTransactionEtape): Observable<EntityResponseType> {
    return this.http.patch<ITransactionEtape>(
      `${this.resourceUrl}/${this.getTransactionEtapeIdentifier(transactionEtape)}`,
      transactionEtape,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITransactionEtape>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITransactionEtape[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTransactionEtapeIdentifier(transactionEtape: Pick<ITransactionEtape, 'id'>): number {
    return transactionEtape.id;
  }

  compareTransactionEtape(o1: Pick<ITransactionEtape, 'id'> | null, o2: Pick<ITransactionEtape, 'id'> | null): boolean {
    return o1 && o2 ? this.getTransactionEtapeIdentifier(o1) === this.getTransactionEtapeIdentifier(o2) : o1 === o2;
  }

  addTransactionEtapeToCollectionIfMissing<Type extends Pick<ITransactionEtape, 'id'>>(
    transactionEtapeCollection: Type[],
    ...transactionEtapesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const transactionEtapes: Type[] = transactionEtapesToCheck.filter(isPresent);
    if (transactionEtapes.length > 0) {
      const transactionEtapeCollectionIdentifiers = transactionEtapeCollection.map(
        transactionEtapeItem => this.getTransactionEtapeIdentifier(transactionEtapeItem)!
      );
      const transactionEtapesToAdd = transactionEtapes.filter(transactionEtapeItem => {
        const transactionEtapeIdentifier = this.getTransactionEtapeIdentifier(transactionEtapeItem);
        if (transactionEtapeCollectionIdentifiers.includes(transactionEtapeIdentifier)) {
          return false;
        }
        transactionEtapeCollectionIdentifiers.push(transactionEtapeIdentifier);
        return true;
      });
      return [...transactionEtapesToAdd, ...transactionEtapeCollection];
    }
    return transactionEtapeCollection;
  }
}
