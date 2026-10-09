const MAX = {
  company: 100,
  name: 100,
  phone: 32,
  email: 254,
  business: 1000,
  employees: 40,
  message: 2000,
  datetime1: 80,
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function cleanString(value, max) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export default async (request) => {
  if (request.method !== 'POST') return json({ success: false, error: 'Method not allowed' }, 405);

  let payload;
  try {
    payload = await request.json();
  } catch (_) {
    return json({ success: false, error: '送信内容を確認できませんでした。' }, 400);
  }

  if (!payload || typeof payload !== 'object' || payload.website || payload.consent !== true || payload.consent_version !== '2026-10-03') {
    return json({ success: false, error: '個人情報の取扱いへの同意を確認できませんでした。' }, 400);
  }

  const data = {
    company: cleanString(payload.company, MAX.company),
    name: cleanString(payload.name, MAX.name),
    phone: cleanString(payload.phone, MAX.phone),
    email: cleanString(payload.email, MAX.email),
    business: cleanString(payload.business, MAX.business),
    employees: cleanString(payload.employees, MAX.employees),
    message: cleanString(payload.message, MAX.message),
    datetime1: cleanString(payload.datetime1, MAX.datetime1),
    consent: true,
    consent_version: '2026-10-03',
    consent_at: new Date().toISOString(),
  };

  if (!data.company || !data.name || !data.phone || !data.email || !data.datetime1) {
    return json({ success: false, error: '必須項目が不足しています。' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json({ success: false, error: 'メールアドレスの形式が正しくありません。' }, 400);
  }
  const phoneDigits = data.phone.replace(/\D/g, '');
  if (phoneDigits.length < 9 || phoneDigits.length > 14 || !/^[\d\-+()\s]+$/.test(data.phone)) {
    return json({ success: false, error: '電話番号の形式が正しくありません。' }, 400);
  }

  const endpoint = Netlify.env.get('BOOKING_APPS_SCRIPT_URL');
  if (!endpoint) {
    return json({ success: false, error: '予約フォームの設定を確認中です。お手数ですがメールでお問い合わせください。' }, 503);
  }

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
      redirect: 'follow',
    });
    const contentType = (upstream.headers.get('content-type') || '').toLowerCase();
    if (!upstream.ok || contentType.includes('text/html')) {
      throw new Error('upstream error');
    }
    let result = { success: true };
    try { result = await upstream.json(); } catch (_) {}
    if (result && result.success === false) {
      return json({ success: false, error: '予約処理を完了できませんでした。' }, 502);
    }
    return json({ success: true });
  } catch (_) {
    return json({ success: false, error: '予約処理を完了できませんでした。時間をおいて再度お試しいただくか、メールでお問い合わせください。' }, 502);
  }
};

export const config = {
  path: '/api/booking',
  method: ['POST'],
  rateLimit: { action: 'rate_limit', aggregateBy: 'ip', windowSize: 60, windowLimit: 10 },
};
