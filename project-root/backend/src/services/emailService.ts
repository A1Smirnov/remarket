import nodemailer from 'nodemailer';

export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
  };

  await transporter.sendMail(mailOptions);
};
