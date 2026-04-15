# Loading More Records in the Data Grid

**Linear issue:** AI-35
**Linear project:** Table - Data: Data Grid
**Article type:** How-to

---

## Overview

When you open a vault table, the **Data** tab loads the first 50 records into the grid. If the table contains more records, additional records load automatically as you scroll down — no button click required. The footer shows a running count of how many records are currently visible compared to the table's total.

---

## The Data Grid Footer

At the bottom of the data grid, a persistent footer displays a record counter:

| Element | Description |
|---------|-------------|
| **Showing X of Y records** | Shows how many records are currently loaded versus the total record count for the table. Updates automatically each time more records load as you scroll. |

**Example:** A table with 300 records initially shows *"Showing 50 of 300 records"*. As you scroll down, it updates to *"Showing 100 of 300 records"*, then *"Showing 150 of 300 records"*, and so on.

---

## Scrolling to Load More Records

**Steps:**

1. Open a vault and select a table from the left sidebar. The **Data** tab opens by default.
2. The grid displays the first 50 records. The footer shows **"Showing 50 of [total] records"**.
3. Scroll down within the data grid.
4. When you reach the bottom of the currently loaded rows, the next 50 records load automatically and are appended below the existing rows.
5. The footer count updates to reflect the new total loaded.
6. Continue scrolling to load additional records until all have been loaded.

> **Note:** Records load in the same sort order that is currently active. Changing the sort after scrolling re-fetches records from the beginning.

---

## When All Records Are Loaded

Once every record has been loaded into the grid, scrolling to the bottom no longer triggers a fetch. The footer displays the final count: **"Showing [total] of [total] records"**, confirming that no additional records remain.

---

## Page Size

Each scroll-triggered load fetches up to **50 records** per request. The total count displayed in the footer always reflects the true total for the table — not just the number of records currently rendered in the grid.

---

## Permissions

All vault member roles — **Admin**, **Builder**, **Contributor**, and **Viewer** — can scroll to load and view records in the data grid.

---

## Related Articles

- [Table Views — Data, Schema, and Settings](/graphium/data-records/table-views-data-schema-and-settings)
- [Renaming a Table](/graphium/data-records/renaming-a-table)
