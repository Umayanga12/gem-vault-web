import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export interface ContactUsEmailProps {
    title: string;
    name?: string;     // optional – not every form collects a separate name
    email: string;
    phone?: string;
    message?: string;
}

type SendResult = { success: true } | { success: false; error: string };

const EMAIL_REGEX = /^[^\s@<>()[\],;:"\\]+@[^\s@<>()[\],;:"\\]+\.[^\s@<>()[\],;:"\\]{2,}$/;

const LIMITS = {
    title: 150,
    name: 100,
    email: 254,
    phone: 30,
    message: 5000,
} as const;

/** Trim and collapse internal whitespace/control chars. */
function clean(value: string): string {
    return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim();
}

export async function sendContactUsEmail({
    title,
    name,
    email,
    phone,
    message,
}: ContactUsEmailProps): Promise<SendResult> {
    //console.log(email, name, message, phone)
    try {
        // const cleanTitle = clean(title);
        // const cleanName = clean(name ?? '');
        // const cleanEmail = clean(email).toLowerCase();
        // const cleanPhone = clean(phone ?? '');
        // const cleanMessage = clean(message ?? '');

        // if (!cleanTitle || cleanTitle.length > LIMITS.title) {
        //     return { success: false, error: `Title is required (max ${LIMITS.title} characters).` };
        // }
        // if (cleanName.length > LIMITS.name) {
        //     return { success: false, error: `Name is too long (max ${LIMITS.name} characters).` };
        // }
        // if (cleanEmail.length > LIMITS.email || !EMAIL_REGEX.test(cleanEmail)) {
        //     return { success: false, error: 'Please provide a valid email address.' };
        // }
        // if (cleanPhone.length > LIMITS.phone) {
        //     return { success: false, error: `Phone number is too long (max ${LIMITS.phone} characters).` };
        // }
        // if (cleanMessage.length > LIMITS.message) {
        //     return { success: false, error: `Message is too long (max ${LIMITS.message} characters).` };
        // }

        // const templateParams = {
        //     title: cleanTitle,
        //     name: cleanName || cleanEmail,
        //     from_name: cleanName ? `${cleanName} (${cleanEmail})` : cleanEmail,
        //     reply_to: cleanEmail,
        //     user_email: cleanEmail,
        //     phone: cleanPhone || 'Not provided',
        //     message: cleanMessage || '(none)',
        // };
        const templateParams = {
            title: title,
            name: name,
            from_name: name,
            reply_to: email,
            user_email: email,
            phone: phone || 'Not provided',
            message: message || '(none)',
        };
        //console.log(templateParams)
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });

        return { success: true };
    } catch (err: unknown) {
        const detail = err instanceof Error ? err.message : String(err);
        console.error('EmailJS error:', detail);
        return { success: false, error: 'Failed to send message. Please try again later.' };
    }
}