import { Component, OnInit } from '@angular/core';
import dayjs from "dayjs";
import {MainsearchService} from "../../layouts/mainsearch/mainsearch.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ApplicationConfigService} from "../../core/config/application-config.service";
import {crmStatistics} from "./crmStatistics.model";

import * as echarts from 'echarts';


@Component({
  selector: 'jhi-crmdashboard',
  templateUrl: './crmdashboard.component.html',
  styleUrls: ['./crmdashboard.component.scss']
})
export class CrmdashboardComponent implements OnInit  {
  chart: any;
  chartCom: any;
  chartCategorie: any;
  chartEtape: any;
  startDate='';
  endDate ='';
  crmstatistic? : crmStatistics  ;
  nbprospectnouveau=0;

  chartOption? : echarts.EChartsOption  ;
  chartCommercial? : echarts.EChartsOption  ;
  chartcategorieOption? : echarts.EChartsOption  ;
  chartEtapeOption? : echarts.EChartsOption  ;
  loading=false;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api');

  constructor(protected http:HttpClient, protected applicationConfigService: ApplicationConfigService) {
    const myCrmStatistics: crmStatistics = {
      nbNewprospect: 10,
      nbVisite: 20,
      nbConverti: 30,
      crmStatisticsWilayaList: [
        {
          wilayaName: 'Algiers',
          nbVisite: '50',
          nbConverti: 2
        },
        {
          wilayaName: 'Oran',
          nbVisite: '40',
          nbConverti: 1
        }
      ],
      crmStatisticsCategorieClients: [
        {
          categorieName: 'Category A',
          nbVisite: '15',
          nbConverti: 3
        },
        {
          categorieName: 'Category B',
          nbVisite: '12',
          nbConverti: 2
        }
      ],
      crmStatisticsCommercials: [
        {
          commercialName: 'John',
          nbVisite: '8',
          nbConverti: 1
        },
        {
          commercialName: 'Jane',
          nbVisite: '7',
          nbConverti: 4
        }
      ],
      crmStatisticsEtapeCrms: [
        { etapeName: 'Category 1', nbprospect: 335 },
        { etapeName: 'Category 2', nbprospect: 310 },
        { etapeName: 'Category 3', nbprospect: 234 },
        { etapeName: 'Category 4', nbprospect: 135 },
        { etapeName: 'Category 5', nbprospect: 1548 }
      ]
    };
    this.crmstatistic=myCrmStatistics;
  }

  ngOnInit():void {
    this.startDate = dayjs().startOf('month').format('YYYY-MM-DD');
    this.endDate = dayjs().endOf('month').format('YYYY-MM-DD');
    // set loading to true while data is loading
    this.loading = true;

    // create chart option object
    this.chartOption = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Visits', 'Conversions'],
      },
      xAxis: {
        type: 'category',
        data: this.crmstatistic?.crmStatisticsWilayaList.map((w) => w.wilayaName),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Visits',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsWilayaList.map((w) => w.nbVisite),
        },
        {
          name: 'Conversions',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsWilayaList.map((w) => w.nbConverti),
        },
      ],
    };
    this.chart = echarts.init(document.getElementById('chart')!);
    this.chart.setOption(this.chartOption);

    this.chartCommercial = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Visits', 'Conversions'],
      },
      xAxis: {
        type: 'category',
        data: this.crmstatistic?.crmStatisticsCommercials.map((w) => w.commercialName),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Visits',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsCommercials.map((w) => w.nbVisite),
        },
        {
          name: 'Conversions',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsCommercials.map((w) => w.nbConverti),
        },
      ],
    };
    this.chartCom = echarts.init(document.getElementById('chartcommercial')!);
    this.chartCom.setOption(this.chartCommercial);



    // create chart option object
    this.chartcategorieOption = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Visits', 'Conversions'],
      },
      xAxis: {
        type: 'category',
        data: this.crmstatistic?.crmStatisticsCategorieClients.map((w) => w.categorieName),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Visits',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsCategorieClients.map((w) => w.nbVisite),
        },
        {
          name: 'Conversions',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsCategorieClients.map((w) => w.nbConverti),
        },
      ],
    };
    this.chartCategorie = echarts.init(document.getElementById('chartcategorie')!);
    this.chartCategorie.setOption(this.chartcategorieOption);


    // create chart etape
    this.chartEtapeOption ={
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Par étape',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.crmstatistic?.crmStatisticsEtapeCrms.map(item => ({ value: item.nbprospect, name: item.etapeName })),
        }
      ]
    };
    this.chartEtape = echarts.init(document.getElementById('chartetape')!);
    this.chartEtape.setOption(this.chartEtapeOption);
    // set loading to false once data has loaded
    this.loading = false;
  }

  prospectNouveau():void {
    const daterange= {startDate:this.startDate,endDate:this.endDate};
    this.http.get<crmStatistics>(`${this.resourceUrl}/crmdashboard`,{ params: daterange, observe: 'response' }).subscribe({
      next: (response:HttpResponse<crmStatistics>) => {
        if (response.body) {
          this.crmstatistic = response.body;
          this.updateCharts();
        }

      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Request completed.');
      }
    });
  }

  updateCharts() :void {
    // create chart option object
    this.chartOption = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Visits', 'Conversions'],
      },
      xAxis: {
        type: 'category',
        data: this.crmstatistic?.crmStatisticsWilayaList.map((w) => w.wilayaName),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Visits',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsWilayaList.map((w) => w.nbVisite),
        },
        {
          name: 'Conversions',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsWilayaList.map((w) => w.nbConverti),
        },
      ],
    };
    this.chart = echarts.init(document.getElementById('chart')!);
    this.chart.setOption(this.chartOption);

    this.chartCommercial = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Visits', 'Conversions'],
      },
      xAxis: {
        type: 'category',
        data: this.crmstatistic?.crmStatisticsCommercials.map((w) => w.commercialName),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Visits',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsCommercials.map((w) => w.nbVisite),
        },
        {
          name: 'Conversions',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsCommercials.map((w) => w.nbConverti),
        },
      ],
    };
    this.chartCom = echarts.init(document.getElementById('chartcommercial')!);
    this.chartCom.setOption(this.chartCommercial);



    // create chart option object
    this.chartcategorieOption = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Visits', 'Conversions'],
      },
      xAxis: {
        type: 'category',
        data: this.crmstatistic?.crmStatisticsCategorieClients.map((w) => w.categorieName),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Visits',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsCategorieClients.map((w) => w.nbVisite),
        },
        {
          name: 'Conversions',
          type: 'bar',
          data: this.crmstatistic?.crmStatisticsCategorieClients.map((w) => w.nbConverti),
        },
      ],
    };
    this.chartCategorie = echarts.init(document.getElementById('chartcategorie')!);
    this.chartCategorie.setOption(this.chartcategorieOption);


    // create chart etape
    this.chartEtapeOption ={
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Par étape',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.crmstatistic?.crmStatisticsEtapeCrms.map(item => ({ value: item.nbprospect, name: item.etapeName })),
        }
      ]
    };
    this.chartEtape = echarts.init(document.getElementById('chartetape')!);
    this.chartEtape.setOption(this.chartEtapeOption);

  }

}
