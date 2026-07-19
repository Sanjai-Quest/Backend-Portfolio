import emailjs from "@emailjs/browser";

export interface EmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends a contact form email using the EmailJS Browser SDK.
 * Note: The VITE_ prefixed environment variables are read from import.meta.env
 * and are compiled into the client-side JavaScript bundle by design. These are
 * public configuration values required to route the email correctly.
 */
export const sendContactEmail = async (params: EmailParams): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS configuration is missing. Ensure VITE_EMAILJS variables are defined.");
  }

  // Map lowercase variable names exactly as expected by the EmailJS template variables
  const templateParams = {
    name: params.name,
    email: params.email,
    subject: params.subject,
    message: params.message,
  };

  await emailjs.send(serviceId, templateId, templateParams, publicKey);
};
