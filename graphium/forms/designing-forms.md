# Designing Forms

> **Article type:** Product Use
> **Audience:** Internal Team
> **Status:** Draft
> **Last updated:** 2026-03-16
> **Author:** Graphium AI Team

---

## Overview

Forms are how data gets captured in Graphium AI. Every Vault can have one or more forms, each tailored to a different capture method or workflow step. Graphium supports three form design modes: **Keyboard** (traditional typed input), **Photo** (scan paper forms with a camera), and **Stylus** (handwrite directly on a digital form). This article covers how to create and configure forms using all three approaches.

## When to Use This

Use this article when setting up a new form within a Vault, switching form modes, or adjusting an existing form's fields and layout.

## Prerequisites

- You are signed in and have a Vault open
- You have edit permissions on the Vault
- For Photo or Stylus forms, the relevant device (phone camera or stylus device) should be available for testing

## Understanding the Three Form Modes

**Keyboard Form** — A traditional digital form where data entry staff type information using a keyboard. Best for office environments where data is already in digital or legible print format.

**Photo Form** — Designed for scanning physical paper documents. Team members photograph the form with a mobile device, and Graphium's AI automatically extracts the field values. Ideal for high-volume paper form digitization.

**Stylus Form** — Allows users to hand-write directly onto a digital form using a stylus or touch device. The AI converts handwriting to structured data. Good for field teams or environments where keyboard input is impractical.

## Step-by-Step Instructions

### Step 1: Open the Forms Manager

From within a Vault, navigate to the **Forms** tab in the Vault Detail view. This opens the **Forms Manager**, which lists all forms associated with that Vault.

### Step 2: Create a New Form

Click **+ New Form**. You'll be prompted to:

1. Give the form a name (e.g., "Patient Intake — Photo Capture")
2. Choose a form mode: **Keyboard**, **Photo**, or **Stylus**

### Step 3A: Building a Keyboard Form

If you selected **Keyboard**, the **Form Builder** opens with a drag-and-drop interface. Add fields from the panel on the right by clicking or dragging them onto the canvas. Field types include:

- Text (short or long)
- Number
- Date / Time
- Dropdown / Select
- Checkbox
- Signature
- Calculated field

Arrange fields in the order that makes sense for the person filling in the form. Use section headers to group related fields. Click any field to edit its label, placeholder text, validation rules, and whether it's required.

> 💡 **Tip:** Map each form field to a corresponding Vault schema field using the field settings panel. This ensures captured data populates the right columns in your Table View.

### Step 3B: Building a Photo Form

If you selected **Photo**, the **Photo Form Designer** opens. Here you:

1. Upload a sample image of the paper form you want to capture (or take a photo)
2. Draw bounding boxes around each field on the form image
3. Label each box with the corresponding Vault field name
4. Set the expected data type for each field (text, number, date, etc.)

Graphium's AI uses these bounding box annotations to know where to look when processing real photos submitted by the team.

> 💡 **Tip:** Use a clean, high-contrast scan as your reference image for the best AI extraction accuracy.

### Step 3C: Building a Stylus Form

If you selected **Stylus**, the **Stylus Form Designer** opens with a blank canvas. Design the form layout by:

1. Adding labeled fields and input zones to the canvas
2. Setting field types and sizes
3. Optionally locking sections that should not be written on (like headers or logos)

Users will see this layout on their touch device and write directly into the designated zones.

### Step 4: Preview and Test

Before publishing, click **Preview** to see how the form looks in use. For Photo and Stylus forms, use the built-in test image or stylus input to verify that AI extraction is working correctly.

### Step 5: Save and Activate

Click **Save** to store the form. Toggle the form to **Active** status in the Forms Manager to make it available to your team.

## What to Expect

Once a form is active, team members can access it from their device to capture data. All submissions flow directly into the Vault as new records, which you can review in the **Table View** or trigger downstream **Workflow** steps.

## Common Issues & Troubleshooting

| Issue | Likely Cause | Solution |
|-------|-------------|----------|
| Photo extraction is inaccurate | Poor image quality or bounding boxes too small | Re-annotate with tighter bounding boxes; ensure the reference image is high resolution |
| Fields not saving to the right Vault column | Field-to-schema mapping not set | Open field settings and select the correct Vault schema field from the mapping dropdown |
| Stylus input not recognized | Handwriting recognition threshold too low | Adjust the confidence threshold in form settings, or re-test with clearer handwriting |
| Form not visible to team members | Form is in Draft status | Toggle the form to Active in the Forms Manager |

## Related Articles

- [Smart Photo Capture](/graphium/forms/smart-photo-capture)
- [Working with Vaults](/graphium/vaults/working-with-vaults)
- [Viewing Data in Table View]
- [Importing Data into a Vault]

---

*Questions? Reach out to your Graphium AI administrator or open a ticket in your internal support channel.*
