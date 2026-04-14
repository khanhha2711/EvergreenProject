import { getEmailTemplate } from "@/lib/sendEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { type, data } = await req.json();
  const { subject, template } = getEmailTemplate({ type, data });
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["batcan0966@gmail.com"],
      subject,
      react: template,
      replyTo: "khanhha27112003@gmail.com",
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
