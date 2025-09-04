import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/interfaces/product/response/GetAllProductsResponse';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { Subject, takeUntil } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  public productsList: Array<GetAllProductsResponse> = [];
  private destroy$ = new Subject<void>();
  constructor(
    private readonly productService: ProductsService,
    private readonly messageService: MessageService,
    private readonly productsDTService: ProductsDataTransferService
  ) {}

  public productChartDatas!: ChartData;
  public productChartOptions!: ChartOptions;

  ngOnInit(): void {
    this.getProductsDatas();
  }
  getProductsDatas(): void {
    this.productService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length>0){
          this.productsList = response;
          this.productsDTService.setProductsDatas(this.productsList);
          this.setProductsChartConfig();
        }
      }, error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos',
          life: 2500,
        })
      }
    });
  }

  setProductsChartConfig(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.productChartDatas = {
      labels: this.productsList.map((element) => element?.name),
      datasets: [
        {
          label: 'Quantidade',
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
          data: this.productsList.map((element) => element?.amount),
        },
      ],
    };

    this.productChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },

      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 'normal',
            },
          },
          grid: {
            color: surfaceBorder,
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
