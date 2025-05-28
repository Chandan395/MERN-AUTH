import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// export const sendWelcomeEmail = async (to, name) => {
//   await transporter.sendMail({
//     from: `"My App" <${process.env.SMTP_EMAIL}>`,
//     to,
//     subject: "Welcome to My App!",
//     html: `<h2>Hello ${name},</h2><p>Thanks for registering at My App! We're glad to have you 🎉</p>`,
//   });
// };

// export const sendVerifyOtpEmail = async(to, name) =>{
//    await transporter.sendMail({
//     from: `"My App" <${process.env.SMTP_EMAIL}>`,
//     to,
//     subject: "Account Verification Otp ",
//     html: `<h2>Hello ${name},</h2><p>Thanks for registering at My App! We're glad to have you 🎉</p>`,
//   });
// }


