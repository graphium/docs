# Adding a User to a Vault

**Linear issue:** AI-579
**Linear project:** Vault/Workspace Settings: User Permissions
**Article type:** How-to

---

## Overview

Vault Admins can grant access to a vault by searching for a workspace member in the **Access & Permissions → Users** tab. Only existing workspace members can be added to a vault — if someone needs to be invited to the workspace first, see [Inviting a User to the Workspace](Inviting%20a%20User%20to%20the%20Workspace.md).

---

## Steps

1. Open the vault and click **Settings** in the left sidebar.
2. Click **Access & Permissions**.
3. The **Users** tab opens by default. Click the **Add User** button at the top of the page.
4. An **Add Member** panel appears. In the search box, type the name or email address of the workspace member you want to add.
5. Select the member from the search results.
6. Choose their vault role from the role dropdown (defaults to **Contributor**).
7. Click **Add Member**.

The person is added to the vault immediately and can access it on their next visit.

---

## Assigning a Role

You can set the member's role at the time of adding using the role dropdown in the **Add Member** panel. The default role is **Contributor**. To change their role later, use the role dropdown on their user row. See [Changing a Users Vault Role](Changing%20a%20Users%20Vault%20Role.md) for details.

The four available roles are:

| Role | Description |
|------|-------------|
| **Admin** | Full access to manage vault, users, and all data |
| **Builder** | Can create and modify tables, forms, and workflows |
| **Contributor** | Can add and edit data, but cannot modify structure |
| **Viewer** | Read-only access to view data |

---

## What Happens After Adding

The person is added to the vault instantly and can access it on their next visit. No email notification is sent.

---

## Permissions

| Role | Can Add Users to a Vault |
|------|--------------------------|
| Admin | ✅ |
| Builder | ❌ |
| Contributor | ❌ |
| Viewer | ❌ |

---

## Related Articles

- [Viewing All Users with Vault Access](/graphium/vaults/viewing-all-users-with-vault-access)
- [Understanding Vault User Roles](/graphium/vaults/understanding-vault-user-roles)
- [Changing a Users Vault Role](/graphium/vaults/changing-a-users-vault-role)
- [Removing a User from the Vault](/graphium/vaults/removing-a-user-from-the-vault)
