# Architecture Decision Log

## Q1 — Why did you structure the component the way you did?

I placed the table in `shared/data-table` because it is a reusable UI component, not a page-specific feature.

I split the files by responsibility:

- `data-table.component.ts` contains the logic.
- `data-table.component.html` contains the table markup.
- `data-table.component.scss` contains the component styles.
- `data-table.types.ts` contains the reusable table types.
- `data/products.data.ts` contains the sample product data.
- `styles/tokens.scss` contains shared design values like colors and spacing.

The table receives `rows` and `columns` as inputs. This keeps the component generic. The parent decides what data to show, and the table only handles common table behavior: search, sorting, pagination, loading state, empty state, and custom cell rendering.

I used a generic type `T` so the component can work with different data shapes, not only products.

## Q2 — What trade-offs did you consciously make?

I kept filtering, sorting, and pagination on the client side. For this task, it keeps the code simple, readable, and easy to review. The trade-off is that this approach is not ideal for very large datasets.

I also kept the component API small. It currently receives `rows`, `columns`, `loading`, and `pageSizeOptions`. In a production version, I would add outputs for search, sort, and page changes so the parent could fetch data from an API.

I did not add advanced table features like virtual scrolling, column resizing, or keyboard navigation. They are useful, but they would make the component bigger than needed for this junior assessment.

## Q3 — Where could this component break at scale?

The main risk is performance with a large dataset, for example 10,000 rows. The browser would need to filter and sort all rows on the client side, which could make the UI slow.

At that scale, I would move filtering, sorting, and pagination to the backend. The table would emit events, and the parent would request only the needed page from the API.

Another risk is dynamic columns. If the user sorts by a column and that column is later removed, the current `sortKey` could become invalid. I would handle this in `ngOnChanges` by checking if the selected sort key still exists and resetting it if needed.

## Q4 — What would change if this needed to support both Angular AND React?

I would move the table logic outside the Angular component.

Filtering, sorting, and pagination would become plain TypeScript functions. Angular and React could both reuse the same logic.

Then I would create:

- an Angular wrapper using `@Input()`
- a React wrapper using props
- shared TypeScript types
- shared styles or CSS variables

This would keep the behavior consistent between both frameworks.

Another option would be StencilJS to build a native web component. That would make the table easier to use in Angular and React, but it would also add more setup and build complexity.

## Q5 — Describe one specific bug or edge case you encountered and how you fixed it.

One edge case was the pagination text when search returns no results.

The normal formula for the first visible item is:

`(currentPage - 1) * pageSize + 1`

This works when rows exist. But if the filtered result is empty, it could show an incorrect value like:

`Showing 1 - 0 of 0`

I fixed it by returning `0` when the sorted rows list is empty.

For the last visible item, I used:

`Math.min(currentPage * pageSize, sortedRows.length)`

This prevents the table from showing a number bigger than the total number of rows.
