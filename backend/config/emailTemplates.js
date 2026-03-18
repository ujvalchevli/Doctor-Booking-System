export const generateOTPVerificationEmail = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6ff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #5f6fff, #8a96ff); padding: 30px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
    .content p { margin-bottom: 20px; font-size: 16px; }
    .otp-container { background-color: #f8f9ff; border: 2px dashed #5f6fff; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0; }
    .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #5f6fff; margin: 0; }
    .footer { background: #fafafa; padding: 20px; text-align: center; color: #888888; font-size: 12px; border-top: 1px solid #eeeeee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to MediCare!</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for choosing MediCare. To complete your account setup and ensure your security, please verify your email address using the One-Time Password (OTP) below:</p>
      
      <div class="otp-container">
        <p class="otp-code">${otp}</p>
      </div>
      
      <p style="text-align: center; font-size: 14px; color: #666;">This code is valid for <strong>1 minute 30 seconds</strong>. Please do not share this code with anyone.</p>
    </div>
    <div class="footer">
      <p>If you did not request this verification, please ignore this email.</p>
      <p>&copy; ${new Date().getFullYear()} MediCare. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const generateResetPasswordEmail = (otp) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6ff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #1f2937, #374151); padding: 30px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
    .content p { margin-bottom: 20px; font-size: 16px; }
    .otp-container { background-color: #f8f9ff; border: 2px dashed #5f6fff; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0; }
    .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #5f6fff; margin: 0; }
    .footer { background: #fafafa; padding: 20px; text-align: center; color: #888888; font-size: 12px; border-top: 1px solid #eeeeee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We received a request to reset the password associated with this email address. Please use the One-Time Password (OTP) below to proceed with resetting your password:</p>
      
      <div class="otp-container">
        <p class="otp-code">${otp}</p>
      </div>
      
      <p style="text-align: center; font-size: 14px; color: #666;">This code is valid for <strong>1 minute 30 seconds</strong>.</p>
    </div>
    <div class="footer">
      <p>If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
      <p>&copy; ${new Date().getFullYear()} MediCare. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const generateAppointmentBookedEmail = (patientName, doctorName, date, time) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6ff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #10b981, #059669); padding: 30px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
    .content p { margin-bottom: 20px; font-size: 16px; }
    .details-card { background: #f8fafc; border-left: 4px solid #10b981; padding: 20px; border-radius: 0 8px 8px 0; margin: 25px 0; }
    .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .detail-label { color: #64748b; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .detail-value { color: #0f172a; font-weight: 700; font-size: 16px; }
    .footer { background: #fafafa; padding: 20px; text-align: center; color: #888888; font-size: 12px; border-top: 1px solid #eeeeee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Confirmed!</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${patientName}</strong>,</p>
      <p>Your appointment has been successfully booked. We're looking forward to providing you with the best medical care.</p>
      
      <div class="details-card">
        <div class="detail-row">
          <span class="detail-label">Doctor</span><br>
          <span class="detail-value">Dr. ${doctorName}</span>
        </div>
        <div class="detail-row" style="margin-top:15px;">
          <span class="detail-label">Date</span><br>
          <span class="detail-value">${date}</span>
        </div>
        <div class="detail-row" style="margin-top:15px;">
          <span class="detail-label">Time</span><br>
          <span class="detail-value">${time}</span>
        </div>
      </div>
      
      <p style="text-align: center; font-size: 14px; color: #666; margin-top: 30px;">Please arrive 10 minutes prior to your scheduled time.</p>
    </div>
    <div class="footer">
      <p>If you need to reschedule or cancel, please visit your dashboard.</p>
      <p>&copy; ${new Date().getFullYear()} MediCare. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const generateAppointmentCancelledEmail = (patientName, doctorName, date, time, cancelledBy) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6ff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #ef4444, #dc2626); padding: 30px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
    .content p { margin-bottom: 20px; font-size: 16px; }
    .details-card { background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; border-radius: 0 8px 8px 0; margin: 25px 0; }
    .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .detail-label { color: #991b1b; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .detail-value { color: #7f1d1d; font-weight: 700; font-size: 16px; }
    .footer { background: #fafafa; padding: 20px; text-align: center; color: #888888; font-size: 12px; border-top: 1px solid #eeeeee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Cancelled</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${patientName}</strong>,</p>
      <p>This email is to confirm that your appointment has been cancelled by <strong>${cancelledBy === 'doctor' ? 'the doctor' : 'you'}</strong>.</p>
      
      <div class="details-card">
        <div class="detail-row">
          <span class="detail-label">Doctor</span><br>
          <span class="detail-value">Dr. ${doctorName}</span>
        </div>
        <div class="detail-row" style="margin-top:15px;">
          <span class="detail-label">Date</span><br>
          <span class="detail-value">${date}</span>
        </div>
        <div class="detail-row" style="margin-top:15px;">
          <span class="detail-label">Time</span><br>
          <span class="detail-value">${time}</span>
        </div>
      </div>
      
      <p style="text-align: center; font-size: 14px; color: #666; margin-top: 30px;">We hope to see you again soon. Feel free to book a new appointment at your convenience.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} MediCare. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const generateAppointmentRescheduledEmail = (patientName, doctorName, date, time) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6ff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #f59e0b, #d97706); padding: 30px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
    .content p { margin-bottom: 20px; font-size: 16px; }
    .details-card { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 0 8px 8px 0; margin: 25px 0; }
    .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .detail-label { color: #b45309; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .detail-value { color: #78350f; font-weight: 700; font-size: 16px; }
    .footer { background: #fafafa; padding: 20px; text-align: center; color: #888888; font-size: 12px; border-top: 1px solid #eeeeee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Rescheduled</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${patientName}</strong>,</p>
      <p>Your appointment with Dr. ${doctorName} has been rescheduled to a new date and time.</p>
      
      <p style="font-weight: 600; color: #5f6fff;">Here are your new appointment details:</p>
      <div class="details-card">
        <div class="detail-row">
          <span class="detail-label">Doctor</span><br>
          <span class="detail-value">Dr. ${doctorName}</span>
        </div>
        <div class="detail-row" style="margin-top:15px;">
          <span class="detail-label">New Date</span><br>
          <span class="detail-value">${date}</span>
        </div>
        <div class="detail-row" style="margin-top:15px;">
          <span class="detail-label">New Time</span><br>
          <span class="detail-value">${time}</span>
        </div>
      </div>
      
      <p style="text-align: center; font-size: 14px; color: #666; margin-top: 30px;">Please reach out to us if this new time does not work for you.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} MediCare. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const generateAppointmentCompletedEmail = (patientName, doctorName) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6ff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #5f6fff, #4a56db); padding: 30px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
    .content { padding: 40px 30px; color: #333333; line-height: 1.6; text-align: center; }
    .content p { margin-bottom: 20px; font-size: 16px; text-align: left; }
    .icon-container { margin: 30px 0; }
    .button-container { margin-top: 30px; }
    .btn { display: inline-block; background-color: #5f6fff; color: white !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; transition: background 0.3s; }
    .footer { background: #fafafa; padding: 20px; text-align: center; color: #888888; font-size: 12px; border-top: 1px solid #eeeeee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>How was your visit?</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${patientName}</strong>,</p>
      <p>Thank you for visiting <strong>Dr. ${doctorName}</strong> today. Your appointment has been marked as completed successfully.</p>
      <p>We hope everything went smoothly and we were able to provide the care you needed. Wishing you a quick recovery and a very healthy life!</p>
      
      <div class="button-container">
        <a href="#" class="btn" style="color:white;">Leave a Review</a>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} MediCare. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
