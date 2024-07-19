import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './../../components/product/product.component';
import { Product } from './../../models/product.model';

@Component({
  standalone: true,
  imports: [ProductComponent, CommonModule],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  http = inject(HttpClient);
  products: Product[] = [];

  ngOnInit() {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((data: Product[]) => {
        this.products = data.map(product => {
          // Limpia las URLs de las imágenes
          product.images = product.images.map(image => {
            if (typeof image === 'string' && image.startsWith('["')) {
              try {
                image = JSON.parse(image)[0];
              } catch {
                // Si no se puede parsear, deja la imagen tal como está
                image = image.replace(/[\[\]"]+/g, ''); // Remueve cualquier comilla o corchete adicional
              }
            }
            return image;
          });
          return product;
        });
        console.log(this.products);
      });
  }
}
