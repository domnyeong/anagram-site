import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, company, email, inquiryType, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        message: '이름, 이메일, 문의 내용은 필수입니다.',
      });
    }

    const subject = `[Anagram 문의] ${inquiryType || '일반 문의'} - ${name}`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>새 문의가 접수되었습니다.</h2>
        <p><strong>이름:</strong> ${escapeHtml(name)}</p>
        <p><strong>회사명:</strong> ${escapeHtml(company || '-')}</p>
        <p><strong>이메일:</strong> ${escapeHtml(email)}</p>
        <p><strong>문의 유형:</strong> ${escapeHtml(inquiryType || '-')}</p>
        <p><strong>문의 내용:</strong></p>
        <div style="padding:12px; border:1px solid #ddd; border-radius:8px; white-space:pre-wrap;">
          ${escapeHtml(message)}
        </div>
      </div>
    `;

    const recipients = ['rin.anagram@gmail.com', 'dominyoung00@gmail.com'];

    for (const to of recipients) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        reply_to: email,
        subject,
        html,
      });
    }

    return res.status(200).json({ message: '문의가 정상적으로 전송되었습니다.' });
  } catch (error) {
    console.error('메일 전송 오류:', error);
    return res.status(500).json({ message: '문의 전송 중 오류가 발생했습니다.' });
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
