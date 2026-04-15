# Viewing Table Records in the Data Grid

**Linear issue:** AI-31
**Linear project:** Table - Data: Data Grid
**Article type:** Reference

---

## Overview

The **Data** tab is the default view when you open any vault table. It renders the table's records in a scrollable, sortable, filterable data grid where each row is one record and each column corresponds to a property from the table's schema. The grid supports column-header sorting, infinite scroll pagination, filtering, and per-row actions for permitted roles.

---

## Opening the Data Grid

The Data tab opens automatically when you select a table from the vault sidebar. You can also switch to it at any time by clicking the **Data** tab in the top-right corner of the table view.

The three tabs in the table view are:

| Tab | Purpose |
|-----|---------|
| **Data** | Records data grid (this view) |
| **Schema** | View and manage the table's property definitions |
| **Settings** | Table configuration, display names, and data sync |

---

## The Table Header Bar

Directly above the grid, a header bar provides context and quick actions for the table:

| Element | Description |
|---------|-------------|
| **Table name** + pencil icon | The table's display name. Click the pencil to rename it. |
| **"Schema from {template} template"** badge | Shown when the table's schema is inherited from a shared template. The badge links to the template. |
| **"Managed by {integration}"** badge | Shown when the table's records are managed by an external system (e.g., Graphium EMR). Indicates external ownership of the data. |
| **+ Add {singular}** button | Opens a new record form. Visible to Admin, Builder, and Contributor roles only. The button label uses the table's configured singular name (e.g., "+ Add Procedure"). |
| **Import** button | Allows bulk importing records into the table. Visible to Admin, Builder, and Contributor roles only. |
| **Filter** button | Opens the filter panel above the data grid to add and manage filter conditions. Visible to all roles. |
| **Data / Schema / Settings** tabs | Switch between the three table views. |

> **Note:** The "Schema from" badge and "Managed by" badge are each only shown when applicable to the table. Many tables display neither.

---

## The Column Header Row

The first row of the grid is the column header row. It contains:

- **Select-all checkbox** (far left) — Selects or deselects all currently visible rows. Visible to Admin, Builder, and Contributor roles only.
- **Column names** — Derived from the table's schema. When the table has a configured set of default visible fields, only those columns appear, in the configured order. Otherwise all schema properties are shown.
- **Sort indicator** — The active sort column displays an arrow icon after its name (↑ for ascending, ↓ for descending). Unsorted columns show no indicator. Click any column header to sort by it; click again to reverse.

---

## Record Rows

Each row below the header represents one record. From left to right, a row contains:

| Element | Description |
|---------|-------------|
| **Row checkbox** | Selects the individual row. Visible to Admin, Builder, and Contributor roles only. |
| **Data cells** | One cell per column, displaying the value stored for that property on this record. Long text values may wrap across multiple lines within the cell. |
| **Edit button** (far right) | Opens the record detail view to edit the record. Visible to Admin, Builder, and Contributor roles only. |

---

## The Grid Footer

A persistent footer sits below the last visible row and spans the full width of the grid:

| Element | Position | Description |
|---------|----------|-------------|
| **Showing X of Y records** | Left | The count of currently-loaded records versus the table's total record count. Updates automatically as more records load while scrolling. |

The footer counter reads "Showing Y of Y records" once all records have been loaded.

---

## Empty State

When a table contains no records, the grid displays an empty state message — "No {plural} found" — in place of the data rows, using the table's configured plural name (e.g., "No Procedures found"). Admin, Builder, and Contributor users also see the **+ Add {singular}** button in the empty state, prompting them to add the first record.

---

## Column Types and Display

Columns are derived from the table's schema and display values according to their property type:

- **Text** properties display as plain text.
- **Number** properties display as numerals.
- **Date / Time / Date+Time** properties display in formatted date or time strings.
- **Select from List** properties display the selected option label.
- **Boolean** properties display as a checked or unchecked indicator.
- **Image** properties display a thumbnail.
- Other types (Signature, Formula, Auto ID, etc.) display their stored or computed value.

---

## Permissions

| Feature | Admin | Builder | Contributor | Viewer |
|---------|-------|---------|-------------|--------|
| View data grid | ✅ | ✅ | ✅ | ✅ |
| Sort columns | ✅ | ✅ | ✅ | ✅ |
| Scroll to load more records | ✅ | ✅ | ✅ | ✅ |
| Filter records | ✅ | ✅ | ✅ | ✅ |
| Row checkboxes | ✅ | ✅ | ✅ | ❌ |
| Edit button per row | ✅ | ✅ | ✅ | ❌ |
| + Add {singular} button | ✅ | ✅ | ✅ | ❌ |
| Import button | ✅ | ✅ | ✅ | ❌ |

---

## Related Articles

- [Sorting Records in the Data Grid](/graphium/data-records/sorting-records-in-the-data-grid)
- [Loading More Records in the Data Grid](/graphium/data-records/loading-more-records-in-the-data-grid)
- [Filtering Records in the Data Grid](/graphium/data-records/filtering-records-in-the-data-grid)
- [Table Views — Data, Schema, and Settings](/graphium/data-records/table-views-data-schema-and-settings)
- [Browsing the Schema Property List](/graphium/schema-properties/browsing-the-schema-property-list)
