import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const segmentId = process.env.RESEND_SEGMENT_ID;

const LOGO_SVG_BASE64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmdHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzEyMTUxZiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDgwOTBkIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9ImVsZWN0cmljR2xvdyIgeD0iLTIwJSIgeT0iLTIwJSIgd2lkdGg9IjE0MCUiIGhlaWdodD0iMTQwJSI+CiAgICAgIDxmZURyb3BTaGFkb3cgZHg9IjAiIGR5PSIwIiBzdGREZXZpYXRpb249IjEyIiBmbG9vZC1jb2xvcj0iIzNiODJmNiIgZmxvb2Qtb3BhY2l0eT0iMC42Ii8+CiAgICA8L2ZpbHRlcj4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibmV1cmFsU3Ryb2tlIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI2MCUiIHN0b3AtY29sb3I9IiM2MGE1ZmEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzNiODJmNiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgoKICA8cmVjdCB4PSIxNiIgeT0iMTYiIHdpZHRoPSI0ODAiIGhlaWdodD0iNDgwIiByeD0iMTA4IiBmaWxsPSJ1cmwoI2JnR3JhZCkiIHN0cm9rZT0iIzFlMjkzYiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHJlY3QgeD0iMzIiIHk9IjMyIiB3aWR0aD0iNDQ4IiBoZWlnaHQ9IjQ0OCIgcng9IjkyIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEuNSIvPgoKICA8cGF0aCBkPSJNMjIwIDEyMCBMMzMwIDEyMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cGF0aCBkPSJNMzAwIDEyMCBMMzAwIDI4MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KCiAgPHBhdGggZD0iTTMwMCAyODAgUTMwMCAzNjAgMjIwIDM2MCBMMTgwIDM2MCIgCiAgICAgICAgc3Ryb2tlPSJ1cmwoI25ldXJhbFN0cm9rZSkiIAogICAgICAgIHN0cm9rZS13aWR0aD0iMTYiIAogICAgICAgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgCiAgICAgICAgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIKICAgICAgICBmaWxsPSJub25lIiAKICAgICAgICBmaWx0ZXI9InVybCgjZWxlY3RyaWNHbG93KSIvPgoKICA8cGF0aCBkPSJNMjgwIDMxMCBMMjMwIDM2MCBMMTgwIDMxMCIgCiAgICAgICAgc3Ryb2tlPSIjM2I4MmY2IiAKICAgICAgICBzdHJva2Utd2lkdGg9IjQiIAogICAgICAgIHN0cm9rZS1kYXNoYXJyYXk9IjYgNiIgCiAgICAgICAgc3Ryb2tlLW9wYWNpdHk9IjAuNyIKICAgICAgICBmaWxsPSJub25lIi8+CgogIDxjaXJjbGUgY3g9IjI4OCIgY3k9IjMwNCIgcj0iMTAiIGZpbGw9IiMzYjgyZjYiIC8+CiAgPGNpcmNsZSBjeD0iMjg4IiBjeT0iMzA0IiByPSI1IiBmaWxsPSIjZmZmZmZmIiAvPgoKICA8Y2lyY2xlIGN4PSIyMzAiIGN5PSIzNjAiIHI9IjEzIiBmaWxsPSIjMjU2M2ViIiBmaWx0ZXI9InVybCgjZWxlY3RyaWNHbG93KSIgLz4KICA8Y2lyY2xlIGN4PSIyMzAiIGN5PSIzNjAiIHI9IjYiIGZpbGw9IiNmZmZmZmYiIC8+CgogIDxjaXJjbGUgY3g9IjE3MCIgY3k9IjMzMCIgcj0iMTEiIGZpbGw9IiMzYjgyZjYiIC8+CiAgPGNpcmNsZSBjeD0iMTcwIiBjeT0iMzMwIiByPSI1IiBmaWxsPSIjZmZmZmZmIiAvPgogIDxjaXJjbGUgY3g9IjE3MCIgY3k9IjMzMCIgcj0iMTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYwYTVmYSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utb3BhY2l0eT0iMC41Ii8+Cjwvc3ZnPg==";

export async function POST(req: NextRequest) {
  try {
    const { name, email, reason } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const firstName = name ? name.trim().split(" ")[0] : "there";

    // 1. Add / Sync contact in Resend Audience Segment
    if (segmentId) {
      try {
        await resend.contacts.create({
          email: email.trim(),
          firstName: firstName,
          properties: {
            organization_or_name: name || "",
            use_case: reason || "",
          },
          segments: [{ id: segmentId }],
        });
      } catch (segmentErr: any) {
        console.error(
          "Resend segment contact creation warning:",
          segmentErr?.message || segmentErr
        );
      }
    }

    // 2. Send welcome / confirmation email from support@jennefer.dev to the user
    const emailResult = await resend.emails.send({
      from: "Jennefer Support <support@jennefer.dev>",
      to: [email.trim()],
      replyTo: "support@jennefer.dev",
      subject: "Welcome to Jennefer — You're on the early access waitlist",
      attachments: [
        {
          filename: "jennefer-logo.svg",
          content: LOGO_SVG_BASE64,
          contentId: "jennefer_logo",
          contentType: "image/svg+xml",
        },
      ],
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="background-color: #07080c; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 40px 20px;">
            <div style="max-width: 560px; margin: 0 auto; background-color: #0c0f17; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 36px 32px;">
              
              <!-- Brand Header with Logo -->
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 28px;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="vertical-align: middle; padding-right: 12px;">
                      <img src="cid:jennefer_logo" width="38" height="38" alt="Jennefer Logo" style="display: block; width: 38px; height: 38px; border-radius: 9px;" />
                    </td>
                    <td style="vertical-align: middle;">
                      <span style="font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff;">Jennefer</span>
                      <span style="font-size: 14px; font-family: monospace; color: #38bdf8;">.dev</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <h1 style="font-size: 24px; font-weight: 600; letter-spacing: -0.02em; color: #ffffff; margin: 0 0 16px 0; line-height: 1.25;">
                You're officially on the waitlist.
              </h1>
              
              <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 20px 0;">
                Hi ${firstName},
              </p>
              
              <p style="font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 20px 0;">
                Thanks for registering for early access. We are currently rolling out Jennefer in controlled batches to ensure flawless silicon-level optimization, air-gapped security, and zero token tax for engineering swarms.
              </p>

              ${
                reason
                  ? `<div style="background-color: #07080c; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 14px 16px; margin-bottom: 24px;">
                      <span style="font-size: 11px; font-family: monospace; color: #64748b; display: block; margin-bottom: 6px;">Your Registered Use Case</span>
                      <p style="font-size: 13px; color: #cbd5e1; margin: 0; line-height: 1.5; font-style: italic;">"${reason}"</p>
                    </div>`
                  : ""
              }

              <!-- Early access / downloadable app notice -->
              <div style="background: linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,185,129,0.06) 100%); border: 1px solid rgba(56,189,248,0.25); border-radius: 12px; padding: 18px 20px; margin-bottom: 26px;">
                <p style="font-size: 14px; font-weight: 600; color: #38bdf8; margin: 0 0 6px 0;">
                  📦 What happens next?
                </p>
                <p style="font-size: 14px; color: #e2e8f0; line-height: 1.6; margin: 0;">
                  As soon as the waitlist period concludes for your batch, <strong>we will send the downloadable application package (installer &amp; runtime license) directly to your email</strong> along with local hardware setup instructions.
                </p>
              </div>

              <p style="font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 28px 0;">
                If you have specific architectural questions or need an enterprise air-gapped deployment, feel free to reply directly to this email.
              </p>

              <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0;" />

              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size: 12px; color: #64748b; font-family: monospace;">
                    Sent from <a href="mailto:support@jennefer.dev" style="color: #38bdf8; text-decoration: none;">support@jennefer.dev</a>
                  </td>
                 
                </tr>
              </table>
            </div>
          </body>
        </html>
      `,
    });

    if (emailResult.error) {
      console.error("Resend send email error:", emailResult.error);
      return NextResponse.json(
        {
          error:
            emailResult.error.message || "Failed to send confirmation email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: emailResult.data?.id,
    });
  } catch (err: any) {
    console.error("Waitlist API unexpected error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
