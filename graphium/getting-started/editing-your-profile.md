# Editing Your Profile

**Linear issue:** AI-146
**Linear project:** User Profile: Profile Management
**Article type:** How-to

---

## Overview

You can update your display name and email address at any time from the profile menu in the top-right corner of the navigation bar. Changes apply to your account immediately and are reflected across the application once saved.

---

## Opening the Edit Profile View

1. Click your **name or avatar** in the top-right corner of the navigation bar. The profile dropdown opens, showing your current display name and email address.
2. Click **Edit Profile**. The profile editing view opens.

The profile dropdown is accessible from every page in Graphium AI — the dashboard, inside any vault, and all other views.

---

## Editable Fields

The Edit Profile form contains the following fields:

| Field | Description |
|-------|-------------|
| **Username** | Your display name as shown in the navigation bar and profile block. |
| **Email** | The email address associated with your account, used for sign-in and notifications. |

Both fields are optional to change — you can update one without modifying the other.

---

## Saving Your Changes

1. Update the **Username**, **Email**, or both fields as needed.
2. Click **Save** (or the equivalent confirm action). Your changes are submitted to Graphium AI.
3. On success, the profile view closes and your updated information is reflected in the navigation bar and profile block immediately.

> **Note:** If you change your email address, you may be required to verify the new address before it becomes active, depending on your organization's authentication configuration.

---

## Validation and Error Handling

Graphium AI validates your input before saving:

- **Invalid username** — if the username format is not accepted, an error message will appear below the field. Correct the value and try again.
- **Invalid email** — if the email address is malformed or already in use, an error message will appear below the field. Enter a valid, unique email address and try again.

If the save request fails due to a network or server issue, an error message will appear. Your existing profile information remains unchanged until a successful save is completed.

---

## Who Can Edit Their Profile

All authenticated users can edit their own profile, regardless of their role within a workspace. Editing your profile affects only your own account — it does not change information for other users.

| Role | Can Edit Own Profile |
|------|---------------------|
| Workspace Owner | ✅ |
| Workspace Manager | ✅ |
| Form Editor | ✅ |
| Form Viewer | ✅ |
| Integration Manager | ✅ |

---

## Related Articles

- [Viewing Your Profile](/graphium/getting-started/viewing-your-profile)
- [Logging Out of Graphium AI](/graphium/getting-started/logging-out-of-graphium-ai)
- [Signing In with Email and Password](/graphium/getting-started/signing-in-with-email-and-password)
