# Reviewer Task Script

Score the artifact from observed behaviour, not from personal visual taste.
Complete the tasks with keyboard and pointer at desktop width, then inspect the
main booking path at a narrow mobile width. Record blocked or unreachable states
as observations; do not repair the app or inspect its source.

Before each numbered task, ask the operator to enter `reset` in the review
launcher and reload the app.

## Test data

- Full name: `Sam Taylor`
- Email: `sam@example.test`
- Mobile: `0412 345 678`
- Optional note: `Please call if the appointment time changes.`
- Existing fictional booking reference: `HCC-4821`

## Tasks

1. Book the first available General appointment by email. Move backwards once
   before confirming and check whether your choices remain understandable.
   Review the service, duration, local date/time, and contact details before
   submission. Confirm the booking and inspect the result.
2. Start again. Try an invalid email, then change contact method to SMS and try
   an invalid mobile number. Confirm that invalid details cannot be submitted and
   that correction guidance is understandable. Enter valid data and continue.
3. Prepare a new booking up to final commitment. Ask the operator for
   `fail create slot`, submit, and try to recover without unnecessary re-entry.
   Repeat after reset with `fail create retryable`.
4. Open the supplied existing booking. Begin rescheduling, compare the original
   appointment with the proposed time, then leave the reschedule flow without
   committing if the interface permits it. Repeat and ask the operator for
   `fail reschedule retryable`; inspect recovery. Then complete a successful
   reschedule after another reset.
5. Open the supplied existing booking and begin cancellation. Check whether the
   affected appointment and consequence are clear and whether cancellation can
   be escaped. Ask the operator for `fail cancel retryable`, submit, and inspect
   the truthful recovery state. Then complete a successful cancellation after
   another reset.
6. Repeat the main booking path using only the keyboard. Observe focus order,
   visible focus, validation focus, state transitions, and any overlays. At a
   narrow mobile width, inspect target size, information hierarchy, wrapping,
   clipping, and horizontal scrolling.

After completing the tasks, score U01-U10 independently using the supplied
template and frozen rubric wording.
