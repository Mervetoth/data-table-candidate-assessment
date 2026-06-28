import { Component } from '@angular/core';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { TableColumn } from './shared/data-table/data-table.types';
import { Product, PRODUCTS } from './data/products.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  loading = false;

  // import dataset from  data file
  products: Product[] = PRODUCTS;

  // column definitions: what to show and how
  columns: TableColumn<Product>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    {
      key: 'price',
      label: 'Price',
      // add € symbol
      render: (product) => ({ text: `${product.price} €` }),
    },
    {
      key: 'status',
      label: 'Status',
      // colored badge based on status
      render: (product) => ({
        text: product.status,
        cssClass: `status-badge status-${product.status.toLowerCase()}`,
      }),
    },
  ];
}
