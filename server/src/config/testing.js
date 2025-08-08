export const config = {
  port: process.env.PORT || 8000,
  db: {
    url: "mongodb://127.0.0.1/backwoods-test"
  },
  // Remove Stripe dependency for mock version
  stripe: {
    instance: null // Mock stripe instance
  }
}
