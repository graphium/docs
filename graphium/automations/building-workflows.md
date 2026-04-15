# Building Workflows

> **Article type:** Product Use
> **Audience:** Internal Team
> **Status:** Draft
> **Last updated:** 2026-03-16
> **Author:** Graphium AI Team

---

## Overview

Workflows in Graphium AI let you automate what happens after data is captured. Rather than manually routing records, notifying people, or exporting data, you can define a sequence of automated steps that run every time a new submission arrives or a condition is met. Workflows are built visually using a drag-and-drop canvas.

## When to Use This

Use this article when you want to automate a repetitive process connected to a Vault — for example, routing new form submissions for approval, triggering an export to a third-party system, assigning tasks to team members, or sending notifications when specific data conditions are met.

## Prerequisites

- You are signed in and have a Vault open
- You have edit permissions on the Vault
- Any **Connections** the workflow will use (e.g., to an external database or API) should already be configured (see [Connecting to External Data Sources])

## Key Concepts

**Trigger** — The event that starts the workflow. Common triggers include a new form submission, a record update, a scheduled time, or a manual run.

**Node** — A single step in the workflow (e.g., "Send notification," "Update record," "Export to connection," "Assign task").

**Canvas** — The visual editor where you arrange and connect nodes to build the flow.

**Branch** — A conditional split in the workflow, routing records down different paths based on field values or logic rules.

## Step-by-Step Instructions

### Step 1: Open the Workflows Section

From within your Vault, click the **Workflows** tab. The **Workflows List** shows all existing workflows for this Vault. Click **+ New Workflow** to create one.

### Step 2: Name Your Workflow

Give the workflow a descriptive name that reflects its purpose (e.g., "New Submission → Manager Review → Export to CRM"). Click **Create**.

### Step 3: Set the Trigger

The **Workflow Editor** opens with the canvas. The first node is always the **Trigger**. Click it to configure:

- **New Record Submitted** — fires whenever a form submission is received in this Vault
- **Record Updated** — fires when a specific field value changes
- **Scheduled** — fires at a recurring time (e.g., every day at 8am)
- **Manual** — fires only when a team member runs it explicitly

### Step 4: Add Action Nodes

Drag nodes from the right panel onto the canvas and connect them by drawing lines between nodes. Common action nodes include:

- **Assign Task** — creates a task and assigns it to a team member or role
- **Send Notification** — sends an in-app or email alert with record details
- **Update Record** — modifies a field value based on logic (e.g., set Status = "Under Review")
- **Export via Connection** — pushes the record to an external system through a configured Connection
- **AI Enrichment** — uses Graphium AI to fill in missing fields, classify data, or run validation
- **Branch / Condition** — splits the flow based on a field value or rule (e.g., if "Priority" = "High," follow one path; otherwise follow another)

> 💡 **Tip:** Keep workflows focused on one process. If you find yourself building a very long chain, consider splitting it into two separate workflows triggered in sequence.

### Step 5: Configure Each Node

Click any node to open its settings panel. Each node type has different configuration options:

- **Assign Task nodes** let you specify the assignee, due date, and task description (which can reference field values using `{{field_name}}` placeholders)
- **Condition nodes** let you define rules using field comparisons (equals, contains, greater than, etc.)
- **Connection nodes** let you map Vault fields to the external system's expected format

### Step 6: Test the Workflow

Before activating, click **Test Workflow** to run it against a sample record. Review each node's output to confirm it behaves as expected. Fix any configuration issues flagged in the test results.

### Step 7: Activate

Toggle the workflow to **Active** in the Workflow Editor or the Workflows List. From this point, the workflow will run automatically whenever its trigger condition is met.

## What to Expect

Once active, every eligible record will flow through the workflow automatically — no manual steps needed. You can monitor workflow runs, view execution logs, and pause or edit the workflow at any time from the Workflows List.

## Common Issues & Troubleshooting

| Issue | Likely Cause | Solution |
|-------|-------------|----------|
| Workflow not triggering | Trigger condition not matching | Double-check the trigger type and filter conditions; test with a known record |
| Task not assigned to the right person | Dynamic field reference is empty | Ensure the field used for assignment is populated in all submissions |
| Connection export fails | External system credentials expired | Re-authenticate the Connection in the Connections section |
| Workflow running but producing wrong output | Node configuration error | Open the execution log to identify which node failed and review its settings |
| Workflow is too slow | Too many sequential nodes | Restructure with parallel branches where steps don't depend on each other |

## Related Articles

- [Connecting to External Data Sources]
- [Working with Vaults](/graphium/vaults/working-with-vaults)
- [Using AI Assistants](/graphium/ai-assistant/using-ai-assistants)
- [Managing Tasks]

---

*Questions? Reach out to your Graphium AI administrator or open a ticket in your internal support channel.*
