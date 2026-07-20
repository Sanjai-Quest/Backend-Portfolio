import React, { useState, useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Send, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";
import { RequestPacket } from "../components/RequestPacket";
import { sendContactEmail } from "../services/email";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SubmitState =
  | { phase: "idle" }
  | { phase: "inflight" }
  | { phase: "success" }
  | { phase: "error"; status: number; message: string };

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal email-shape check matching the server-side one. */
function isValidEmailShape(value: string): boolean {
  const atIdx = value.indexOf("@");
  if (atIdx < 1) return false;
  const domain = value.slice(atIdx + 1);
  return domain.includes(".") && domain.length > 2;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmailShape(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  
  if (!values.subject.trim()) {
    errors.subject = "Subject is required.";
  }
  
  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  
  return errors;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Contact: React.FC = () => {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [submitState, setSubmitState] = useState<SubmitState>({ phase: "idle" });

  // RequestPacket animation coords
  const submitBtnRef = useRef<HTMLDivElement>(null);
  const endpointRef = useRef<HTMLDivElement>(null);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [endCoords, setEndCoords] = useState({ x: 0, y: 0 });
  const [packetTrigger, setPacketTrigger] = useState(false);

  // Honeypot ref — value is never read by React, just checked via form data
  const honeypotRef = useRef<HTMLInputElement>(null);

  const updateCoords = useCallback(() => {
    if (submitBtnRef.current && endpointRef.current) {
      const btnRect = submitBtnRef.current.getBoundingClientRect();
      const endRect = endpointRef.current.getBoundingClientRect();
      const parentRect =
        submitBtnRef.current.closest(".contact-anim-root")?.getBoundingClientRect() ??
        { left: 0, top: 0 };
      setStartCoords({
        x: btnRect.left - parentRect.left + btnRect.width / 2,
        y: btnRect.top - parentRect.top + btnRect.height / 2,
      });
      setEndCoords({
        x: endRect.left - parentRect.left + endRect.width / 2,
        y: endRect.top - parentRect.top + endRect.height / 2,
      });
    }
  }, []);

  useEffect(() => {
    updateCoords();
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, [updateCoords]);

  // Field change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormValues]) {
      // Re-validate on the fly once a field has been touched
      setErrors(validate({ ...values, [name]: value }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate({ ...values, [name]: e.target.value }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all touched
    setTouched({ name: true, email: true, subject: true, message: true });
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Start in-flight
    updateCoords();
    setPacketTrigger(true);
    setSubmitState({ phase: "inflight" });
  };

  // Called when RequestPacket animation finishes → fire the actual EmailJS client call
  const handlePacketComplete = useCallback(async () => {
    setPacketTrigger(false);

    // Spam Honeypot check: client-side trap
    const honeypotVal = honeypotRef.current?.value ?? "";
    if (honeypotVal.trim()) {
      // Silently mimic success state for bots without sending real email
      setSubmitState({ phase: "success" });
      setValues({ name: "", email: "", subject: "", message: "" });
      setTouched({ name: false, email: false, subject: false, message: false });
      setErrors({});
      return;
    }

    try {
      // Await the actual promise response from the SDK helper
      await sendContactEmail({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });

      setSubmitState({ phase: "success" });
      setValues({ name: "", email: "", subject: "", message: "" });
      setTouched({ name: false, email: false, subject: false, message: false });
      setErrors({});
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to dispatch email via EmailJS browser SDK.";
      setSubmitState({
        phase: "error",
        status: 500,
        message: errMsg,
      });
    }
  }, [values]);

  const isInflight = submitState.phase === "inflight";

  return (
    <div className="space-y-12">
      <Helmet>
        <title>Contact — Sanjai L</title>
        <meta
          name="description"
          content="Get in touch with Sanjai L — backend engineer. Send a message, propose a collaboration, or email directly at sanjaioff@gmail.com."
        />
      </Helmet>
      
      {/* ── Page Hero ─────────────────────────────────────────────── */}
      <section className="bg-section-dark bg-blueprint-grid border border-border-primary rounded-xl p-8 md:p-12 relative overflow-hidden text-left">
        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-signature rounded-tl-xl opacity-75" />
        <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-signature rounded-tr-xl opacity-75" />
        <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-signature rounded-bl-xl opacity-75" />
        <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-signature rounded-br-xl opacity-75" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center space-x-2 select-none">
            <span className="font-mono text-[9px] font-bold text-status-mutation bg-status-mutation/5 border border-status-mutation/30 px-2 py-0.5 rounded uppercase tracking-wider">
              POST
            </span>
            <span className="font-mono text-xs text-text-secondary">
              /contact (messaging-service)
            </span>
          </div>
          <h1 className="font-mono text-xl md:text-3xl font-bold tracking-tight text-text-primary uppercase leading-tight">
            Establish Connection
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
            Send a message, propose a collaboration, or just say hello. Every
            submission triggers a real POST request to EmailJS — no simulation here.
          </p>
          {/* Always-visible mailto fallback */}
          <a
            href="mailto:sanjaioff@gmail.com"
            title="Send a direct email to sanjaioff@gmail.com"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-status-info hover:underline select-none"
          >
            <Mail className="w-3.5 h-3.5" />
            sanjaioff@gmail.com
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </section>

      {/* ── Form + Animation area ──────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form column */}
        <div className="lg:col-span-3">
          <SectionHeader title="Message Payload" eyebrow="POST /contact" />

          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            className="mt-6 space-y-5"
          >
            {/* Honeypot — off-screen, never display:none (bots skip that) */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                top: "-9999px",
                opacity: 0,
                tabIndex: -1,
                pointerEvents: "none",
              } as React.CSSProperties}
            >
              <label htmlFor="contact_url">Website</label>
              <input
                ref={honeypotRef}
                id="contact_url"
                name="_hp"
                type="text"
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact_name"
                className="block font-mono text-[10px] uppercase tracking-wider text-text-muted"
              >
                Name <span className="text-status-error">*</span>
              </label>
              <input
                id="contact_name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isInflight || submitState.phase === "success"}
                aria-describedby={errors.name ? "err_name" : undefined}
                aria-invalid={touched.name && !!errors.name}
                className={`w-full bg-bg-secondary/40 border rounded px-3 py-2.5 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                  touched.name && errors.name
                    ? "border-status-error focus:ring-status-error"
                    : "border-border-primary focus:ring-status-info focus:border-status-info"
                }`}
                placeholder="Sanjai L"
              />
              {touched.name && errors.name && (
                <p id="err_name" role="alert" className="font-mono text-[10px] text-status-error">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact_email"
                className="block font-mono text-[10px] uppercase tracking-wider text-text-muted"
              >
                Email <span className="text-status-error">*</span>
              </label>
              <input
                id="contact_email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isInflight || submitState.phase === "success"}
                aria-describedby={errors.email ? "err_email" : undefined}
                aria-invalid={touched.email && !!errors.email}
                className={`w-full bg-bg-secondary/40 border rounded px-3 py-2.5 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                  touched.email && errors.email
                    ? "border-status-error focus:ring-status-error"
                    : "border-border-primary focus:ring-status-info focus:border-status-info"
                }`}
                placeholder="hello@example.com"
              />
              {touched.email && errors.email && (
                <p id="err_email" role="alert" className="font-mono text-[10px] text-status-error">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact_subject"
                className="block font-mono text-[10px] uppercase tracking-wider text-text-muted"
              >
                Subject <span className="text-status-error">*</span>
              </label>
              <input
                id="contact_subject"
                name="subject"
                type="text"
                required
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isInflight || submitState.phase === "success"}
                aria-describedby={errors.subject ? "err_subject" : undefined}
                aria-invalid={touched.subject && !!errors.subject}
                className={`w-full bg-bg-secondary/40 border rounded px-3 py-2.5 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                  touched.subject && errors.subject
                    ? "border-status-error focus:ring-status-error"
                    : "border-border-primary focus:ring-status-info focus:border-status-info"
                }`}
                placeholder="Collaboration / Job Opportunity"
              />
              {touched.subject && errors.subject && (
                <p id="err_subject" role="alert" className="font-mono text-[10px] text-status-error">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact_message"
                className="block font-mono text-[10px] uppercase tracking-wider text-text-muted"
              >
                Message <span className="text-status-error">*</span>
              </label>
              <textarea
                id="contact_message"
                name="message"
                rows={6}
                required
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isInflight || submitState.phase === "success"}
                aria-describedby={errors.message ? "err_message" : undefined}
                aria-invalid={touched.message && !!errors.message}
                className={`w-full bg-bg-secondary/40 border rounded px-3 py-2.5 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 transition-colors resize-none disabled:opacity-50 ${
                  touched.message && errors.message
                    ? "border-status-error focus:ring-status-error"
                    : "border-border-primary focus:ring-status-info focus:border-status-info"
                }`}
                placeholder="Your message here…"
              />
              {touched.message && errors.message && (
                <p id="err_message" role="alert" className="font-mono text-[10px] text-status-error">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit row */}
            <div className="flex items-center gap-4 pt-1">
              <Button
                type="submit"
                variant="primary"
                isLoading={isInflight}
                disabled={isInflight || submitState.phase === "success"}
                icon={Send}
                aria-label="Send message"
              >
                {isInflight ? "Dispatching…" : "Send Message"}
              </Button>

              {/* Mailto always visible as fallback */}
              <a
                href="mailto:sanjaioff@gmail.com"
                title="Send a direct email — works even without JavaScript"
                className="font-mono text-[10px] text-text-muted hover:text-status-info transition-colors underline underline-offset-2"
              >
                or email directly
              </a>
            </div>
          </form>

          {/* ── Submission feedback ── */}
          <div aria-live="polite" aria-atomic="true" className="mt-0">
            {submitState.phase === "success" && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 bg-status-success/5 border border-status-success/30 rounded-lg p-4 text-left"
              >
                <CheckCircle className="w-4 h-4 text-status-success shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs font-bold text-status-success uppercase">
                    200 OK — Message Delivered
                  </p>
                  <p className="font-mono text-[10px] text-text-muted mt-0.5 leading-relaxed">
                    Your message was sent successfully. I'll reply to{" "}
                    <span className="text-text-secondary">{values.email || "your email"}</span> as soon
                    as I can.
                  </p>
                  <button
                    onClick={() => setSubmitState({ phase: "idle" })}
                    className="mt-2 font-mono text-[10px] text-status-info hover:underline focus:outline-none"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}

            {submitState.phase === "error" && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 bg-status-error/5 border border-status-error/30 rounded-lg p-4 text-left"
              >
                <AlertCircle className="w-4 h-4 text-status-error shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs font-bold text-status-error uppercase">
                    {submitState.status > 0 ? `${submitState.status}` : "Error"} —{" "}
                    Message Not Delivered
                  </p>
                  <p className="font-mono text-[10px] text-text-muted mt-0.5 leading-relaxed">
                    {submitState.message}
                  </p>
                  <p className="font-mono text-[10px] text-text-muted mt-1">
                    Try again, or email directly at{" "}
                    <a
                      href="mailto:sanjaioff@gmail.com"
                      className="text-status-info hover:underline"
                    >
                      sanjaioff@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Animation + metadata column */}
        <div className="lg:col-span-2 space-y-6">
          <SectionHeader title="Request Trace" eyebrow="LIVE PACKET" />

          {/* Animated POST packet visual */}
          <div className="contact-anim-root border border-border-primary rounded-xl bg-card-bg p-6 relative overflow-hidden min-h-[200px] flex flex-col justify-between">
            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-signature rounded-tl-xl opacity-75" />
            <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-signature rounded-tr-xl opacity-75" />
            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-signature rounded-bl-xl opacity-75" />
            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-signature rounded-br-xl opacity-75" />

            {/* Source node */}
            <div
              ref={submitBtnRef}
              className="self-start font-mono text-[10px] bg-card-bg border border-border-primary px-3 py-2 rounded uppercase select-none"
            >
              Client Origin
            </div>

            {/* Status label in middle */}
            <div className="self-center text-center space-y-1 select-none">
              <span className="font-mono text-[9px] text-signature uppercase tracking-widest">
                [emailjs.send()]
              </span>
              <div
                className={`font-mono text-[10px] font-bold uppercase ${
                  submitState.phase === "success"
                    ? "text-status-success"
                    : submitState.phase === "error"
                    ? "text-status-error"
                    : submitState.phase === "inflight"
                    ? "text-status-info animate-pulse"
                    : "text-text-muted"
                }`}
              >
                {submitState.phase === "idle" && "AWAITING PAYLOAD"}
                {submitState.phase === "inflight" && "DISPATCHING…"}
                {submitState.phase === "success" && "200 OK"}
                {submitState.phase === "error" && "ERROR"}
              </div>
            </div>

            {/* Destination node */}
            <div
              ref={endpointRef}
              className="self-end font-mono text-[10px] bg-card-bg border border-border-primary px-3 py-2 rounded uppercase select-none"
            >
              EmailJS Service
            </div>

            {/* The packet animation */}
            {packetTrigger && (
              <RequestPacket
                startCoords={startCoords}
                endCoords={endCoords}
                trigger={packetTrigger}
                onComplete={handlePacketComplete}
                color={
                  submitState.phase === "success"
                    ? "bg-status-success"
                    : "bg-status-mutation"
                }
                duration={0.8}
              />
            )}
          </div>

          {/* Request metadata */}
          <div className="border border-border-primary rounded-xl bg-card-bg p-5 font-mono text-[10px] relative text-left">
            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-signature rounded-tl-xl opacity-75" />
            <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-signature rounded-tr-xl opacity-75" />
            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-signature rounded-bl-xl opacity-75" />
            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-signature rounded-br-xl opacity-75" />
            
            <div className="space-y-3">
              <span className="text-signature uppercase tracking-widest block text-[9px]">
                [request-headers]
              </span>
              <div className="space-y-2 text-text-muted">
                {[
                  ["method", "SDK.send"],
                  ["endpoint", "EmailJS API"],
                  ["content-type", "application/json"],
                  ["x-transport", "EmailJS Browser Client"],
                  ["x-email-provider", "EmailJS Service"],
                  ["x-honeypot", "_hp (client trap)"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span>{k}:</span>
                    <span className="text-text-secondary text-right">{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-[9px] border-t border-border-primary/40 pt-2 leading-relaxed">
                Translation: this form connects directly to the EmailJS SDK client-side. The public keys and routing configuration are loaded securely from build environment variables to forward your payload directly to my inbox, protecting against spam with a client-side honeypot trap.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
