# Understanding Vault Metadata

**Linear Issue:** AI-7 (See vault metadata — record count icon)
**Category:** Vaults
**Roles Required:** All roles (ADMIN, BUILDER, CONTRIBUTOR, VIEWER)

---

## Overview

Each vault displays a small set of metadata — a **record count** and a **last updated date** — to give you a quick snapshot of the vault's activity without having to open it. This metadata appears in two places: on the vault card on the dashboard, and in the vault header when you are inside a vault.

---

## Where Vault Metadata Appears

### On the Dashboard — Grid View

When your dashboard is set to **grid view**, each vault is displayed as a card. The bottom of the card shows:

- **Record count** (left side) — A document icon followed by the total number of records across all tables in the vault (for example, "0 records" or "142 records")
- **Last updated date** (right side) — A clock icon followed by the date the vault was last updated (displayed as M/D/YYYY)

### On the Dashboard — List View

When your dashboard is set to **list view**, each vault appears as a row in a table with three columns:

- **Name** — The vault icon and vault name
- **Last Opened** — How recently you last opened the vault (for example, "Opened 0 minutes ago" or "Opened 3 days ago")
- **Records** — The total number of records in the vault as a plain number

You can switch between grid and list view using the toggle icons in the upper-right corner of the dashboard.

### Inside a Vault — Vault Header

When you open a vault, the vault header at the top of the sidebar displays the same key metadata inline beneath the vault name:

- **Record count** — A document icon followed by the total number of records (for example, "0 records")
- **Last updated** — A calendar icon followed by the date and month (for example, "Updated Mar 17, 2026")

---

## What the Record Count Includes

The record count reflects the **total number of records across all tables** in the vault. It updates automatically as records are added, edited, or removed anywhere in the vault. It does not break down the count by individual table — for a per-table count, open the table's Data view, which shows the number of records at the bottom of the screen.

---

## Troubleshooting

| Issue | Likely Cause | What to Do |
|-------|-------------|------------|
| The record count shows 0 but you expect records to be there | You may be viewing a vault you haven't added data to yet, or records may be in a different vault | Open the vault and check its tables in the Data view |
| The last updated date seems incorrect | The date reflects the last time any data or settings in the vault were changed | Check whether records were recently added or edited by opening the vault tables |
| Metadata is not visible on the vault card | You may be in list view instead of grid view | Use the view toggle in the upper right of the dashboard to switch to grid view |

---

## Related Articles

- [Working with Vaults](/graphium/vaults/working-with-vaults)
- [Table Views — Data, Schema, and Settings](/graphium/data-records/table-views-data-schema-and-settings)
