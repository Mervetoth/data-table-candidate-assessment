import { Meta, StoryObj } from '@storybook/angular';
import { DataTableComponent } from '../app/shared/data-table/data-table.component';
import { PRODUCTS } from '../app/data/products.data';
import { TableColumn } from '../app/shared/data-table/data-table.types';
import { Product } from '../app/data/products.data';

const columns: TableColumn<Product>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price', render: (p) => ({ text: `${p.price} €` }) },
  {
    key: 'status',
    label: 'Status',
    render: (p) => ({
      text: p.status,
      cssClass: `status-badge status-${p.status.toLowerCase()}`,
    }),
  },
];

const meta: Meta<DataTableComponent<Product>> = {
  title: 'Components/DataTable',
  component: DataTableComponent,
};

export default meta;
type Story = StoryObj<DataTableComponent<Product>>;

// story 1: normal state with data
export const WithData: Story = {
  args: {
    rows: PRODUCTS,
    columns,
    loading: false,
  },
};

// story 2: loading state
export const Loading: Story = {
  args: {
    rows: [],
    columns,
    loading: true,
  },
};

// story 3: empty state, no results
export const Empty: Story = {
  args: {
    rows: [],
    columns,
    loading: false,
  },
};
