<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Noto Sans Bengali', Arial, sans-serif; background-color: #0f172a; color: #f1f5f9; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid #334155; }
        .header { text-align: center; margin-bottom: 24px; }
        .header h1 { color: #ec4899; font-size: 24px; margin: 0; }
        .content { line-height: 1.8; }
        .rejected { color: #ef4444; font-weight: bold; }
        .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #334155; text-align: center; color: #64748b; font-size: 14px; }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>সহজ বিয়ে</h1>
    </div>
    <div class="content">
        <p>প্রিয় {{ $user->name }},</p>
        <p class="rejected">দুঃখিত, আপনার আবেদন প্রত্যাখ্যান করা হয়েছে।</p>
        @if($user->rejection_reason)
            <p><strong>কারণ:</strong> {{ $user->rejection_reason }}</p>
        @endif
        <p>আরো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।</p>
    </div>
    <div class="footer">
        <p>সহজ বিয়ে - বিশ্বস্ত বিবাহ সেবা</p>
    </div>
</div>
</body>
</html>
