import { Component, Input } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { Product } from './../../models/product.model';

@Component({
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product;
}
