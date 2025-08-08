// Mock nodemailer for development
const mockTransporter = {
  sendMail: (options, callback) => {
    console.log("Mock Email sent:", {
      from: options.from,
      to: options.to,
      subject: options.subject
    })
    if (callback) {
      setTimeout(() => callback(null, { messageId: 'mock-message-id' }), 100)
    }
    return Promise.resolve({ messageId: 'mock-message-id' })
  }
}

export const transporter = mockTransporter

export const getPasswordResetURL = (user, token) =>
  `http://localhost:3000/password/reset/${user._id}/${token}`

export const resetPasswordTemplate = (user, url) => {
  const from = "demo@backwoods.com"
  const to = user.email
  const subject = "🌻 Backwoods Password Reset 🌻"
  const html = `
  <p>Hey ${user.displayName || user.email},</p>
  <p>We heard that you lost your Backwoods password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at Backwoods</p>
  `

  return { from, to, subject, html }
}
