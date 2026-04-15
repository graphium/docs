# Creating a Vault from Scratch

> **Article type:** Product Use
> **Audience:** Internal Team
> **Status:** Draft
> **Last updated:** 2026-03-16
> **Linear issue:** [AI-12](https://linear.app/graphium/issue/AI-12/create-a-new-empty-vault-from-scratch)
> **Author:** Graphium AI Team

---

## Overview

Creating a vault from scratch gives you a blank workspace you can configure entirely to your needs. You provide a name and an optional description, and Graphium AI sets up an empty vault — no pre-loaded tables, forms, or workflows. Everything is added by you after creation.

## When to Use This

Use this workflow when you're starting a new data capture project that doesn't fit an existing vault template, or when you want full control over the vault's structure from the beginning.

## Prerequisites

- You are signed in to Graphium AI
- Your workspace role is **Workspace Owner** or **Workspace Manager** — only these roles can create vaults. If you don't have this role, ask your administrator.

---

## Step-by-Step Instructions

### Step 1: Go to the Dashboard

After signing in, you'll land on the **Dashboard**, which displays all vaults in your workspace as cards. This is your starting point.

### Step 2: Click "Create a Vault"

In the vault grid, you'll see a card with a dashed border, a **+** icon, and the label **Create a Vault** along with the description: *"A vault is your project workspace — store data, build forms, and automate workflows all in one place."*

Click anywhere on this card to open the **Create Vault** modal.

> 💡 **Tip:** If you don't see the "Create a Vault" card, you likely don't have the required workspace role. Contact your administrator.

### Step 3: Enter a Vault Name

In the **Create Vault** modal, enter a name in the **Vault Name** field (required, marked with a red asterisk).

The placeholder text gives examples: *"e.g., Patient Records, Inventory Management"* — use a descriptive name that makes it clear what data this vault will hold.

> ⚠️ **Important:** Vault names must be **unique within your workspace**. If another vault already has the same name, you'll see an error and will need to choose a different name.

### Step 4: Add a Description (Optional)

The **Description** field is optional. Use it to explain the vault's purpose — for example: *"Capture and process charge tickets and anesthesia records from Memorial Hospital."*

Descriptions appear on the vault card in the Dashboard and help team members understand what the vault is for at a glance.

### Step 5: Review the "Starting with a Clean Slate" Notice

Below the description field, a blue info box confirms:

> **Starting with a clean slate**
> *Your vault will be created empty. You can add tables, forms, and workflows after creation.*

This confirms you are creating an empty vault — no data, tables, or forms will be pre-populated. If you'd prefer a vault with pre-built structure, use **Create from Template** instead.

### Step 6: Click "+ Create Vault"

Click the **+ Create Vault** button in the bottom-right of the modal. The button becomes fully active (solid teal) once a vault name has been entered.

To discard and return to the Dashboard without creating anything, click **Cancel** or the **✕** in the top-right corner of the modal.

### Step 7: You're in Your New Vault

After clicking **+ Create Vault**, the modal closes and you are automatically navigated to your new vault's detail view. You'll see:

- The vault name and icon in the top-left header, with an edit pencil icon
- **0 records** and the current date as the last updated time
- A left sidebar with: **AI Assistant**, **Tables** (with a + to add), **Tasks**, **Automations**, and **Settings**
- A **Builder / Contributor** mode toggle at the bottom of the sidebar
- An empty main area with the message: *"No tables yet — Create a table to start storing structured data."* and a **+ Create Table** button

You are now the **Admin** of this vault. All Workspace Owners in your organization have also been automatically added as Admins.

---

## What to Do Next

Your vault is empty and ready to be configured. Common next steps from the vault detail view:

- **Add a table** — Click **+ Create Table** or the **+** next to Tables in the sidebar to define your data structure
- **Set up forms** — Navigate to a table and add a Keyboard, Photo, or Stylus form for data entry
- **Invite team members** — Go to **Settings** to add team members and assign vault roles (Builder, Contributor, Viewer)
- **Build a workflow** — Click **Automations** in the sidebar to automate what happens when records are added or updated

---

## Common Issues & Troubleshooting

| Issue | Likely Cause | Solution |
|-------|-------------|----------|
| "Create a Vault" card is not visible | Dashboard is empty or role is restricted | Scroll to check if the card is present; if missing, contact your administrator about your workspace role |
| "+ Create Vault" button stays inactive (greyed out) | Vault Name field is empty | Enter a name — the button activates once the name field has content |
| "A vault with this name already exists" error | Duplicate vault name in the workspace | Choose a unique name — all vault names within a workspace must be distinct |
| Modal closes but vault doesn't appear in Dashboard | Navigated away too quickly | Return to the Dashboard — the vault was created and should appear in the vault grid |
| Vault was created but you can't access it later | Rare: access issue | Contact your administrator; you should have been auto-assigned as Admin upon creation |

---

## Related Articles

- [Working with Vaults](/graphium/vaults/working-with-vaults)
- [Designing Forms](/graphium/forms/designing-forms)
- [Building Workflows](/graphium/automations/building-workflows)

---

*Questions? Reach out to your Graphium AI administrator or open a ticket in your internal support channel.*
