import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICrmCOntactSource } from '../crm-c-ontact-source.model';
import { CrmCOntactSourceService } from '../service/crm-c-ontact-source.service';

import { CrmCOntactSourceRoutingResolveService } from './crm-c-ontact-source-routing-resolve.service';

describe('CrmCOntactSource routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CrmCOntactSourceRoutingResolveService;
  let service: CrmCOntactSourceService;
  let resultCrmCOntactSource: ICrmCOntactSource | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(CrmCOntactSourceRoutingResolveService);
    service = TestBed.inject(CrmCOntactSourceService);
    resultCrmCOntactSource = undefined;
  });

  describe('resolve', () => {
    it('should return ICrmCOntactSource returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrmCOntactSource = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrmCOntactSource).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrmCOntactSource = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCrmCOntactSource).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICrmCOntactSource>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCrmCOntactSource = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCrmCOntactSource).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
