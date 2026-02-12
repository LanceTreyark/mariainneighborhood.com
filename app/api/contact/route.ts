import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail",
    });

    const toAddress = process.env.CONTACT_TO || "mariaintheneighborhood@gmail.com, treyarkmedia@gmail.com";
    const fromAddress = process.env.CONTACT_FROM || "service@vineform.com";

    const plainText = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px">New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="margin:16px 0;border:none;border-top:1px solid #ddd"/>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `;

    await transporter.sendMail({
      to: toAddress,
      from: fromAddress,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: plainText,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV === "development"
            ? err?.message || "Failed to send message"
            : "Failed to send message",
      },
      { status: 500 }
    );
  }
}
