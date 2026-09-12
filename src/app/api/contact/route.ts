import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const serviceId =
      process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId =
      process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey =
      process.env.EMAILJS_PUBLIC_KEY ||
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      process.env.EMAILJS_USER_ID;

    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json(
        {
          error:
            "EmailJS credentials are not configured on the server. Please add EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    // Call EmailJS REST API directly from the server
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name,
          from_name: name,
          email,
          from_email: email,
          reply_to: email,
          message,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("EmailJS API Error:", errorText);
      return NextResponse.json(
        { error: "Failed to send email through EmailJS service." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
