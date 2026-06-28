// this deffines the shape of one column config
export interface TableColumn<T> {
  key: keyof T; // field to show ('name', 'price'..)
  label: string; // header
  sortable?: boolean;
  searchable?: boolean;
  render?: (row: T) => { text: string; cssClass?: string }; // customiised cell (badge, icon...)
}
