# Access & Permissions

Graphium is designed for teams, and teams mean different people need different levels of access. The practice manager who configures the vault structure should not have the same interface as the provider who just needs to enter case data. The external auditor reviewing records should not be able to edit anything at all.

Access and permissions in Graphium work at two levels: the workspace level (who can see what across your entire workspace) and the vault level (who can do what inside a specific vault). This doc covers both.

---

## Vault Roles

Every user in a vault has one of four roles. These roles determine what they can see and do within that specific vault.

**Admin.** Full access to everything. Admins can manage the vault itself -- rename it, delete it, configure settings. They can manage users, assign roles, create and modify tables, build workflows, configure AI assistants, and of course add and edit data. If something can be done in the vault, an Admin can do it. This is the role for practice managers, IT leads, and whoever is responsible for how the vault is set up.

**Builder.** The structural role. Builders can create and modify tables, define schemas, build workflows, and configure forms. They can also add and edit data. What they cannot do is manage vault-level settings or control user access. Think of Builders as the people who design how data flows through the vault -- your billing team lead who sets up the charge capture workflow, or your operations manager who configures the provider schedule table.

**Contributor.** The data entry role. Contributors can add records, edit existing data, and work within the structure that Builders have created. They cannot modify table schemas, create workflows, or change the vault's configuration. This is the right role for providers entering case data, staff submitting forms, or anyone whose job is to work with the data rather than shape the system around it.

**Viewer.** Read-only access. Viewers can see data but cannot change anything -- no adding records, no editing fields, no modifying structure. This role exists for auditors, external reviewers, stakeholders who need visibility, or anyone who should be able to look but not touch.

---

## Managing Users

User management lives under **Settings > Access & Permissions** in the vault sidebar. You will see two tabs: **Users** and **Teams**.

### Users Tab

The Users tab shows a list of everyone who has access to the vault: their name, email, and assigned role. From here you can:

**Add a user.** Click the add user option and enter an email address. If that person already belongs to your workspace, they will be added to the vault immediately. If they are new, they will receive an invitation. Invited users who have not yet accepted show up in the list with a **"Pending"** badge next to their name, so you can see at a glance who has access and who is still waiting to join.

**Change a role.** Each user has a role dropdown. Adjust it to promote or demote someone -- say, moving a Contributor up to Builder when they take on workflow configuration responsibilities, or moving a Builder down to Contributor when the setup phase is done.

**Remove a user.** If someone no longer needs access to the vault, remove them from the list. This does not affect their access to other vaults in the workspace.

### Teams Tab

The Teams tab lets you organize users into groups. Instead of assigning roles one person at a time, you can create a team (like "Billing" or "Providers"), add members to it, and manage access at the group level. This is especially useful in larger practices where you have dozens of users and role assignments need to be consistent across the team.

---

## Builder vs. Contributor Mode

Beyond role-based permissions, Graphium has a practical UI distinction between two working modes. The footer of the vault shows **"Builder"** and **"+ Contributor"** buttons that let you switch between them.

**Builder mode** shows the full configuration interface. You see schema editors, workflow builders, assistant configuration panels, and all the structural tools. This is the mode where you design the vault -- define what fields exist in a table, set up a workflow trigger, configure an AI assistant's system prompt.

**Contributor mode** shows a streamlined data entry interface. The structural tools are hidden. You see the tables, the forms, and the data -- everything you need to add and edit records, nothing you do not need. The interface is cleaner and more focused.

The typical pattern is this: Builders set up the vault during the initial configuration phase -- creating tables, defining schemas, building workflows, connecting external systems. Once the structure is in place, the day-to-day users switch to Contributor mode (or are assigned the Contributor role) and work within that structure. Builder mode is for setup and maintenance. Contributor mode is for daily operations.

---

## Workspace-Level Access

Vaults exist inside workspaces, and workspaces are the top-level container for everything in Graphium.

**Workspaces** represent your practice, company, or group. "Urban Health Partners" is one workspace. "Allied Health Group" is another. Each workspace has its own vaults, assistants, settings, and user list. Data does not cross between workspaces.

**Switching workspaces.** If you belong to multiple workspaces -- say you manage Urban Health Partners but also consult for Graphium Corporate -- use the dropdown in the header to switch between them. Each workspace has its own context, and switching changes your entire view.

**Workspace Settings.** The gear icon in the header opens workspace-level configuration. This is where workspace-wide settings live, separate from vault-specific settings.

**Multi-workspace users.** A single user account can belong to multiple workspaces with different roles in each. You might be an Admin in your primary practice's workspace and a Viewer in a partner workspace where you just need to review data.

---

## Putting It Together

Here is a practical scenario showing how access and permissions work in a healthcare practice.

Dr. Patel is the practice manager at Urban Health Partners. She creates a new vault for Community Surgery Center and is automatically assigned the **Admin** role. She configures the basic settings -- vault name, description -- and then starts building.

She gives her billing team lead, Marcus, **Builder** access. Marcus sets up the Cases table schema, creates workflows for missing-info detection and case review alerts, and configures the AI assistant that monitors billing compliance. He works in Builder mode for a couple of weeks during the setup phase.

Once the structure is solid, Dr. Patel invites the practice's CRNAs and anesthesiologists as **Contributors**. They get the streamlined Contributor mode interface -- they can enter case data, submit charge tickets, and view records, but they cannot accidentally change a table schema or disable a workflow. The structure Marcus built stays intact.

Finally, Dr. Patel invites the group's external compliance auditor as a **Viewer**. The auditor can log in, review case records, check billing data, and run queries through the AI assistant -- but cannot modify a single field. Read-only access, exactly as it should be.

When Marcus finishes the initial setup, he switches to Contributor mode for his daily work too. He only switches back to Builder mode when he needs to adjust a workflow or add a new field to the schema. The rest of the time, he works in the same streamlined interface as everyone else.

Four roles. Two modes. One vault where everyone has exactly the access they need.
