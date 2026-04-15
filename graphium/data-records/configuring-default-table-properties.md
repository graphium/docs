# Configuring Default Table Properties

**Linear Issue:** AI-60 (Configure which fields appear in the default table view)
**Category:** Data & Records
**Roles Required:** ADMIN or BUILDER

---

## Overview

The **Default Table Properties** setting controls which fields appear as columns when someone opens a table in the Data view, and the order those columns appear in. This lets ADMIN and BUILDER users tailor the default view so the most relevant fields are visible without requiring each user to manually adjust their column layout.

Fields removed from the default list are hidden from the data grid — but they are not deleted from the table's schema. They can be added back at any time.

> **Note:** The Settings tab is only visible to **ADMIN** and **BUILDER** users. CONTRIBUTOR and VIEWER users cannot access this setting.

---

## Before You Begin

- You must have an **ADMIN** or **BUILDER** role in the vault
- Navigate to the table you want to configure
- Confirm you are in the table view with the **Data**, **Schema**, and **Settings** tabs visible in the top-right of the content area

---

## Accessing Default Table Properties

1. Open the table you want to configure.

2. Click the **Settings** tab in the top-right of the table view.

3. Scroll down past the **Table Names**, **Enable for Contributor Mode**, and **Table Icon** sections.

4. The **Default Table Properties** section displays a list of all fields currently set to appear in the default table view. The section description reads: *"Select which properties appear in the table view by default. Drag to reorder."*

---

## Reordering Fields

The order of fields in the Default Table Properties list determines the left-to-right column order in the Data view.

1. In the **Default Table Properties** list, locate the field you want to move.

2. Click and hold the **drag handle** (the six-dot icon ⠿) on the left side of the field row.

3. Drag the field up or down to your desired position.

4. Release to drop it into place. The new order saves automatically.

When you return to the **Data** tab, the column order will match the order set here.

---

## Removing a Field from the Default View

Removing a field hides it as a column in the default data grid. The field still exists in the table's schema and all existing record data is preserved.

1. In the **Default Table Properties** list, find the field you want to hide.

2. Click the **✕** button on the right side of that field row.

3. The field is removed from the list and will no longer appear as a column in the default Data view.

> **Important:** Removing a field here only affects the default view. It does not delete the field or any data stored in it.

---

## Adding a Field Back

Fields that have been removed from the default view can be re-added at any time.

1. In the **Default Table Properties** section, click the **Add Property** button below the current list.

2. Select the field you want to restore from the picker. It will be added to the bottom of the list.

3. Use the drag handle to reorder it if needed.

---

## What Happens After You Save

- Column changes are reflected immediately when you navigate to the **Data** tab
- The updated field order and visibility applies to all users who open the table
- No page reload is needed
- If a field is later deleted from the table's **Schema**, it is automatically removed from the Default Table Properties list

---

## Default Behavior for New Tables

When a table has no Default Table Properties configured (i.e., the setting has never been changed), all fields defined in the table's schema are shown as columns in the Data view. Changes only take effect once you explicitly modify the list.

---

## Troubleshooting

| Issue | Likely Cause | What to Do |
|-------|-------------|------------|
| Settings tab is not visible | Your vault role is CONTRIBUTOR or VIEWER | Contact your vault ADMIN — only ADMIN and BUILDER users can access this setting |
| Default Table Properties section is not visible | You may need to scroll down | Scroll down in the Settings tab, below the Table Icon section |
| A field is missing from the list | It may have been removed from the default view | Check the Schema tab to confirm the field still exists, then add it back via the Default Table Properties section |
| Column order in the Data tab doesn't match | Changes may not have saved yet | Return to Settings and confirm the order, then navigate back to Data |
| A deleted schema field still appears in Data view | Edge case — defensive filtering may not have run yet | Refresh the page; deleted schema fields are automatically excluded |

---

## Related Articles

- [Table Views — Data, Schema, and Settings](/graphium/data-records/table-views-data-schema-and-settings)
- [Editing Table Display Names](/graphium/data-records/editing-table-display-names)
- [Enabling a Table for Contributor Mode](/graphium/data-records/enabling-a-table-for-contributor-mode)
