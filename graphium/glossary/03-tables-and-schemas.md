# Tables & Schemas

## What Tables Are

Tables are the structured data layer inside a vault. Each table represents a specific type of information -- Cases, Procedures, Providers, Surgeons -- with a defined schema that describes what fields exist and how they are organized.

If you have worked with databases, the concept is familiar: rows are records, columns are fields. But Graphium tables have one important difference -- their schemas are hierarchical. Fields can be nested inside groups, creating a JSON-like structure where a top-level group called "Patient Demographics" can contain child fields like Date of Birth, Gender, and Insurance. This lets you model real-world data relationships without flattening everything into a single row of dozens of columns.

A single vault typically has many tables. The Community Surgery Center vault, for example, includes Cases (the primary data table), Procedures (reference data with CPT codes), Providers, Surgeons, Surgical Locations, Substances, Patient Allergies, Expenses, Key Metrics, and Invoices. Each table has its own schema, its own records, and its own settings.

## The Three Table Tabs

When you open a table, you see three tabs across the top: Data, Schema, and Settings.

### Data Tab

The Data tab is the default view. It shows your records in a familiar tabular format -- column headers across the top, rows of data below. If your Cases table has 300 records, you will see a pagination indicator reading "Showing 50 of 300 records" with a "Load More" button to fetch the next batch.

Columns correspond to the top-level fields in your schema. For a Cases table, you might see columns for Case ID, Patient Name, MRN, Case Date, Procedure Codes, Procedure Duration, Provider, and Status. Records display their values in each column, and you can scroll horizontally if the table has more columns than the screen can fit.

Some tables also support adding records directly. Reference tables like Procedures may show an "+ Add Procedure" button for entering new entries inline.

### Schema Tab

The Schema tab shows the table's structure -- the list of properties (fields) that define what data the table holds. Each property is displayed with three attributes:

- **Name** -- The human-readable label (e.g., "Patient Name," "Case Date," "Patient Demographics")
- **Key** -- The machine-readable identifier in snake_case (e.g., `patient_name`, `case_date`, `patient_demographics`)
- **Type** -- The data type (Text, Number, Date, Group, Reference, etc.)

The schema view is hierarchical. Group fields can be expanded to reveal their child fields, showing the nesting structure visually. A search bar at the top ("Search properties...") lets you filter the property list when you have a large schema.

The schema also displays metadata at the top: the total field count (e.g., "11 Fields"), whether the schema is read-only, and which connection manages it.

### Settings Tab

The Settings tab handles table-level configuration. This is where you manage the table's name, behavior, and integration details.

## Field Types

Graphium supports a range of field types to model different kinds of data. Here is each type with a practical example from healthcare practice management.

### Text

A plain text string. Use it for names, identifiers, and any freeform alphanumeric data.

- **Patient Name** -- "Johnson, Maria"
- **MRN** (Medical Record Number) -- "MRN-45821"
- **Gender** -- "Female"

### Number

A numeric value, either integer or decimal. Use it for quantities, durations, and measurements.

- **Procedure Duration** -- 145 (minutes)
- **Duration** -- 90 (minutes)
- **Base Units** -- 6

### Date

A calendar date. Use it for anything tied to a specific day.

- **Case Date** -- 2026-03-15
- **Date of Birth** -- 1984-07-22

### Time

A time-of-day value. Use it for timestamps within a day, separate from the date.

- **Start Time** -- 07:30
- **End Time** -- 09:15

### Group

A container that holds child fields, creating the hierarchical nesting that makes Graphium schemas more expressive than flat spreadsheets. A group does not hold data itself -- it organizes related fields together.

- **Patient Demographics** (Group)
  - Date of Birth (Date)
  - Gender (Text)
  - Insurance (Text)

This is the JSON-like structure in action. Instead of having Date of Birth, Gender, and Insurance floating as unrelated columns, they are gathered under Patient Demographics, making the schema self-documenting and easier to navigate.

### Text[]

An array of text values -- a single field that holds multiple entries. Use it when a record can have a variable number of values for one concept.

- **Procedure Codes** -- ["00142", "01992", "99140"] (multiple CPT codes for a single case)

### Reference

A link to a record in another table -- the equivalent of a foreign key in a relational database. References create relationships between tables without duplicating data.

- **Provider** -- References the Providers table (so a case record points to a specific provider record rather than storing the provider's details inline)
- **Surgeon** -- References the Surgeons table

### Image

An image field for storing photographs, documents, or any visual record attached to a record.

- **Charge Ticket** -- A photo of the paper charge ticket attached to a case record for reference.

### Signature

A digital signature capture field. Use it for compliance and authorization workflows where a provider or patient needs to sign off.

- **Provider Signature** -- The attending provider's digital signature confirming the case record.

### Auto ID

An automatically generated identifier assigned to each new record. You do not enter this manually -- the system creates it when a record is added.

- **Case ID** -- Auto-assigned sequential or formatted identifier (e.g., "CSC-2026-04382")

## Read-Only and Managed Schemas

Not every table's schema is yours to edit. When a table's structure is owned by an external connection -- like Graphium EMR or an integrated system -- the schema is marked as **read-only**. You will see a "Read-only" indicator at the top of the Schema tab, along with a badge stating which source manages it (e.g., "Managed by Graphium EMR").

This means the fields, their names, their types, and their hierarchy are controlled by the external system. You can view the schema and browse the data, but you cannot add, remove, or rename fields. This is intentional: it keeps the schema in sync with the source system so data flowing in through the connection always matches the expected structure.

If you need to add custom fields for your own tracking (fields that do not exist in the source system), the typical pattern is to create a separate table in the vault and use Reference fields to link back to the managed table.

## Adding Tables and Fields

To add a new table, use the "+ Add Table" button in the vault's sidebar, under the Tables section. You will give the table a name and then start defining its schema by adding fields.

When adding fields, you pick a name, a key (the snake_case identifier), and a type. You can nest fields inside Group fields to create hierarchy. The schema editor lets you reorder fields and add new ones at any level of the hierarchy.

You can also search your existing properties using the "Search properties..." bar at the top of the Schema tab -- useful when your table has dozens of fields and you need to find or verify a specific one.

## Importing Records

If you already have data in a spreadsheet or another system, you can bring it into a table using the **Import** button on the Data tab. This lets you upload records in bulk rather than entering them one at a time.

Import is especially useful when you are setting up a new vault and need to seed it with historical data -- for example, loading last year's case records into a fresh Cases table so your AI assistant has enough data to generate meaningful reports from day one.

## Table Metadata

Each table carries metadata that tells you where its structure comes from and how it is managed:

- **Managed-by badge** -- If an external connection owns the schema, a badge shows the source (e.g., "Managed by Graphium EMR"). This also means the schema is read-only.
- **Field count** -- A count displayed on the Schema tab (e.g., "11 Fields") so you can quickly gauge the table's complexity.

## Scenario: Reviewing the Cases Schema

A quality assurance team at Urban Health Partners needs to understand how patient data is structured in their Cases table before building a compliance report. They open the Cases table in the Community Surgery Center vault and switch to the Schema tab.

At the top, they see "11 Fields" -- confirming this table has a manageable, well-defined structure.

Scanning the property list, they see top-level fields like Case ID (Auto ID), Case Date (Date), and Procedure Duration (Number). Then they notice a Group field called Patient Demographics. Expanding it, they find Date of Birth (Date), Gender (Text), and Insurance (Text) nested inside. This tells them that patient demographic data is not scattered as loose columns -- it is logically grouped, which will matter when they configure the AI assistant to pull compliance reports filtered by insurance type.

They also see a Provider field typed as Reference, pointing to the Providers table. This means provider details (name, credentials, NPI) are not duplicated in every case record -- instead, each case points to a single provider record, keeping the data clean.

Further down, they find Procedure Codes typed as Text[] -- an array, because a single case can involve multiple CPT codes. And at the bottom, Charge Ticket (Image) and Provider Signature (Signature) -- the fields that capture the scanned paper ticket and the attending physician's sign-off.

With this understanding of the schema, the quality team can now configure their AI assistant to ask the right questions: "Show me all cases this month where Provider Signature is missing" or "List cases where Procedure Duration exceeds 240 minutes and Insurance is Medicare." The schema is the map; the assistant uses it to navigate the data.
