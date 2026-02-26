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
        .btn { display: inline-block; background: linear-gradient(135deg, #ec4899, #db2777); color: white; padding: 12px 32px; text-decoration: none; border-radius: 12px; margin-top: 16px; }
        .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #334155; text-align: center; color: #64748b; font-size: 14px; }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>সহজ বিয়ে</h1>
    </div>
    <div class="content">
        <p>প্রিয় অ্যাডমিন,</p>
        <p>একজন নতুন ব্যবহারকারী নিবন্ধন করেছেন এবং আপনার অনুমোদনের অপেক্ষায় আছেন।</p>
        <p><strong>নাম:</strong> {{ $user->name }}</p>
        <p><strong>ইমেইল:</strong> {{ $user->email }}</p>
        <p><strong>ফোন:</strong> {{ $user->phone }}</p>
        <p><strong>নিবন্ধনের সময়:</strong> {{ $user->created_at->format('d/m/Y h:i A') }}</p>
        <p>অনুগ্রহ করে অ্যাডমিন প্যানেল থেকে ডকুমেন্ট যাচাই করুন।</p>
    </div>
    <div class="footer">
        <p>সহজ বিয়ে - বিশ্বস্ত বিবাহ সেবা</p>
    </div>
</div>
</body>
</html>
