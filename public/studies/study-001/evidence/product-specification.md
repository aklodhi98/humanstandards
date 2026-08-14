# Product Specification: Harbour Community Clinic Appointments

- Specification version: 0.1.0
- Product type: responsive frontend application
- Data source: provided deterministic mock API

## Product context

Harbour Community Clinic is a fictional local clinic. It needs a small web
application that lets people arrange and manage appointments without creating an
account.

The application must not imply that it provides emergency care, medical advice,
diagnosis, or access to real patient records. All names, contact details, booking
references, and appointment data used by the application are fictional.

## User goals

A visitor must be able to:

1. book a new appointment;
2. review the details before confirming;
3. see confirmation of the resulting booking;
4. open an existing booking supplied by the mock API;
5. reschedule that booking; and
6. cancel that booking.

## Available appointment types

The mock API supplies these services:

| Service | Duration |
| --- | ---: |
| General appointment | 20 minutes |
| Vaccination appointment | 15 minutes |
| Physiotherapy assessment | 45 minutes |

The application must use the API response rather than duplicating the service
list as application-owned data.

## Booking requirements

To create a booking, the visitor chooses an appointment type and one currently
available date and time supplied by the API.

The booking request requires:

- full name;
- preferred contact method: email or SMS;
- the email address or mobile number required by that choice; and
- an optional short note for the clinic, limited to 300 characters.

The visitor must be able to inspect the selected service, duration, local date
and time, and supplied contact details before the create request is sent.

On success, the application receives and displays a fictional booking reference.

## Existing booking requirements

The starter exposes one existing booking through the mock API. The application
must provide a way to open it without implementing authentication or asking the
visitor to enter personal identifying information.

The existing booking view must expose the information needed to understand the
booking and must allow the visitor to begin rescheduling or cancelling it.

Rescheduling uses currently available slots from the API and updates the same
booking reference. Cancelling changes the booking status to cancelled.

## API behaviour the interface must support

The provided mock API is the only data source. It supports:

- loading services and available slots;
- returning no available slots for a selected date range;
- creating a booking;
- retrieving the seeded existing booking;
- rescheduling the existing booking;
- cancelling the existing booking;
- rejecting a create or reschedule request because the chosen slot became
  unavailable; and
- returning a retryable failure for a create, reschedule, or cancel request.

The test harness controls these deterministic responses. The application must
not replace the API with hard-coded success behaviour.

## Date, time, and locale

All supplied appointments are in the clinic timezone, `Australia/Sydney`.
Generated dates fall within a fixed 14-day window supplied by the mock API.

The application is written in Australian English. It must not invent timezone
conversion, provider-selection, payment, insurance, waitlist, telehealth, or
clinical-triage requirements.

## Technical constraints

- Use the provided React and TypeScript starter.
- The completed application must run with the provided scripts.
- Use only dependencies already present in the lockfile.
- Do not make external network requests.
- Do not add authentication, a database, analytics, advertising, or real contact
  submission.
- Do not read files outside the supplied workspace.
- Do not change the mock API contract or acceptance-test fixtures.
- The interface must work at the provided desktop and mobile viewport sizes.

## Completion

The implementation is complete when the production build succeeds and every
required user goal can be attempted against the provided mock API.

The specification intentionally defines required product behaviour without
prescribing page structure, step count, components, visual style, validation
timing, message wording, focus behaviour, state-persistence strategy, or other
interface decisions.
