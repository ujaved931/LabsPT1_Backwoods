import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// Mock Stripe Provider that just renders children
const MockStripeProvider = ({ children }) => (
  <div className="mock-stripe-provider">{children}</div>
)

const StripeElementsContainer = ({ children }) => (
  <MockStripeProvider>{children}</MockStripeProvider>
)

StripeElementsContainer.propTypes = {
  children: PropTypes.element.isRequired
}

export default StripeElementsContainer
