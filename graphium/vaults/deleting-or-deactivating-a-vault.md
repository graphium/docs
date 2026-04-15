# Deleting or Deactivating a Vault

**Linear issue:** AI-126
**Linear project:** Vault Settings: General
**Article type:** How-to

---

## Overview

From the **Danger Zone** section of Vault Settings, Workspace Owners can permanently delete a vault or deactivate it. The action available depends on the vault's current state:

- **Delete Vault** — available when the vault contains no tables. Permanently removes the vault and all of its data. This action cannot be undone.
- **Deactivate Vault** — available when the vault contains one or more tables. Hides the vault from the dashboard without removing any data. The vault and its tables can be restored by reactivating it later.
- **Reactivate Vault** — available when the vault is currently deactivated. Restores the vault to active status, making it visible on the dashboard again.

> **Note:** These controls are only visible to users with the **Workspace Owner** role. Admins, Builders, Contributors, and Viewers do not see the Danger Zone.

---

## Accessing the Danger Zone

1. Open the vault you want to delete or deactivate.
2. In the left sidebar, click **Settings**.
3. Under **General Settings**, scroll down to the **Danger Zone** section.

The Danger Zone is labeled in red and appears below the Vault Information fields (Vault Name and Description).

---

## Deleting a Vault

Deletion is only available when the vault contains **no tables**. If the vault has any tables, the Deactivate Vault option appears instead.

1. Open the vault and navigate to **Settings → General Settings → Danger Zone**.
2. Click **Delete Vault**. A confirmation dialog appears.
3. Read the confirmation warning carefully. Deletion is **permanent** — all vault data will be removed and cannot be recovered.
4. Confirm the deletion. You are returned to the workspace dashboard.

The deleted vault no longer appears on the dashboard.

> **Warning:** Vault deletion cannot be undone. If the vault contains data you may need later, use Deactivate instead.

---

## Deactivating a Vault

Deactivation is available when the vault contains **one or more tables**. Deactivating a vault hides it from the dashboard without deleting any data.

1. Open the vault and navigate to **Settings → General Settings → Danger Zone**.
2. Click **Deactivate Vault**. A confirmation dialog appears.
3. Confirm the deactivation. The vault is marked as inactive and is no longer visible on the dashboard by default.

The vault and its tables, records, and configuration remain intact. Workspace Owners can restore the vault at any time by reactivating it.

---

## Viewing Inactive Vaults on the Dashboard

By default, the dashboard only shows active vaults. To see deactivated vaults:

1. Go to the workspace dashboard.
2. Locate the **Show inactive vaults** toggle (near the vault list filter controls).
3. Enable the toggle. Inactive vaults appear in the list alongside active vaults.

Inactive vaults are visually distinguished from active vaults in the list.

---

## Reactivating a Vault

To restore a deactivated vault:

1. Go to the workspace dashboard.
2. Enable the **Show inactive vaults** toggle to make the deactivated vault visible.
3. Open the deactivated vault.
4. In the left sidebar, click **Settings**.
5. Under **General Settings**, scroll to the **Danger Zone** section.
6. Click **Reactivate Vault**. A confirmation dialog appears.
7. Confirm the reactivation. The vault is restored to active status and appears on the dashboard again.

---

## Permissions

| Role | Can Access Danger Zone |
|------|------------------------|
| Workspace Owner | ✅ |
| Workspace Manager | ❌ |
| Form Editor | ❌ |
| Form Viewer | ❌ |
| Integration Manager | ❌ |

The Danger Zone and its controls are not visible to any role other than Workspace Owner.

---

## Related Articles

- [Vault Settings — General Configuration](/graphium/vaults/vault-settings-general-configuration)
- [Working with Vaults](/graphium/vaults/working-with-vaults)
- [Creating a Vault from Scratch](/graphium/vaults/creating-a-vault-from-scratch)
- [Viewing Vaults in the Card Grid Layout](/graphium/vaults/viewing-vaults-in-the-card-grid-layout)
