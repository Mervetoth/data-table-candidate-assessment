import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableColumn } from './data-table.types';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T> {
  // data coming from the parent component
  @Input() rows: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() loading = false;
  @Input() pageSizeOptions: number[] = [10, 25, 50];

  searchInput = '';
  pageSize = 10;
  currentPage = 1;

  // only accept a real property name of the data object
  sortKey: keyof T | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  // get rows that match what the user typed
  get filteredRows(): T[] {
    const term = this.searchInput.trim().toLowerCase();
    if (!term) return this.rows;

    return this.rows.filter((row) =>
      this.columns.some(
        (col) =>
          // skip columns marked as not searchable
          col.searchable !== false &&
          this.getCell(row, col).text.toLowerCase().includes(term)
      )
    );
  }

  // Rows after search filter + sorting
  get sortedRows(): T[] {
    if (!this.sortKey) {
      return this.filteredRows;
    }

    const selectedColumn = this.sortKey;
    const sortOrder = this.sortDirection === 'asc' ? 1 : -1;

    return [...this.filteredRows].sort((firstRow, secondRow) => {
      const firstValue = firstRow[selectedColumn];
      const secondValue = secondRow[selectedColumn];

      // case both values are numbers : sort as numbers
      if (typeof firstValue === 'number' && typeof secondValue === 'number') {
        return (firstValue - secondValue) * sortOrder;
      }

      // otherwise, sort them as text.
      return (
        String(firstValue ?? '').localeCompare(String(secondValue ?? '')) *
        sortOrder
      );
    });
  }

  // rows visible on the current page only
  get paginatedRows(): T[] {
    const firstRowIndex = (this.currentPage - 1) * this.pageSize;
    const lastRowIndex = firstRowIndex + this.pageSize;

    return this.sortedRows.slice(firstRowIndex, lastRowIndex);
  }

  // total number of pages
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.sortedRows.length / this.pageSize));
  }

  // first item number in: "Showing X - Y of Z"
  get startItem(): number {
    if (this.sortedRows.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  // last item number in: "Showing X - Y of Z"
  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.sortedRows.length);
  }

  // reset to page 1 every time the user types something
  onInputChange(): void {
    this.currentPage = 1;
  }

  // reset to page 1 when user picks a different page size
  onPageSizeChange(value: string): void {
    this.pageSize = Number(value);
    this.currentPage = 1;
  }

  // go to a specific page, ignore if out of range
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // called when user clicks a column header
  onSortClick(col: TableColumn<T>): void {
    if (col.sortable === false) return;

    if (this.sortKey === col.key) {
      // same column clicked again = flip direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // new column clicked = sort asc by default
      this.sortKey = col.key;
      this.sortDirection = 'asc';
    }
  }

  // returns up or down icon next to the sorted column header
  getSortIcon(col: TableColumn<T>): string {
    if (this.sortKey !== col.key) return '';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  // returns what to display in a cell: text + optional css class
  getCell(row: T, col: TableColumn<T>): { text: string; cssClass?: string } {
    // use custom render if provided (e.g. colored badge)
    if (col.render) return col.render(row);

    // otherwise just convert the value to a string
    const value = row[col.key];
    return { text: value === null || value === undefined ? '' : String(value) };
  }
}
