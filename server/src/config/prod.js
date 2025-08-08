export const config = {
  port: process.env.PORT || 8000,
  db: {
    url: process.env.MONGO_URI || "mongodb://localhost/backwoods-mock"
  },
  // Remove Stripe dependency for mock version
  stripe: {
    instance: null // Mock stripe instance
  }
}
