# Editing a Record in the Data Grid

> **Article type:** Product Use
> **Audience:** Internal Team
> **Status:** Draft
> **Last updated:** 2026-04-13
> **Author:** Shauna Dura

**Linear issue:** AI-38
**Linear project:** Table - Data: Record Management

---

## Overview

Any existing vault record can be edited directly from the Data Grid using the table's default form view. Clicking the edit icon on a record row opens a pre-populated form where you can update field values and save changes. After saving, the record detail surface refreshes automatically to reflect the latest values and the record's updated completion percentage.

## When to Use This

Use this feature when you need to:

- Correct or update information on an existing vault record
- Fill in fields that were left blank when the record was first created
- Update a record's status, values, or data as part of an ongoing workflow
- Improve a record's completion percentage by populating incomplete fields

## Prerequisites

- You must have **Admin**, **Builder**, or **Contributor** access to the vault — Viewer-role users cannot edit records
- The vault table must contain at least one existing record
- The table must have a default form configured (most tables include one by default)

## Step-by-Step Instructions

### Step 1: Open the Vault Table

Navigate to the vault that contains the record you want to edit. Select the table from the vault sidebar. The **Data** tab opens by default, showing all records in the data grid.

> 💡 **Tip:** Use the **Filter** button in the table header bar to search or narrow down records before locating the one you want to edit.

### Step 2: Locate the Record Row

Find the record you want to edit in the data grid. Each row represents a single record, with the record's field values displayed across the columns.

### Step 3: Click the Edit Icon

Click the **edit icon** (✏️) on the far right of the record row. This opens the record's default form view, pre-populated with all of the record's current field values.

> 💡 **Tip:** The edit icon is only visible to users with Admin, Builder, or Contributor roles. If you don't see it, check your vault access level with your administrator.

### Step 4: Update Field Values

Edit any fields you want to change within the form. The default form includes all fields defined in the table's schema. Supported field types include:

| Field Type | How to Edit |
|------------|-------------|
| **Text** | Click the field and type new content |
| **Number** | Click the field and enter a numeric value |
| **Date / Time** | Click the field to open a date or time picker |
| **Select from List** | Click the field to open the option dropdown and select a value |
| **Boolean** | Toggle the checkbox or switch on or off |
| **Signature** | Clear the existing signature and re-sign if needed |

> 💡 **Tip:** Fields marked as required must be filled in before the form can be submitted. Required fields are typically indicated with an asterisk (*) or highlighted when left empty.

### Step 5: Save the Record

When you have finished making changes, click the **Save** button to submit the edits.

- The form will close and the record detail view will refresh automatically
- The record's updated field values will be displayed in the data grid and record detail surface
- The record's **completion percentage** will update to reflect how fully the record's fields are now populated

> ⚠️ **Important:** If the system is unable to refresh the record after saving (e.g., due to a network issue), a visible **error state** will be shown. Your changes are still saved — the error only indicates that the latest values could not be fetched for display. Refreshing the page will resolve this.

## What to Expect

After saving a record edit:

| Outcome | Details |
|---------|---------|
| **Record detail refreshes** | The form closes and the data grid and record detail view update to show the latest saved values |
| **Completion percentage updates** | The record's completion percentage recalculates based on how many fields are now populated |
| **Error state (if applicable)** | If the post-save fetch fails, an error message is shown. The edit was saved — only the display refresh failed. Reload the page to see updated values. |
| **No change on Cancel** | If you close or cancel the form without saving, no changes are applied to the record |

## Common Issues & Troubleshooting

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| Edit icon is not visible on record rows | Your role is Viewer, which does not have edit permissions | Contact your vault administrator to request Contributor or higher access |
| Form opens but fields appear greyed out or locked | The field may be managed by an external integration (e.g., Graphium EMR) or set to read-only in the schema | Contact your administrator to confirm whether the field is editable |
| Error message appears after saving | The post-save data refresh failed, usually due to a temporary network issue | Your edit was saved. Reload the page to see the updated record values |
| Completion percentage did not change after saving | Not all required or tracked fields were populated, or the refresh failed | Ensure all relevant fields have values and reload the page if needed |
| Changes are not appearing in the data grid | A display refresh may not have triggered | Reload the page to force the data grid to re-fetch the latest record data |
| Form does not open when clicking edit | A temporary loading issue | Wait a moment and try clicking the edit icon again; refresh the page if the problem persists |

## Related Articles

- [Viewing Table Records in the Data Grid](/graphium/data-records/viewing-table-records-in-the-data-grid)
- [Filtering Records in the Data Grid](/graphium/data-records/filtering-records-in-the-data-grid)
- [Deleting and Voiding Records in the Data Grid](/graphium/data-records/deleting-and-voiding-records-in-the-data-grid)
- [Table Views — Data, Schema, and Settings](/graphium/data-records/table-views-data-schema-and-settings)
- [Browsing the Schema Property List](/graphium/schema-properties/browsing-the-schema-property-list)

---

*Questions? Reach out to the Graphium AI team or open a ticket in the #product-support Slack channel.*
