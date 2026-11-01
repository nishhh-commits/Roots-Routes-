# GreenStay OS: Smart Integration Demo

## What this is

A demonstration of how a smart meter or hotel management system feed could reach GreenStay OS.
In this prototype the feed is **simulated**. No physical meter is connected, and nothing here is live monitoring.

## Data sources

| Source | Meaning | Where it is stored |
|---|---|---|
| Demo reading | Sample monthly figures shipped with the prototype | Built into the app |
| Manual entry | Monthly totals typed into the form by hotel staff | This browser |
| Simulated device feed | Sample readings created by the "Simulate Incoming Reading" button (device ids start with `SIM-`) | This browser, or Firestore if configured |
| Connected device | Readings from a real meter through a secure server-side gateway | **Not built** |

Simulated readings are kept separate from the monthly charts and are always labelled as simulated.

## Pipeline

    source channel -> validation -> reading store -> subscription -> statistics on the dashboard

- Validation (`src/ingestion/validate.ts`) checks the resource, unit, value range, device id, and timestamp.
- The source label is decided by the channel, never by the incoming data.
- The `connected-device` channel is rejected in the browser on purpose.
- Readings have deterministic ids, so repeated submissions are detected as duplicates.
- The store (`src/ingestion/store.ts`) is an interface. Browser storage is the default; Firestore is optional.

## Firestore mode (optional)

Enabled only when the `VITE_FIREBASE_*` variables are set. Writes require a signed-in hotel owner account.
Security rules (`firestore.rules`) enforce ownership, a fixed set of fields, valid values, and no updates or deletes.
The rules allow only `manual` and `simulated-device` sources from a browser.

## What a real integration would need (not built)

1. A compatible device or gateway: a smart meter or building system that can send readings over a supported protocol, or a hotel management system with an API.
2. A secure server-side ingestion endpoint (for example a cloud function or service) that authenticates each device, for example with per-device credentials.
3. The same validation rules applied on the server, plus unit conversion for each vendor's format.
4. Writes made with server credentials that never reach the browser. This is the only path allowed to label data as `connected-device`.
5. Handling for retries, duplicate delivery, clock differences, and offline devices.
6. Monitoring, access control, and a data retention and privacy policy for hotel data.

Cloud Functions need a paid Firebase plan, so this was out of scope for a zero-budget prototype.

## Known limits

- Manual monthly totals are saved in this browser, not in Firestore.
- Browser-side validation can be bypassed by someone using developer tools. In browser storage mode that only affects their own device. In Firestore mode the security rules are the real enforcement.
- Firestore mode and the security rules have to be tested in each Firebase project before they are relied on.