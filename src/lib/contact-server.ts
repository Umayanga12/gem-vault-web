// EmailJS sends email directly from the browser — no server function needed.
// This file re-exports the client-side helper so existing imports stay valid.
export { sendContactUsEmail } from './send_email';
export type { ContactUsEmailProps as ContactPayload } from './send_email';
