<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reply to Your Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 0; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color: #007bff; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">💬 Reply to Your Message</h2>
        </div>

        <!-- Content -->
        <div style="padding: 20px;">
            @if($originalContact)
            <div style="background-color: #f0f8ff; padding: 15px; margin: 20px 0; border-left: 4px solid #007bff; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Your Original Message:</h3>
                <p style="margin: 5px 0;"><strong>From:</strong> {{ $originalContact->name }}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> {{ $originalContact->email }}</p>
                <p style="margin: 5px 0;"><strong>Project:</strong> {{ $originalContact->project }}</p>
                <div style="margin-top: 15px; padding: 10px; background-color: #ffffff; border-radius: 3px;">
                    <em style="color: #666; line-height: 1.5;">{{ $originalContact->message }}</em>
                </div>
            </div>
            @endif

            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; border: 1px solid #e0e0e0;">
                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Reply From: DpDev</h3>
                <div style="line-height: 1.6; color: #333;">
                    {!! nl2br(e($replyMessage)) !!}
                </div>
            </div>

            <!-- Footer -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 14px;">
                <p>Thank you for reaching out! If you have any follow-up questions, feel free to reply to this email.</p>
            </div>
        </div>
    </div>
</body>
</html>