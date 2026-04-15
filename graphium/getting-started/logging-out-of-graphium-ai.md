# Logging Out of Graphium AI

You can log out of Graphium AI at any time from any page in the application. Logging out ends your session, clears your authentication tokens, and returns you to the sign-in screen.

---

## How to Log Out

1. Click your name in the top-right corner of the navigation bar (shown as your display name with a two-letter avatar, e.g., **DD** for Daniel Dura).
2. A dropdown menu opens showing your name, email address, **Edit Profile**, and **Log Out**.
3. Click **Log Out** (shown in red at the bottom of the menu).
4. Your session is cleared and you are redirected to the Graphium AI sign-in page.

The logout process typically completes within a few seconds. The profile menu is accessible from every page in the application — the dashboard, inside any vault, and all other views.

---

## What Happens When You Log Out

When you click Log Out, Graphium AI calls the logout endpoint, which clears your authentication cookies and invalidates your session token with the authentication service. No application data is deleted — your vaults, tables, and records remain intact and will be available the next time you sign in.

After logout, you will not be able to navigate back to any protected page without signing in again. If you press the browser's back button after logging out, you will be redirected to the sign-in page.

---

## Who Can Log Out

All user roles can log out, including Workspace Owner, Workspace Manager, Form Editor, Form Viewer, and Integration Manager.

---

## Troubleshooting

**The Log Out option is not visible in the menu.**
Make sure you are clicking on your name or avatar in the top-right corner of the navigation bar, not the workspace name on the left side of the navigation bar.

**I clicked Log Out but nothing happened / I received an error.**
If the logout request fails (for example, due to a network issue), an error message will appear. Wait a moment and try clicking Log Out again. If the issue persists, closing your browser will also end your local session.

**I was logged out unexpectedly.**
Sessions expire automatically after a period of inactivity. If you were redirected to the sign-in page without clicking Log Out, your session may have timed out. Sign in again to continue.

---

## Related Articles

- Signing In with Email and Password
- Requesting a Password Reset
- Getting Started — Managing Your Profile
