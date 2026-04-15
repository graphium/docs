# Removing a User from the Vault

**Linear issue:** AI-132
**Linear project:** Vault/Workspace Settings: User Permissions
**Article type:** How-to

---

## Overview

Vault Admins can remove a user from a vault at any time from the **Access & Permissions → Users** tab. Removing a user revokes their access to the vault immediately — no confirmation dialog appears. The user remains a member of the workspace and retains access to any other vaults they belong to.

---

## Steps

1. Open the vault and click **Settings** in the left sidebar.
2. Click **Access & Permissions**.
3. In the **Users** tab, locate the user you want to remove.
4. Click the **trash icon** on the right side of their row.

The user is removed immediately and disappears from the list. Their access to the vault is revoked instantly.

> **Note:** There is no confirmation dialog. Removal takes effect as soon as you click the trash icon. If you need to restore access, you can re-add them using the **Add User** form.

---

## Removing a Pending User

You can also remove a **Pending** user — one who has been invited but has not yet accepted. Clicking the trash icon on a Pending row cancels their invitation. The invitation link they received by email will no longer work.

---

## What Happens After Removal

- The removed user loses access to the vault immediately.
- Their Graphium account is not deleted. They retain access to the workspace and any other vaults they belong to.
- Any records or data they created in the vault remain intact — only their access is revoked, not their contributions.
- To restore their access, use the **Add User** form to re-add them with the appropriate role.

---

## Permissions

| Role | Can Remove Users from a Vault |
|------|-------------------------------|
| Admin | ✅ |
| Builder | ❌ |
| Contributor | ❌ |
| Viewer | ❌ |

---

## Related Articles

- [Viewing All Users with Vault Access](/graphium/vaults/viewing-all-users-with-vault-access)
- [Adding a User to a Vault](/graphium/vaults/adding-a-user-to-a-vault)
- [Changing a Users Vault Role](/graphium/vaults/changing-a-users-vault-role)
- [Understanding Vault User Roles](/graphium/vaults/understanding-vault-user-roles)
