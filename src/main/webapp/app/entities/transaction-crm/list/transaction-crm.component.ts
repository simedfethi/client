import { Component, OnInit } from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionCRM } from '../transaction-crm.model';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, TransactionCRMService } from '../service/transaction-crm.service';
import { TransactionCRMDeleteDialogComponent } from '../delete/transaction-crm-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';
import { FilterOptions, IFilterOptions, IFilterOption } from 'app/shared/filter/filter.model';

import { IFilterTransaction } from './filterTransaction';
import {ITransactionEtape} from "../../transaction-etape/transaction-etape.model";
import {TransactionEtapeService} from "../../transaction-etape/service/transaction-etape.service";

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'jhi-transaction-crm',
  templateUrl: './transaction-crm.component.html',
  styleUrls: ['./transaction-crm.component.scss'],
})
export class TransactionCRMComponent implements OnInit {
  fiexpanded=true;
  transactionCRMS?: ITransactionCRM[];
  crmtransaction: ITransactionCRM = {
    adresse: undefined,
    chargeAffaire: undefined,
    client: undefined,
    creeLe: undefined,
    crmDocuments: undefined,
    dateFin: undefined,
    dernierUpdate: undefined,
    id: 0,
    latitude: undefined,
    longitude: undefined,
    monnaie: undefined,
    montant: undefined,
    notes: undefined,
    reference: undefined,
    source: undefined,
    telephone: undefined,
    trEtape: undefined,
    transactionRecurrente: undefined,
  };

  filterList = [
    { id: 'reference', description: 'Par référence' },
    { id: 'notes', description: 'Par notes' },
    { id: 'companyname', description: 'Par Client' },
    { id: 'contactName', description: 'Par Contact' },
    { id: 'employeeName', description: 'Par Commercial' },
    { id: 'montant', description: 'Par Montant' },
  ];
  filterCondition = [
    { id: '.equals', description: '=' },
    { id: '.contains', description: 'contient' },
    { id: '.greaterThanOrEqual', description: '>=' },
    { id: '.lessThanOrEqual', description: '<=' },
  ];

  selectCondition = '';
  transactionEtapeValues =[];// Object.keys(TransactionEtape);

  isLoading = false;

  predicate = 'id';
  ascending = true;
  filters: IFilterOptions = new FilterOptions();
  filterCollections: IFilterTransaction[] = [];
  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;
  searchTerms = {};
  refSearch = '';
  wilayaSearch = '';
  dairaSearch = '';
  communeSearch ='';
  selectFilter = '';
  termObject = {};
  transactionEtapeList :ITransactionEtape[]=[];
  constructor(
    protected transactionCRMService: TransactionCRMService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal,
    protected transactionEtapeService: TransactionEtapeService,
  ) {}

  trackId = (_index: number, item: ITransactionCRM): number => this.transactionCRMService.getTransactionCRMIdentifier(item);

  ngOnInit(): void {
    this.loadrelatedEntities();
    this.load();
    this.filters.filterChanges.subscribe(filterOptions => this.handleNavigation(1, this.predicate, this.ascending, filterOptions));

  }

  buttonexport():void {
    this.exportToExcel(this.transactionCRMS ?? []);
  }
  printTable(): void {

      const printContent = document.getElementById('print-content')!.outerHTML;
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow!.document.write('<html><head><title>Print</title></head><body>' + printContent + '</body></html>');
      printWindow!.document.close();
      printWindow!.focus();
      printWindow!.print();
      printWindow!.close();

  }
  exportToExcel(entities: ITransactionCRM[]): void {
    // Create an array of objects with the properties you want to export
    const data = entities.map((entity) =>(
          {
          reference: entity.reference,
          client: entity.client?.company,
            wilaya: entity.wilaya,
            commune: entity.commune,
            daira: entity.daira,
            dernieremodification: entity.lastActivity?.toISOString(),
            categorie: entity.client?.categorie?.catName,
            // Add more properties as needed
        }

    ));

    // Define the Excel file name and extension
    const fileName = 'entities.xlsx';

    // Create a new Excel workbook
    const workbook = XLSX.utils.book_new();

    // Convert the data to an Excel worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entities');

    // Convert the workbook to a Blob object
    const blob = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Save the Blob object as a file with the specified name
    console.log(blob);
    // Assume you have a blob named myBlob
    const fileName1 = 'myFile.xlsx';

// Use FileSaver.js to save the blob
    FileSaver.saveAs(blob, fileName1);
  }

  filterbyTransactionEtape(event,tr:ITransactionEtape):void {
    event.preventDefault();
    this.termObject['trEtapeId.in']=tr.id;
    this.load();
  }
  filterbytrValidation(event,validation):void {
    event.preventDefault();
    this.termObject['trValidated.equals']=validation;
    this.load();
  }

  loadrelatedEntities():void {
   this.transactionEtapeService.query().subscribe({next :(c:HttpResponse<ITransactionEtape[]>)=> {
     this.transactionEtapeList=c.body ?? [];
     }})
  }
  addFilter(): void {
    const refe = {
      fieldName: this.selectFilter,
      fieldDescription: this.selectFilter,
      fieldCondition: this.selectCondition,
      fieldvalue: '',
    } as IFilterTransaction;
    this.filterCollections.push(refe);
  }
  resetfilter():void {
    this.termObject={};
    console.log(this.termObject);
    this.load();
  }
  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }


  delete(transactionCRM: ITransactionCRM): void {
    const modalRef = this.modalService.open(TransactionCRMDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transactionCRM = transactionCRM;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }


  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

   loafFiltreTerms(): any {
    const searchTerm = {};
    if (this.refSearch.trim() !== '') {
      searchTerm['reference.contains'] = this.refSearch;
    }
    if (this.wilayaSearch.trim() !== '') {
      searchTerm['wilaya.contains'] = this.wilayaSearch;
    }
     if (this.dairaSearch.trim() !== '') {
       searchTerm['daira.contains'] = this.dairaSearch;
     }
     if (this.communeSearch.trim() !== '') {
       searchTerm['commune.contains'] = this.communeSearch;
     }
    return searchTerm;
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending, this.filters.filterOptions);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending, this.filters.filterOptions);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending, this.filters.filterOptions))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
    this.filters.initializeFromParams(params);
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.transactionCRMS = dataFromBody;
    console.log(dataFromBody);
  }

  protected fillComponentAttributesFromResponseBody(data: ITransactionCRM[] | null): ITransactionCRM[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  protected queryBackend(
    page?: number,
    predicate?: string,
    ascending?: boolean,
    filterOptions?: IFilterOption[]
  ): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const pageToLoad: number = page ?? 1;
    const queryObject: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    filterOptions?.forEach(filterOption => {
      queryObject[filterOption.name] = filterOption.values;
    });
    this.termObject ={...this.termObject,...this.loafFiltreTerms()} ;
    this.filterCollections.forEach(c => {
      const fieldid = c.fieldName.concat(c.fieldCondition);
      this.termObject[fieldid] = c.fieldvalue;
    });
    const finalquery = { ...this.termObject, ...queryObject };
    return this.transactionCRMService.query(finalquery).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(page = this.page, predicate?: string, ascending?: boolean, filterOptions?: IFilterOption[]): void {
    const queryParamsObj: any = {
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    filterOptions?.forEach(filterOption => {
      queryParamsObj[filterOption.nameAsQueryParam()] = filterOption.values;
    });

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
