# Editing Workspace Settings

**Linear issue:** AI-141
**Linear project:** Workspace: Workspace Management
**Article type:** How-to

---

## Overview

The Workspace Settings page lets Workspace Owners manage the identity and configuration of their workspace — including its name, description, and record deletion behavior — and deactivate it if needed. It is accessible from any page in Graphium AI via the gear icon in the navigation bar.

---

## How to Open Workspace Settings

1. From any page in Graphium AI, locate the **workspace indicator** in the top-left of the navigation bar (the colored icon and workspace name).
2. Click the **Workspace Settings** button — the gear icon (⚙) that appears immediately to the right of the workspace name.
3. The Workspace Settings page opens at `/settings`, defaulting to the **General** tab.

---

## Settings Page Layout

The Workspace Settings page has a left-side navigation with two tabs:

| Tab | Purpose |
|-----|---------|
| **General** | Workspace name, description, record deletion mode, and danger zone |
| **Members** | View and manage workspace membership |

A **"Back to Workspace"** button at the top of the page returns you to the dashboard.

---

## General Settings

### Workspace Name and Description

The General tab opens by default and shows two editable fields at the top:

- **Name** — The workspace's display name. This is shown in the workspace switcher, the navigation bar, and across all workspace views.
- **Description** — A short description of the workspace (up to 500 characters). Useful for distinguishing between multiple workspaces in your account.

Click **Save Changes** after editing either field to apply the updates.

---

### Record Deletion Mode

This section controls how record deletions are handled across all vault tables in the workspace.

| Mode | Behavior |
|------|----------|
| **Void Mode** (default) | Deleted records are marked as voided and remain stored. They are hidden from standard views but retained and recoverable. |
| **Delete Mode** | Deleted records are permanently removed and cannot be recovered. |

The current mode is displayed in this section. To switch from Void Mode to Delete Mode, click **Enable Delete Mode**. This setting affects all tables across the entire workspace.

> **Note:** Switching to Delete Mode is a significant change. All subsequent record deletions will be permanent.

---

### Danger Zone

The Danger Zone section contains the **Deactivate Workspace** action.

**What deactivation does:**
- Immediately suspends access for all workspace members
- The workspace is no longer accessible from the switcher or workspace list
- All data (vaults, tables, records) is retained and can be restored

**To deactivate the workspace:**

1. Scroll to the **Danger Zone** section on the General tab.
2. Click **Deactivate Workspace**.
3. Confirm the action in the confirmation prompt that appears.

> **Warning:** Deactivating a workspace immediately removes access for all members. Only a Workspace Owner can perform this action and request reactivation.

---

## Permissions

| Action | Workspace Owner | Workspace Member |
|--------|----------------|-----------------|
| View General Settings | ✅ | ✅ |
| Edit workspace name and description | ✅ | ❌ |
| Change record deletion mode | ✅ | ❌ |
| Deactivate workspace | ✅ | ❌ |
| View Members tab | ✅ | ✅ |

---

## Related Articles

- [Viewing Available Workspaces](/graphium/getting-started/viewing-available-workspaces)
- [Using the Workspace Switcher](/graphium/getting-started/using-the-workspace-switcher)
- [Identifying Your Current Workspace](/graphium/getting-started/identifying-your-current-workspace)
