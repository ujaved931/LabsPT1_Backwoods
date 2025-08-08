import * as userController from "../user/user.controller"

// Mock Stripe functions for development
const mockStripeCustomer = () => ({
  id: `cus_mock_${Date.now()}`,
  object: 'customer',
  created: Math.floor(Date.now() / 1000)
})

const mockStripeSubscription = (customerId, planId) => ({
  id: `sub_mock_${Date.now()}`,
  object: 'subscription',
  customer: customerId,
  status: 'active',
  items: {
    data: [{ plan: { id: planId } }]
  },
  created: Math.floor(Date.now() / 1000)
})

const mockInvoices = (customerId) => [
  {
    id: `in_mock_${Date.now()}`,
    amount_paid: 999,
    amount_due: 0,
    currency: 'usd',
    status: 'paid',
    created: Math.floor(Date.now() / 1000),
    customer: customerId
  }
]

export const subscribe = async (req, res, stripe) => {
  const { planId, source } = req.body

  try {
    // Mock Stripe customer creation
    const customer = mockStripeCustomer()
    
    // Mock Stripe subscription creation
    const subscription = mockStripeSubscription(customer.id, planId)

    const updatedRequest = Object.assign({}, req, {
      body: {
        subscribed: true,
        subDate: Date.now(),
        customerId: customer.id,
        subscribeId: subscription.id
      }
    })
    return userController.updateUser(updatedRequest, res)
  } catch (error) {
    res.status(500).send("Mock subscription error")
  }
}

export const cancel = async (req, res, stripe) => {
  const { subscribeId } = req.body
  try {
    // Mock Stripe subscription cancellation
    console.log(`Mock: Cancelling subscription ${subscribeId}`)

    const updatedRequest = Object.assign({}, req, {
      body: {
        subscribed: false,
        subDate: "",
        customerId: null,
        subscribeId: null
      }
    })
    return userController.updateUser(updatedRequest, res)
  } catch (error) {
    return res.status(500).send("Mock cancellation error")
  }
}

export const retrieveInvoices = async (req, res, stripe) => {
  const { customerId, subscribeId } = req.body
  try {
    // Mock invoice retrieval
    const result = mockInvoices(customerId)
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send("Mock invoice retrieval error")
  }
}
