import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/product/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit,OnDestroy{
  private destroy$ = new Subject<void>();
  public productsDatas: Array<GetAllProductsResponse> = [];

  constructor(private productService: ProductsService,
              private productsDTService: ProductsDataTransferService,
              private router: Router,
              private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas() {
    const productsLoaded = this.productsDTService.getProductDatas();

    if(productsLoaded.length > 0){
      this.productsDatas = productsLoaded;
    }else{
      this.getProductsAPI();
    }
  }

  getProductsAPI() {
    this.productService.getAllProducts().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response.length > 0){
            this.productsDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar Produtos',
            life: 2500
          })
          this.router.navigate(['dashboard']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
